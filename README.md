# Saliva REPL

This is a scaffold for a programming interface which more richly integrates with the code it presents

### Requirements
* Node.js
* Node Package Manager
* (some left unspecified)

### Setup
* have installed:
  * node.js (including npm)
  * [? not actually necessary ?] python2 (needed for some package)
  * (probably some other common things)
* `npm install`

### Build
```shell
npm run build
```

### Run

##### Web
1. `npm run start:web`
2. Navigate to `localhost:8000` in a browser

##### Electron
```shell
npm run start:electron
```

### Test
The test suite has been forsaken.

### Test Coverage Check
Open `./tmp/coverage/index.html` in a browser. The interface refreshes when tests are run.

### Type Check
```shell
npm run type
```

### Type Check Coverage Check
```shell
npm run type-cov
```

### Lint
```shell
npm run lint
```
