// This gets directly copied into ./built

// wrap so webpack won't pack electron
const electron = require('electron'); // eslint-disable-line @typescript-eslint/no-var-requires
require('./main.js').default(electron); // eslint-disable-line
