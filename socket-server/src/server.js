const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {

    console.log(`Cliente conectado: ${socket.id}`)

    socket.on('mensaje', (msg) => {
        io.emit('mensaje', msg);
    })

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`)
    })

});

server.listen('4000', () => {
    console.log('Servidor Corriendo ...')
});