## Architecture

There are three builds:
* a website (`./web/`)
* an Electron app (`./electron/`)
* a VSCode extension (`./vscode/` and `./vscode-saliva/`)

VSCode itself is built on top of Electron, which is built on top of web technologies. The web build is the least constrained and least supported by its dependency stack, and the VSCode extension the most. In order to share code between the builds, the architecture of the web version mirrors the architecture of Electron applications and the VSCode extension environment. Thus in all three, the shared elements of the editor (`./shared/`) are split into two workers/processes, the `main-process` and the `renderer-process`, but each composes these parts into the full editor in a different way.

It's planned that in the future a single main process may have multiple renderer processes, corresponding to multiple file views in a single editor instance. This is why the web version runs a shared worker instead of a dedicated worker.

### Initialization Summaries

The way the different builds initialize is a bit convoluted.

#### web

1. `npm run build` runs webpack, which compiles `built/main.js` and `built/renderer.js` and generates `built/index.html`
2. `npm run build` copies `server.js` into `built`
3. `npm run start` runs `built/server.js`
4. `built/server.js` begins serving from port 8000
5. When the user loads `localhost:8000`, the server serves `build/index.html`
6. `build/index.html`, in a script tag, loads `build/renderer.js`
7. `build/renderer.js` initializes a shared web worker running `built/main.js`
8. Concurrently (race condition):
* shared worker process
  1. `built/main.js` intializes (source: `main.ts`) the main process, which initializes (source: `initialize-main-process.ts`) its crosscontext message handler
* main process
  1. `built/renderer.js` initializes (source: `renderer.ts`) the renderer process, which initializes its crosscontext message handler (source: `initialize-renderer-process.ts`)
  2. `built/renderer.js` sends (source: `initialize-renderer-process.ts`) the `INITIALIZATION` message

The web version has a race condition because it has the process running the renderer process spawn the one running the main process rather than the other way around. We could eliminate the race condition by having the parent process in all builds decide when to send the initialization message.

#### Electron

1. `npm run build` runs webpack, which generates `main.js`, `renderer.js`, and `index.html` in `built`
2. `npm run build` copies `main-wrapper.js` and `renderer-preload.js` into `built`
3. `npm run start` runs electron, passing in the location of `built/main-wrapper.js`
4. Electron runs `built/main-wrapper.js`
5. `built/main-wrapper.js` requires `built/main.js`
6. `built/main.js` instantiates (source: `main.ts`) a BrowserWindow for the renderer process that preloads `built/renderer-preload.js`
7. `built/main.js` initializes (source: `main.ts`) the main process, which initializes (source: `initialize-main-process.ts`) its crosscontext message handler
8. `built/main.js` loads (source: `main.ts`) `built/index.html` into the renderer process
9. a script tag in `built/index.html` loads `built/renderer.js` in the renderer process and the main process waits
10. `built/renderer.js` initializes (source: `renderer.ts`) the renderer process, which initializes its crosscontext message handler (source: `initialize-renderer-process.ts`)
11. `built/renderer.js` sends (source: `initialize-renderer-process.ts`) the `INITIALIZATION` message

#### VSCode

1. (in `./vscode-saliva`) `npm run build` runs webpack, which compiles `built/extension.js` and `built/webview-with-renderers.js`.
2. `npm run start` starts an instance of VSCode using `--extensionDevelopmentPath` to include the (unactivated) extension code. VSCode loads the file under `main` in the package.json, which is `built/extension.js`.
3. Based on `package.json`, VSCode registers a custom editor and an activation point for the extension.
4. In the extended VSCode instance, the user loads a file ending in `.foli.json`. VSCode matches the filename against the registered editor's filename pattern `*.foli.json`, detects a match, and launches the custom editor.
5. The launch of the custom editor triggers the extension's activation event. VSCode runs `built/extension.js`'s `activate` function (source: `./vscode-saliva/src/extension.ts`)
6. `built/extension.js` intializes (source: `perhaps-foliage-editor-provider.ts`) the main process, which initializes (source: `initialize-main-process.ts`) its crosscontext message handler
7. `built/extension.js` creates (source: `perhaps-foliage-editor-provider.ts`) a webview and sets its HTML, including a script tag pointing to `built/webview-with-renderers.js`
8. VSCode creates the webview and runs `built/webview-with-renderers.js`
9. `built/webview-with-renderers.js` initializes (source: `webview.ts`) the renderer process, which initializes its crosscontext message handler (source: `initialize-renderer-process.ts`)
10. `built/webview-with-renderers.js` sends (source: `initialize-renderer-process.ts`) the `INITIALIZATION` message
