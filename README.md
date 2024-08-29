# marketplace-api

Welcome to the backend of the Marketplace API project! This application provides the server-side infrastructure for a marketplace platform, developed using Node.js, Fastify, and Prisma.

You can access the prototype for more details...

**figma**: [Marketspace • Desafio React Native](https://www.figma.com/design/A0wJRLD14HG6riDylerdWr/Marketspace-%E2%80%A2-Desafio-React-Native?node-id=659-858&m=dev&t=ITo7wBPUIlBCdCBF-1)

## Prerequisites

- nodeJS
- yarn
- docker

## Running the Project

To run this project, follow these guidelines.

### Install th dependencies

This command will install all the project dependencies.

```sh
yarn
```

### Running Server

This command will start the local server on port `3333`.

example: `localhost:3333`

```sh
yarn dev
```

### Running docker

This project uses Docker to virtualize the database in a container. You can use docker-compose to set up your environment.

```sh
docker-compose up -d
```

### Running migrations

The final step is to run migrations for Prisma ORM to construct your database.

```sh
npx migrate dev
```

### Tests

You can run the unity tests for the use-cases.

```sh
yarn test
```
