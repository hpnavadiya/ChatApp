const io = require('socket.io')(5000)

const users = {};

// It will listen all the connect 
io.on('connection', socket => {
    // It will handle perticular user
    socket.on('new-user-joined', name => {
        users[socket.id] = name; 
        // When new user join the chat will give msg to all 
        socket.broadcast.emit('user-joined', name)
    });

    // while send the msg to everyone
    socket.on('send', message=>{
                            // name of event
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message=>{
                                        // unique id for every collection
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id]
    });
})