For context, I (Luke Persola) am the sole contributor so far. I'd welcome small changes—submit a PR. If you want to do something more significant, just reach out to me for the time being.

#### Development setup

First, see how to build and run the builds in README.md

##### A note on VSCode

This project includes a VSCode extension. VSCode includes some features that make it easier to develop VSCode extensions within VSCode itself. For this reason, it's generally assumed the project will be developed using VSCode, at least as a text editor and for debugging in some cases. If you use another editor, you may need to set up some parts of the development environment for yourself.

A `.code-workspace` file is provided at the top level. It's a multi-root workspace, with one directory at the top level to include everything and one directory for each project, so VSCode will recognize configuration per project. This is necessary, for example, for launching VSCode debuggers. (Perhaps some problem could be caused by having a multi-root workspace in which some of the directories are ancestors of others?)

##### Debugging

Background info
[debugging node](https://nodejs.org/en/docs/guides/debugging-getting-started/)
[remote-redux-devtools](https://github.com/zalmoxisus/remote-redux-devtools)

* web
  * the main process (renderer context): use your browser's dev tools
  * the web worker (core context): use your browser's web worker debug method
    * Firefox: [this firefox](about:debugging#/runtime/this-firefox) -> `Shared Workers`
      * not sure how to set break points in the code of a newly instantiated shared worker (to inspect app initialization)
    * redux dev tools?
* electron
  * [the main process (core context)](https://www.electronjs.org/docs/latest/tutorial/debugging-main-process)
    * a launch.json is provided to work with the VSCode debugger
    * redux dev tools?
  * the renderer process (renderer context): use dev tools built into electron window
* vscode extensions
  * the main process (core context)
    * a launch.json is provided to work with the VSCode debugger
    * redux dev tools?
  * the renderer process (renderer context)
    * use the dev tools in the VSCode instance running the extension (Developer: Toggle Developer Tools)
      * source maps don't work due to [a bug](https://github.com/microsoft/vscode/issues/145184)
      * to get the built file: top -> some random string -> pending-frame (index.html) -> file+vscode-resource.vscode-cdn.net -> full filesystem path

##### Known Errors

```shell
Module not found: Error: Can't resolve 'bufferutil' in '[...]/shared/node_modules/ws/lib'
```
and
```shell
Module not found: Error: Can't resolve 'utf-8-validate' in '[...]/shared/node_modules/ws/lib'
```

See [thread](https://github.com/websockets/ws/issues/1220). You can ignore them.

`SocketProtocolError`
also seemingly related to ws library via remote-redux-devtools
