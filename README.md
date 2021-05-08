# Setup

Install `docker`, `docker-compose` and:
```
git clone https://github.com/SlausB/keycloak-nodejs-boilerplate.git
cd keycloak-nodejs-boilerplate
./run.sh
```
### Create <b>Alice</b> user
- Open http://localhost:8080/auth/admin
- Enter `admin`/`admin`
- `Users` -> `Add user` -> Username: `Alice` -> Save
- ... `Credentials`:
    - `Password`: `password`
    - `Password Confirmation`: `password`
    - `Set Password`
    - `Temporary` -> `Off`
### Try it
Open http://localhost:8198/ in browser:
It will ask for login/password: enter `Alice`/`password` -> `Access denied` page bangs

# How Keycloak was configured

- `Master` -> `Add realm` -> Name: `kingdom`
- `Clients` -> `Create` -> Client ID: `nodejs`
- `Clients` -> `nodejs` -> `Settings`:
    - `Access Type`: <b>confidential</b>
    - `Valid Redirect URIs`: <b>*</b>