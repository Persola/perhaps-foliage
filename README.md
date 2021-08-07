# Saliva REPL

⚠️ *Most of the basic functionality of this project doesn't work yet.*

⚠️ *This project is highly unstable. Breaking changes are unrelenting.*

⏱️ *Note: The author plans on splitting this repo up into several new repos before too long.*

[repo](https://gitlab.com/Persola/saliva-repl)

### About
This repo contains an as-of-yet unentitled visual interface for writing and editing tree-based data structures (a structure editor). The primary use case is as a visual programming interface, in which case the data structure is an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree).

##### Project Structure

The repo contains seven NPM packages:

* `./shared` contains the core of the editor
* there are three build targets:
  * a web app (`./web/`)
  * a Electron app (`./electron/`)
  * a VSCode extension (`./vscode/`)
* To actually use the editor you also need an integration for the laguage you are editing, which are included for two (so-called) languages:
  * Pantheon, a toy data spec used for testing (`./pantheon/`)
  * Saliva, a rudimentary programming language implemented as part of this project in order to demonstrate the capabilities of the editor (`./saliva/`)
* If you're using the VSCode build, you actually need an extension to knit together the editor extension and the language integration. This will soon exist for Saliva in `./vscode-saliva/`

### How To Use

#### (1) Set up
Leaving this vague for now, but if you have Node and a package manager, probably just `npm install` each package.

#### (2) Build the editor

Choose one of the editor builds above, then `npm run build` there.

#### (4) Build a language integration

As before, choose and language build and `npm run build` inside it. (If using `vscode-saliva`, build that, too.)

#### (5) Run

##### Web
1. `npm run start`
2. Navigate to `localhost:8000` in a browser

##### Electron
```shell
npm run start
```
An electron window should appear.

##### VSCode
I haven't published the extension, but you can do a test run using the [VSCode's extension testing capabilities ](https://code.visualstudio.com/api/working-with-extensions/testing-extension) (basically: open the source in VSCode and press `F5`).

#### (6) Use
1. Use the `load file` input to load the Pantheon or Saliva integration you built (should appear at `./`(`saliva` or `pantheon`)`/dist/`(`saliva` or `pantheon`)`Integration.js`).
2. Drag-n-drop a file in the corresponding language into the top part of the editor. Samples are found in `./`(`pantheon` or `saliva`)`/static/`.

### Type Check
```shell
npm run type
```

### Lint
```shell
npm run lint
```
