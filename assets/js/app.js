import Vue from 'vue'

new Vue({
  el: '#root',
  data: {
    notSupported: false,
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
    // Set protocol
    let protocol = 'wss://'
    
    if (location.protocol != 'https:') {
        protocol = 'ws://'
      }

    if (!window.WebSocket) {
      this.notSupported = true
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
        if (this.messages.length >= 10) {
          this.removeMessage()
        }
        console.log('NEW MESSAGE: ' + event)
        this.messages.push(event.data)
      })
    }
})