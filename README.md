## commit rules

### commit message shoul contain 3 parts: 
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
