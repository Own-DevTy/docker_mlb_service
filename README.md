# docker_mlb_service

## Settings

### Docker-Compose

```
version: "3.8"
services:
  front:
    depends_on:
      - back
    container_name: front
    build:
      context: ./
      dockerfile: front.Dockerfile
    env_file:
      - .env.front
    ports:
      - 3000:3000

  back:
    depends_on:
      - db
    env_file:
      - .env.back
    container_name: back
    build:
      context: ./
      dockerfile: back.Dockerfile
    ports:
      - 8000:8000

  db:
    image: mysql
    env_file:
      - .env.back
    restart: always
    container_name: db
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    ports:
      //If you wanna modify MySQL port then type - [the port you want]:3306
      //like this
      //- 7777:3306
      - 3306:3306
```

### ENV

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
DB_PORT=3306 // don't touch
DB_USER=root // mysql user
DB_PASSWORD=serverTeam5 // mysql password
DB_DATABASE=service // mysql use database
```

##### DB-MySQL

```
TZ=Asia/Seoul // don't touch
MYSQL_HOST=localhost // don't touch
MYSQL_PORT=3306 // don't touch
MYSQL_ROOT_PASSWORD=serverTeam5 // mysql root pw
MYSQL_DATABASE=service // Service Database
MYSQL_USER=user // default user
MYSQL_PASSWORD=serverTeam5 // default user pw
```

## Run Docker-Compose FE&BE Server

```
docker-compose up -d
```
