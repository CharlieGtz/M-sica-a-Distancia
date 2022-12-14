const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
app.use('/',express.static('./public'))

io.on('connection', function(socket){
	socket.on('note', function(note){
		console.log(note)
		io.sockets.emit('desde_servidor',note)
	})
})

server.listen(5001, function(){
	console.log('Servidor corriendo en el puerto 5001.')
})