
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
use yarn ou npm para instalar as dependencias e crie um arquivo .env na raiz do projeto seguindo o modelo enviado por email,assim como o padrão de autenticação usado

Para fazer o deploy desse projeto rode

```bash
  docker compose build
```
logo apos rode

```bash
  docker compose up
```


## Documentação da API

#### Swagger
toda a documentação pode ser encontrada
```http
   /api-docs
```

