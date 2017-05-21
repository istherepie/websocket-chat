'use strict'

// Elements
var messages = document.getElementById('messages')
var input = document.getElementById('input')
var submit = document.getElementById('submit')

if (!window.WebSocket) {
	let error = document.createElement('p')
	error.innerHTML = 'Sorry, your browser does not support websockets'
	messages.append(error)
}

// If browser supports websockets
if (window.WebSocket) {
	// Set protocol
	let protocol = 'wss://'

	if (location.protocol != 'https:') {
		protocol = 'ws://'
	}

	// Create WebSocket connection.
	const socket = new WebSocket(protocol + location.host)

	// Connection opened
	socket.addEventListener('open', function (event) {
    console.log('Websocket connection open')
	})

	// Listen for messages
	socket.addEventListener('message', function (event) {
		let incoming = document.createElement('p')
		incoming.innerHTML = event.data
		messages.append(incoming)
	})

	// Send input value when clicked
	submit.addEventListener('click', event => {
		let message = input.value
		socket.send(message)
		input.value = null
	})

}