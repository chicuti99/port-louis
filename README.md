
# Projeto Blis API


Este projeto é uma API RESTful construída com Node.js, Express, Prisma, MySQL e Swagger para documentação.

Tecnologias utilizadas
Node.js 
Express 
Prisma 
MySQL 
Swagger 
Docker


## Requisitos

 - [NodeJs v19.9.0](https://nodejs.org/en/download/package-manager)
 - [Docker - windows](https://www.docker.com/get-started/)
 - [Docker - ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-pt)


## Deploy
npm para instalar as dependencias
```bash
  npm install
```

Para fazer o deploy desse projeto rode

```bash
  docker compose up --build
```
logo apos rode o comando abaixo para entrar no mysql e use essa senha para logar: port_louis

```bash
  docker exec -it database_port_louis mysql -u root -p
```
execute os seguintes comandos para conceder permissão ao usuario

```bash
  GRANT ALL PRIVILEGES ON *.* TO 'docker'@'%' WITH GRANT OPTION; 
  FLUSH PRIVILEGES;
```

após isso,digite o comando abaixo para sair do mysql 

```bash
  exit
```
execute o seguinte comando para criar as tabelas
```bash
  npx prisma migrate dev --name init
```


## Documentação da API

#### Swagger
toda a documentação pode ser encontrada
```http
   /api-docs
```

