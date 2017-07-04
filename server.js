var http = require('http');
var fs = require('fs');
var path = require('path');

const PORT = 8000
const ROOT_PATH = './serve'
const DEFAULT_PATH = ROOT_PATH + '/index.html'
const NOT_FOUND_PATH = './static/404.html'

http.createServer(function (request, response) {
  console.log('request ', request.url);

  var filePath = ROOT_PATH + request.url;
  if (request.url == '/')
    filePath = DEFAULT_PATH;

  var extname = String(path.extname(filePath)).toLowerCase();
  var contentType = 'text/html';
  var mimeTypes = {
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
    '.svg': 'application/image/svg+xml'
  };

  contentType = mimeTypes[extname] || 'application/octet-stream';

  console.log(filePath)
  fs.readFile(filePath, function(error, content) {
    if (error) {
      if(error.code == 'ENOENT'){
        fs.readFile(NOT_FOUND_PATH, function(error, content) {
          console.log(error)
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        });
      }
      else {
        response.writeHead(500);
        response.end('unspecified server error: ' + error.code + ' ..\n');
        response.end();
      }
    }
    else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });

}).listen(PORT);
console.log('HTTP server: http://127.0.0.1:' + PORT + '/');

