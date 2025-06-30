## Gamechanger JS/TS linting rules

### Updating ES-Lint

**Follow these steps to make updates to lint tools:**

1. Make your updates locally. Be sure to run `yarn` to update lock files.
1. After your package version updates are made, be sure to update the `package.json` version. Ex: "version": "0.0.11" -> "version": "0.0.12"
1. Create tag
   * After merging your change, create a tag locally
   * switch to main branch and `git pull origin main`
   * create the tag: `git tag vx.x.xx` (replace with your version number)
   * push your tag: `git push origin vx.x.xx` (replace with your version number)
   * This will trigger the [Publish workflow](https://github.com/gamechanger/lint/actions/workflows/publish.yml) to push the new package.
1. In Eden, you can now update `@gamechanger/eslint-plugin` with the appropriate version number

---

### Testing New Hooks or Rule Changes Without Publishing

1. Have Eden cloned side-by-side with this repo (e.g. my_dir/eden and my_dir/lint). Yes, you can do this from an Eden codespace by simply backing up one directory via `cd ..` and then cloning side-by-side in the /workspaces folder.
1. From a terminal in the Eden folder run this command

```
pre-commit try-repo ../lint some_hook
```

replacing `some_hook` with either `eslint` to lint the TS and JS or `eslint-package-json` to lint the package files.

---

### Important Notes

#### additional_dependencies for eslint based hooks
It is unfortunate but necessary that the `additional_dependencies` section in the .pre-commit-hooks.yaml, for any hook that uses eslint, include ALL of the dependencies used by every eslint hook. This is because the index.js file is loaded no matter which eslint driven hook is run, and it will fail to load due to missing depenedencies. Remember, pre-commit handles dependencies differently so even if they are in the node_modules folder, that isn't good enough.

---
