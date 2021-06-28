const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const ROOT_PATH = './dist';
const DEFAULT_PATH = `${ROOT_PATH}/index.html`;
const FAVICON_PATH = './web-repl/favicon.ico';

http.createServer((request, response) => {
  console.log('request ', request.url);

  let filePath = ROOT_PATH + request.url;
  if (request.url === '/') filePath = DEFAULT_PATH;
  else if (request.url === '/favicon.ico') filePath = FAVICON_PATH;

  const extname = String(path.extname(filePath)).toLowerCase();
  let contentType = 'text/html';
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml',
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
