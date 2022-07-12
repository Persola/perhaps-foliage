# [Saliva REPL](https://gitlab.com/Persola/saliva-repl)

⚠️ *Most of the basic functionality of this project doesn't work yet.*

⚠️ *This project is highly unstable. Breaking changes are unrelenting.*

⏱️ *Note: The author plans on splitting this repo up into several new repos before too long.*

### About
This repo contains an as-of-yet unentitled visual interface for writing and editing tree-based data structures (a structure editor). The primary use case is as a visual programming interface, in which case the data structure is an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree).

To be useful, the editor must be provided with a language integration specific to this editor and the language the data being edited is written in. When editing code, that language will be a programming language.

##### Project Structure

The repo contains seven NPM packages:

* `./shared/` contains most of the editor source code
* Two language integrations:
  * In `./pantheon/`, an integration for Pantheon, a toy data spec used for testing 
  * In `./saliva/`, an integration for Saliva, a rudimentary programming language implemented as part of this project in order to demonstrate the capabilities of the editor
* The VSCode base extension (`./vscode/`), which does not run independently
* Three working builds:
  * A web app (`./web/`), which hotloads language integrations
  * An Electron app (`./electron/`), which hotloads language integrations
  * A language-specific VSCode extension (`./vscode-saliva/`), which knits together the VSCode base extension and the Saliva language integration

### How To Use

#### 1. Set up
Leaving this vague for now, but if you have Node and a package manager, roughly just `npm install` each package.

#### 2. Build

Choose which builds and language integrations you want to use.

##### 2a. web/Electron

Run `npm run build` in the subdirectory of the build and in the subdirectory of the language integration.

##### 2b. VSCode language-specific extension

Run `npm run build` in `./vscode/` and `./saliva/`. Then, run `npm run build` in `./vscode-saliva/`.

#### 3. Run

##### 3a. Web
1. `npm run start`
2. Navigate to `localhost:8000` in a browser
3. Use the file selector to load the language integration you built (`./saliva/built/saliva-hotloadable-integration.js` or `./pantheon/built/pantheon-integration.js`)
4. Drag a data file into the editor panel (sample files in `./saliva/src/static/` and `./pantheon/src/static/`)
##### 3b. Electron
1. `npm run start` (an electron window should appear)
2. Use the file selector to load the language integration you built (`./saliva/built/saliva-hotloadable-integration.js` or `./pantheon/built/pantheon-integration.js`)
3. Drag-n-drop a data file into the editor panel (sample files in `./saliva/src/static/` and `./pantheon/src/static/`)

##### 3c. VSCode

1. `npm run start` (I haven't published the extension yet, so this uses [VSCode's extension testing capabilities](https://code.visualstudio.com/api/working-with-extensions/testing-extension).)
2. In the VSCode window that appeared, open a data file (sample files in `./saliva/src/static/`)

#### 4. Key Bindings

| Action | Input |
| - | - |
| Navigation | `↑`, `↓`, `←`, `→` |
| Replace selected boolean | `t`, `f`, `0`, `1` |
| Delete | `delete` |
| Interpret (Saliva only) | `enter` |

### Type Check
```shell
npm run type
```

### Lint
```shell
npm run lint
```
