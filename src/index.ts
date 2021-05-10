import express from 'express'
import session from 'express-session'
import Keycloak from 'keycloak-connect'
const cors = require('cors')

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

const memoryStore = new session.MemoryStore()
const keycloak = new Keycloak(
    {   store : memoryStore, },
    {
        "realm": "kingdom",
        "auth-server-url": "http://localhost:8080/auth/",
        "ssl-required": "external",
        "resource": "nodejs",
        //@ts-ignore
        "credentials": {
            "secret": "0ea73bba-57d9-404b-86a2-58bf3aacb7fd"
        },
        "use-resource-role-mappings": true,
        "confidential-port": 0,
        "policy-enforcer": {},
    }
)

const app = express();
app.use(cors());

app.use(session({
    secret: 'keycloak-nodejs-boilerplate Secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
}))

app.use( keycloak.middleware({
    logout: '/logout',
    admin: '/admin',
}) )

app.all(
    '/',
    keycloak.protect(),
    (req,res) => res.send('Secured Express + TypeScript Server'),
)

app.all(
    '/token',
    keycloak.protect( token => {
        console.log( 'Token:', token )
        return true
    } ),
    (req,res) => res.send('Any tokens?'),
)
app.all(
    '/user',
    keycloak.protect( 'realm:user' ),
    (req,res) => res.send('User role secured'),
)

app.all(
    '/sso',
    keycloak.checkSso(),
    (req,res) => res.send('Sso'),
)

app.all(
    '/inline',
    (req,res) => {
        keycloak.protect()
        res.send('inline')
    }
)

app.all(
    '/insecure',
    (req,res) => res.send('Public page'),
)

const PORT = 8198;
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});