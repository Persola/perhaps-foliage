const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const ROOT_PATH = './web/built';
const DEFAULT_PATH = `${ROOT_PATH}/index.html`;
const FAVICON_PATH = './web/favicon.ico';

http.createServer((request, response) => {
  console.log('request ', request.url);

  let filePath = ROOT_PATH + request.url;
  if (request.url === '/') filePath = DEFAULT_PATH;
  else if (request.url === '/favicon.ico') filePath = FAVICON_PATH;
  else if (request.url.match(/-integration.js.map/)) {
    const integrationName = request.url.match(/([^/]+)-integration.js.map/)[1];
    filePath = `./${integrationName}/dist/${integrationName}-integration.js.map`;
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  let contentType = 'text/html';
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
  };

  contentType = mimeTypes[extname] || 'application/octet-stream';

  console.log(filePath);
  fs.readFile(filePath, (error, content) => {
    if (error) {
      console.log(error);
      if (error.code === 'ENOENT') {
        response.writeHead(404);
        response.end('Resource not found');
      } else {
        response.writeHead(500);
        response.end('Unspecified server error');
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
}).listen(PORT);
console.log(`HTTP server: http://127.0.0.1:${PORT}/`);
