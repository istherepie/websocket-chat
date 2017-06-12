'use strict'

// Modules
const http = require('http')
const express = require('express')
const WebSocket = require('ws')

// Constants
const app = express()
const server = http.createServer(app)
const port = process.env.SERVER_PORT || 4000
const wss = new WebSocket.Server({ server })

// Clients map
let clients = new Map()

// Websocket
wss.on('connection', (socket, request) => {
	let key = request.headers['sec-websocket-key']
  clients.set(key, socket)

  socket.on('message', message => {
    clients.forEach(client => {
    	client.send(message)
    })
  })

  socket.send('Welcome to the chat')

  socket.on('close', event => {
  	clients.delete(key)
  })
})

// Serve static content
app.use('/', express.static('public'))

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

// Start server
server.listen(port, function() {
	console.log('Server is fully armed and operational on port: %s', port)
})