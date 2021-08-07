// wrap so webpack won't pack electron
const electron = require('electron'); // eslint-disable-line @typescript-eslint/no-var-requires
require('./core.ts').default(electron); // eslint-disable-line @typescript-eslint/no-var-requires
