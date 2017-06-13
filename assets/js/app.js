import Vue from 'vue'

new Vue({
  el: '#root',
  data: {
    title: 'Websocket Chat Example',
    username: null,
    input: null,
    messages: [],
    socket: null
  },
  methods: {
    sendMessage() {
      this.socket.send(this.input)
      this.input = null
    },
    removeMessage() {
      this.messages.splice(0, 1)
    }
  },
  mounted() {
    // Check if Websocket object is available
    if (!window.WebSocket) {
      this.title = 'This browser does not support websockets'
    }

    // Set protocol
    let protocol = 'wss://'
    
    if (location.protocol != 'https:') {
        protocol = 'ws://'
      }
  
    // Create WebSocket connection.
    const socket = new WebSocket(protocol + location.host)

    // Connection opened
    socket.addEventListener('open', event => {
      console.log('Websocket connection open')
      this.socket = socket
    })

    // Listen for messages
    socket.addEventListener('message', event => {
      if (this.messages.length >= 20) {
        this.removeMessage()
      }
      console.log(event)
      this.messages.push(event)
    })
  }
})