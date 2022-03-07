# Car Management Portal

## Requirements
* The code should be written in Node.js, use Lint, mongoose, express and ajv ✔️
* Expose a RESTful API to manage users and cars ✔️
* Containerize the solution by writing a valid Dockerfile ✔️
* Provide a dockercopmose file which references your Docker image and the official MongoDB docker image. ✔️
* Use Swagger for API documentation ✔️
* Authorization is applied on Car Create, Update and Delete operation ✔️

## Deliverables
* The public repo URL which has the source code of the project, and a set of instructions if there is any project specific configurations needed to run the project.
---

# Available Commands for the Server
Before running the server, just configure mongodb database in respective `.env.[developement|production|test].local` file.
* Run the Server in production mode : npm run start
* Run the Server in development mode : npm run dev
* Run all unit-tests : npm test
* Check for linting errors : npm run lint
* Fix for linting : npm run lint:fix

### 🐳 Docker :: Container Platform

[Docker](https://docs.docker.com/) is a platform for developers and sysadmins to build, run, and share applications with containers.

[Docker](https://docs.docker.com/get-docker/) Install.

- starts the containers in the background and leaves them running : `docker-compose up -d`
- Stops containers and removes containers, networks, volumes, and images : `docker-compose down`

### 📗 Swagger :: API Document

[Swagger](https://swagger.io/) is Simplify API development for users, teams, and enterprises with the Swagger open source and professional toolset.

Easily used by Swagger to design and document APIs at scale.

Start your app in development mode at `http://localhost:3000/api-docs`

## 🗂 Code Structure (default)

```bash
│
├── /src
│   ├── /configs
│   │   ├── index.ts
│   │
│   ├── /controllers
│   │   ├── auth.controller.ts
│   │   ├── cars.controller.ts
│   │   ├── index.controller.ts
│   │   └── users.controller.ts
│   │
│   ├── /database
│   │   └── index.ts
│   │
│   ├── /dtos
│   │   ├── cars.dto.ts
│   │   └── users.dto.ts
│   │
│   ├── /exceptions
│   │   └── HttpException.ts
│   │
│   ├── /interfaces
│   │   ├── auth.interface.ts
│   │   ├── cars.interface.ts
│   │   └── users.interface.ts
│   │
│   ├── /middlewares
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   ├── /models
│   │   ├── cars.model.ts
│   │   └── users.model.ts
│   │
│   ├── /services
│   │   ├── auth.service.ts
│   │   ├── cars.service.ts
│   │   └── users.service.ts
│   │
│   ├── /tests
│   │   ├── cars.test.ts
│   │   ├── index.test.ts
│   │   └── users.test.ts
│   │
│   ├── /utils
│   │   ├── ajvValidate.ts
│   │   ├── logger.ts
│   │   ├── util.ts
│   │   └── vaildateEnv.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .dockerignore
├── .editorconfig
├── .env.development.local
├── .env.production.local
├── .env.test.local
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── Makefile
├── nginx.conf
├── nodemon.json
├── package.json
├── README.json
└── tsconfig.json
```