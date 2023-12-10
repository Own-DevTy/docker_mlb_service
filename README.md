# docker_mlb_service

## Settings

#### .env.front

##### Next.js

```
BACK_ADDR=back //don't touch
BACK_PORT=8000 //fastApi port
NEXTAUTH_URL=http://127.0.0.1:3000 // don't touch
NEXTAUTH_SECRET=nextmlbfront // don't touch
```

#### .env.back

##### Python-Fastapi

```
isDocker=true //don't touch
PORT=8000 // fastApi port
DB_HOST=db // don't touch
DB_PORT=3306 // mysql port
DB_USER=root // mysql user
DB_PASSWORD=serverTeam5 // mysql password
DB_DATABASE=service // mysql use database
```

##### DB-MySQL

```
TZ=Asia/Seoul // don't touch
MYSQL_HOST=localhost // mysql host
MYSQL_PORT=3306 // mysql port
MYSQL_ROOT_PASSWORD=serverTeam5 // mysql root pw
MYSQL_DATABASE=service // Service Database
MYSQL_USER=user // default user
MYSQL_PASSWORD=serverTeam5 // default user pw
```

## Run Docker-Compose FE&BE Server

```
docker-compose up -d
```
