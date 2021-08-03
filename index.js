const logging = require('aedes-logging')
const aedes = require('aedes')()
const http = require('http')
const express = require('express');
const ws = require('websocket-stream')

const app = express();
app.use(express.static('public'))

const server = http.createServer(app)
  .on('listening', () => {
    console.log('Your app is listening!');
  })
  .on('close', () => {
    console.log('server closed');
  })
  .on('error', err => {
    console.error(err);
  });

logging({instance: aedes, servers: [server]})

ws.createServer({server}, aedes.handle)

const port = 8888

server.listen(port, function () {
  console.log('websocket server listening on port ', port)
})
