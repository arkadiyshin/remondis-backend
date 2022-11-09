# For contributors

---

## repository structure

**_branches_**
* `main` - production branch
* `dev` - make pull requests to this branch with all working code 
* `<feature>` - create and use the branch for each feature

---

## commit rules

**_commit message should contain 3 parts_**: 
> `<type>(<scope>): <subject>`

* `<type>` - the type of the made changes. Should be one of:
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
* `docs (general): recreate prisma model documentation`
* `fix (case): fix post handler`
* `feat (user): add token generator`

---

## documentations

1. Swagger: http://localhost:[APP_PORT]/docs/static/index.html
* check REST API endpoints and test it
1. ER diagram: https://github.com/WildCodeSchool/2022-07-EN-Berlin-Remote1-Project3Backend/blob/dev/prisma/ERD.md
* To update ER diagram after model changes: `npx prisma migrate dev --name <model name>`
1. DB model and documentation: http://localhost:[LIFE_SERVER_PORT]/prisma/docs/index.html
* To update DB model and documentation after model changes: `npx prisma migrate dev --name <model name>`
1. Prisma studio: http://localhost:[PRISMA_STUDIO_PORT]/
* Prisma studio the easiest way to explore and manipulate your data. Just run inside your project directory command `npx prisma studio`
 
---

