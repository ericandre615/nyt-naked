var http = require('http');
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 8080;

http.createServer(function(req, res) {
  var filePath = ('.' + req.url === './') ? './index.html' : '.' + req.url;
  var extname = path.extname(filePath);
  var contentTypes = {
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.html': 'text/html'
  };

  if(filePath === './favicon.ico') {
    res.writeHead(404);
    res.write('404 - missing');
    res.end();
    return;
  }

  fs.readFile(filePath.replace('./', './public/'), function(err, content) {
    if(err) {
      res.writeHead(500, {"Content-Type": "text/plain"});
      res.write('500 Internal Server Error');
      res.end();
      return;
    }

    res.writeHead(200, {"Content-Type": contentTypes.extname});
    res.end(content, 'UTF-8');
  });
}).listen(port);

console.log('Server listening on port ', port);
