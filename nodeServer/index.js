// node server to handle io connections
const io = require('socket.io')(8000);

const users={};

io.on('connection', socket=>{
    //if any new user joins, let other users connected to the server know!
    socket.on('new-user-joined', name=>{
        console.log('New User', name)
        users[socket.id] =name;
        socket.broadcast.emit('user-joined',  name);
    });

    //if someone sends a message, broadcast it to all other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name:users[socket.id]})
    });

    //If someone leaves the chat, let others know
    //disconnect is built in event...It will fire if any user leaves 
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});