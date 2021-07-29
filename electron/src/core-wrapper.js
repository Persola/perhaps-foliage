// wrap so webpack won't pack electron
const electron = require('electron');

require('./core.js').default(electron);
