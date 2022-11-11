# For contributors

---

## general information

### setup
* clone this repository.
* pull the changes from the `dev` branch.
* run `npm install` command to install dependencies.
* fill enviromental variables in the `.env` file.

### build
* run `npm run build` script to compile the typescript code into js code in **watch mode**. Сompiled code is stored in a folder `dist`.

>
> **NOTE** that when deleting a *.ts file, the *.js file is not automatically deleted.
>

### run
* run `npm run dev` script to start the server in **watch mode**.

### explore
* project documentation: Database model, REST API, etc. in the `documentation` section.
* read this `README.md` file

### code
* create a branch for the feature and switch to it (rules for working with branches in the section `repository structure`).
* all commit messages are validated. Check out the `commit rules` section.
* don't forget run `npx prisma migrate dev --name [scope]` command every time you change the database structure.
* each new variable must be added to mediator-file `configuration.ts`.

---

## tech stack

### typescript

### fastify
* @fastify/autoload
* fastify-plugin
* @fastify/jwt
* @fastify/swagger

### prisma
* @prisma/client
* prisma-docs-generator
* prisma-erd-generator

### @sendgrid/mail

---

## repository structure

### branches
* `main` - production branch
* `dev` - make pull requests to this branch with only working code 
* `<feature>` - create and use the branch for each feature

---

## commit rules

### commit message
should contain 3 parts: 
> `<type>(<scope>): <subject>`

1. `<type>` - the type of changes. Should be one of:

type           | description
---------------|--------------
**feat**       | a new feature 
**fix**        | a bug fix
**docs**       | documentation only changes 
**style**      | changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) 
**refactor**   | a code change that neither fixes a bug nor adds a feature 
**perf**       | a code change that improves performance 
**test**       | adding missing tests or correcting existing tests
**build**      | changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) 
**ci**         | changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) 
**chore**      | other changes that don't modify src or test files 
**revert**     | reverts a previous commit 


2. `<scope>` - here you define the scope of changes. For example: featureA, buildConfig, or any other scope you can think of.
* Should be one of:

scope             | description
------------------|-------------
**general**       | general information that doesn't match with particular scope
**model**         | changes in db model 
**user**          | changes in the user route (schema, handler, router)
**case**          | changes in the case route (schema, handler, router) including case items and case history
**appointment**   | changes in the appointment route (schema, handler, router)
**api**           | common changes in REST API that don't match to particular route
**email**         | using sengrig email sender

>
> **NOTE** the scope can be changed. Check actual scope is in `.vcmrc` file
>

3. `<subject>` - there are different methodologies to write the subject, but the main rules are as follows:
use imperative, present tense. "fix" not "fixed", "add" not "added". By the way, Git also uses this convention for its own preformateed messages("Merge pull request...").
don't capitalize first letter
do not add dot(.) at the end of subject

### examples:
* `docs(general): recreate prisma model documentation`
* `fix(case): fix post handler`
* `feat(user): add token generator`

### how to make commits:
* We are using husky `commit-msg` hook.
* If you are confident to write correct commit messages just follow the rules.
* If you are not you can use `commitizen` helper. In this case you should use `npm run commit` instead of `git commit` and just answer the questions! 

---

## documentation (local)

### 1. Swagger: 
* http://localhost:[APP_PORT]/docs/static/index.html
* check REST API endpoints and **test it!**
### 2. ER diagram: 
* https://github.com/WildCodeSchool/2022-07-EN-Berlin-Remote1-Project3Backend/blob/dev/prisma/ERD.md
* To update ER diagram after changing the model: `npx prisma migrate dev --name <model name>`
### 3. DB model and documentation: 
* http://localhost:[LIFE_SERVER_PORT]/prisma/docs/index.html
* This documentation is aimed to help you to understand the DB Model and provide some examples how to use Prisma methods. 
* To update DB model and documentation after model changes: `npx prisma migrate dev --name <model name>`
### 4. Prisma studio: 
* http://localhost:[PRISMA_STUDIO_PORT]/
* Prisma studio is the easiest way to explore and manipulate your data.
* Just run command `npx prisma studio` inside your project directory 
 
---

