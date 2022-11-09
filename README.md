# For contributors

---

## tech stack

1. **_typescript_**

2. **_fastify_**
* `@fastify/autoload`
* `fastify-plugin`
* `@fastify/jwt`
* `@fastify/swagger`

3. **_prisma_**
* `@prisma/client`
* `prisma-docs-generator`
* `prisma-erd-generator`

---

## repository structure

**_branches_**
* `main` - production branch
* `dev` - make pull requests to this branch with only working code 
* `<feature>` - create and use the branch for each feature

---

## commit rules

**_commit message should contain 3 parts_**: 
> `<type>(<scope>): <subject>`

* `<type>` - the type of changes. Should be one of:
> * feat - some feature development
> * fix - bug fix
> * docs - changes in documentation
> * style - formatting changes
> * refactor - changes those do not fix a bug or implement a feature. Simple refactoring
> * test - changes to tests or addition of new ones
> * chore - any other changes, not affecting code

* `<scope>` - here you define the scope of changes. For example: featureA, buildConfig, or any other scope you can think of.
* `<subject>` - there are different methodologies to write the subject, but the main rules are as follows:
use imperative, present tense. "fix" not "fixed", "add" not "added". By the way, Git also uses this convention for its own preformateed messages("Merge pull request...").
don't capitalize first letter
do not add dot(.) at the end of subject

*examples:*
* `docs(general): recreate prisma model documentation`
* `fix(case): fix post handler`
* `feat(user): add token generator`

*how to make commits:*
> * We are using husky `commit-msg` hook.
> * If you are confident to write correct commit messages just follow the rules.
> * If you are not you can use `commitizen` helper. In this case you should use `npm run commit` instead of `git commit` and just answer the questions! 

---

## documentations

1. Swagger: http://localhost:[APP_PORT]/docs/static/index.html
* check REST API endpoints and **test it!**
2. ER diagram: https://github.com/WildCodeSchool/2022-07-EN-Berlin-Remote1-Project3Backend/blob/dev/prisma/ERD.md
* To update ER diagram after changing the model: `npx prisma migrate dev --name <model name>`
3. DB model and documentation: http://localhost:[LIFE_SERVER_PORT]/prisma/docs/index.html
* This documentation is aimed to help you to understand the DB Model and provide some examples how to use Prisma methods. 
* To update DB model and documentation after model changes: `npx prisma migrate dev --name <model name>`
4. Prisma studio: http://localhost:[PRISMA_STUDIO_PORT]/
* Prisma studio is the easiest way to explore and manipulate your data.
* Just run command `npx prisma studio` inside your project directory 
 
---

