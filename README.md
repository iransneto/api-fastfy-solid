

# REQUISITOS E REGRAS DE NEGÓCIOS
GymPass style App.

## Requisito Funcional
São as funcionalidades do app

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10Km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia


## Regra de negócio
São as regras relacionadas as funcionalidades do app, uma regra de negócio sempre estará associada a um requisito funcional

- [x] o usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] o usuário não deve poder se autenticar com email inexistente;
- [x] o usuário não deve poder se autenticar com senha errada;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado 20 min após criado;
- [] O check-in só pode ser validado pelo adm;
- [] A academia só pode ser criada pelo adm;

## Requisitos não funcionais
São definições técnicas da aplicação

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT

# ESTRUTURA DO PROJETO
Configure o package.json para usar o "type: module"

```bash
# Linguagem que usaremos pra desenvolver (compiladores como deno, bun...)
$ npm i typescript -D

#após instalar, rodar o comando npx tsc --init e mudar o target para o mais atual (2020)

# Dependencia para converter as libs do node de JS para TS, trabalha em cima do node_modules
$ npm i @types/node -D

# Sem essa dependencia, seria necessário sempre rodar o binário tsc do typescript para converter de ts para js e rodar os arquivos js no node, para evitar isso, usamos o tsx, que faz tudo isso e não suja as pastas
$ npm i tsx -D

# Padrão de código com eslint
npm i eslint -D

# Usada para criar a versão de build para prod
$ npm i tsup -D
```

```bash
# Framework de scaffold para api
$ npm i fastify

# Usando variáveis de ambiente
$ npm i dotenv

# Validação de dados (inclusive variáveis de ambiente)
$ npm i zod

# hash de senhas
$ npm i bcryptjs

$ npm i @types/bcryptjs

# testes do projeto
$ npm i vitest -D

$ npm i vite-tscondig-path -D
```

## shortcut para instalação de tudo
```bash

$ npm i typescript @types/node tsx tsup -D

$ npm i fastify dotenv zod

```

## Padrão de projeto

- Ao criar uma migration, descreve o que ela faz e. g. create user table
- configure o eslint para manter o padrão de código
- use bibliotecas para validar as variáveis de ambiente antes de consumir no projeto e.g. zod
- use um .env.example para dizer quais variáveis de ambiente são usadas no projeto, atribua os valores no .env e adicione ele no .gitignore
- use uma configuração de versão exata das dependencias para facilitar a atualização automática delas em produção, isso no .npmrc


## Como criar um docker compose
- Diga a versão do docker compose está sendo usada
- liste os serviços que são utilizados
- diga as portas que serão utilizadas
- atribua as variáveis de ambiente


## Prisma
- para rodar uma migration use npx prisma migrate dev, dê um nome coerente para a migration
- para aplicar as migrations, rode prisma migrate dev, ele irá tanto verificar novas como aplicar as antigas

## Estratégias de auth - 3 comuns

## Basic Auth
Em todas as requisições o usuário precisa enviar suas credencias do header do request, comumente o Authorization como chave e as credencias (email, senha...) em base64

## JWT
Json Web Token: o backend cria um token único, stateless (Não é armazenado em nenhum lugar) e criptografado a partir de uma palavra chave

composto por: cabeçalho.payload.assinatura