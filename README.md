# Setup

Install [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/), then:
```
git clone https://github.com/SlausB/keycloak-nodejs-boilerplate.git
cd keycloak-nodejs-boilerplate
./run.sh
```

### Client Credentials
- Open http://localhost:8080/auth/admin
- `Clients` -> `nodejs` -> `Credentials` -> `Regenerate Secret` -> copy-paste into `./src/index.ts:~18` where it's currently `"secret": "0ea73bba-57d9-404b-86a2-58bf3aacb7fd"` -> hit `Ctrl+S` to recompile
### Try it
- Open http://localhost:8198/ in browser
- Register
- Login as that user
- `Secured Express + TypeScript Server` text should show up


# How Keycloak was configured
- Open http://localhost:8080/auth/admin
- Enter `admin`/`admin` credentials
- `Master` -> `Add realm` -> Name: `kingdom`
- `Clients` -> `Create` -> Client ID: `nodejs`
- `Clients` -> `nodejs` -> `Settings`:
    - `Access Type`: <b>confidential</b>
    - `Valid Redirect URIs`: <b>*</b>
- `Realm Settings` -> `Login` -> `User registration` -> `On` -> `Save`