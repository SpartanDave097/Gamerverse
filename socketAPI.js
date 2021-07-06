var socketIO = require('socket.io');

const io = socketIO();
var socketAPI = {};

socketAPI.io = io;

// **** WebSocket Server ****

io.on('connection', (socket) => {
    console.log('A user connected')
    socket.on('chatter', (message) => {
        console.log('chatter: ', message)
        io.emit('chatter', message)
    });
});

module.exports = socketAPI;