import fs from 'node:fs';
import http from 'node:http';

const server = http.createServer((req, res) => {

  console.log(req.url)

  // const data = {
  //     nombre: 'Jeison',
  //     edad: '39'
  // };

  // res.writeHead(200, { 'content-type': 'application/json'})
  // res.end(JSON.stringify(data));

  if (req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(htmlFile);
    return;
  }
  if (req.url?.endsWith('.js')) {
    {
      res.writeHead(200, { "content-type": 'application/javascript' })
    }
  }
  if (req.url?.endsWith('.css')) {
    {
      res.writeHead(200, { 'content-type': 'text/css' })
    }
  }

  const responseContent = fs.readFileSync(`./public/${req.url}`, 'utf-8')

  res.end(responseContent);



})


server.listen(8080, () => {

  console.log('serverRunning on port 8008')

})