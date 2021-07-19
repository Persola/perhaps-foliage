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

##### Web
```shell
npm run build:web
```

##### Electron
```shell
npm run build:el
```

##### Saliva Integration
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

### Use
1. use the load file input to load the Saliva Integration (src/extension-staging-area/saliva/dist/salivaIntegration.js)
2. drag saliva files into the top of the editor to edit, insofar is possible atm (sample code in src/extension-staging-area/saliva/static)

### Type Check
```shell
npm run type
```

### Lint
```shell
npm run lint
```
