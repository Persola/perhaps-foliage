# Saliva REPL

⚠️ *Most of the basic functionality of this project doesn't work yet.*

⚠️ *This project is highly unstable. Breaking changes are unrelenting.*

⏱️ *Note: The author plans on splitting this repo up into several new repos before too long.*

[[repo](https://gitlab.com/Persola/saliva-repl)]

### About
This repo contains a as-of-yet unentitled visual interface for writing and editing tree-based data structures (a structure editor). The primary use case is as a visual programming interface, in which case the data structure is an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree).

There are three builds:
1. web (`./web/`)
2. Electron (`./electron/`)
3. a VSCode extension (`./vscode/`)

Actually editing also requires a language integration, which are included for two (so-called) languages:

1. Pantheon, a toy data spec used for testing (`./pantheon`)
2. Saliva, a rudimentary programming language implemented as part of this project in order to demonstrate the capabilities of the editor (`./saliva`)


### Setup
I'm not going to be specific until I break up the repo because it'll differ by build. But I imagine it's not much beyond installing node and `npm install`.

### Build (editor)

##### Web
```shell
npm run build:web
```

##### Electron
```shell
npm run build:el
```

##### VSCode
```shell
npm run build:vsc
```
### Build (language integration)

##### Pantheon integration
```shell
npm run build:pantheon
```

##### Saliva integration
```shell
npm run build:saliva
```

### Run

##### Web
1. `npm run start:web`
2. Navigate to `localhost:8000` in a browser

##### Electron
```shell
npm run start:el
```
An electron window should appear.

##### VSCode
I haven't published the extension, but you can do a test run using the [VSCode's extension testing capabilities ](https://code.visualstudio.com/api/working-with-extensions/testing-extension) (basically: open the source in VSCode and press `F5`).

### Use
1. Download it, then as described above:
    * setup
    * build the editor in at least one way
    * build at least one language integration
    * run it
1. Use the `load file` input to load the Pantheon or Saliva integration you built (should appear at `./saliva/dist/`(`saliva` or `pantheon`)`Integration.js)`
2. Drag-n-drop a file in the corresponding language into the top part of the editor. Samples are found in `./`(`pantheon` or `saliva`)`/static/`.

### Type Check
```shell
npm run type
```

### Lint
```shell
npm run lint
```
