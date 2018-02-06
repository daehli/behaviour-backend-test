## Backend Behaviour

### Installation

*NPM*

```bash
npm install

# DB Migration

npm start
```

*YARN*

```bash
yarn 

# DB Migration

yarn start
```

*MIGRATION*

```bash
# Don't forget to add your environment Variable
# set BD_PASSWORD=Your_Awesome_password
# set USER_DB=Your_Awesome_password
# Add create your Database
make migration
```



## Curl

### Account 

- `GET /account/` Fetch All Account
  - `curl localhost:3000/account`
- `POST /account/` Create Account
  - `curl -X POST -H "Content-Type: application/json" -d '' "localhost:3000/account"`
- `GET /account/:id` fetch id Account
  - `curl localhost:3000/account/1`
- `DELETE /account/:id` delete id Account
  - `curl -X DELETE localhost:3000/account/1`
- `PUT /account/:id` Add character id
  - `curl -X PUT -H "Content-Type: application/json" -d '{"charactersIds":[1,2,3]}' "localhost:3000/account/1"`


### Character

- `GET /character/` Fetch All Character
  - `curl localhost:3000/character`
- `POST /character/` Create Character
  - `curl -X POST -H "Content-Type: application/json" -d '{"name": "daehli","xp":12,"accounts_id":[1,2]}' "localhost:3000/character/"`
- `GET /character/:id` fetch id Account
  - `curl localhost:3000/character/1`
- `DELETE /character/:id` delete id Character
  - `curl -X DELETE localhost:3000/character/1`
- `UPDATE /character/:id/` update Character
  - `curl -X PUT -H "Content-Type: application/json" -d '{"name":"Nadeau","xp":13,"accounts_id":1}' "localhost:3000/character/1" `