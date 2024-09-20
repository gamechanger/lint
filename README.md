## Gamechanger JS/TS linting rules
### Updating ES-Lint
**Follow these steps to make updates to lint tools:**
1. Make your updates locally. Be sure to run `yarn` to update lock files.
2. After your package version updates are made, be sure to update the `package.json` version. Ex: "version": "0.0.11" -> "version": "0.0.12"
3. Create tag
   a. After merging your change, create a tag locally
   b. switch to master branch and `git pull origin master`
   c. create the tag: `git tag vx.x.xx` (replace with your version number)
   d. push your tag: `git push origin vx.x.xx` (replace with your version number)
   e. This will trigger the [Publish workflow](https://github.com/gamechanger/lint/actions/workflows/publish.yml) to push the new package.
4. In Eden, you can now update `@gamechanger/eslint-plugin` with the appropriate version number
---
