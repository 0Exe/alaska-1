const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// make /static = public
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/base.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('user', `<span class="message" style="color: #32a83a">New User Connected</span>`);

    //socket.broadcast.emit('hi');

    socket.on('chat message', (msg) => {
        //console.log('message: ' + msg);
        io.emit('chat message', msg);
      });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('user', `<span class="message" style="color: #a83234">User Disconnected</span>`);
      });
});


// run on ip address and port
server.listen(3000, () => {
    console.log('listening on *:3000');
});