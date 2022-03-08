const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users={};

io.on('connection',socket=>{    //will listen to diiferent connections
    socket.on('new-user-joined',name=>{    //this will happen once a user joined a chat
        console.log("New user", name)
        users[socket.id]=name;  //will store name of each candidate in users[]
        socket.broadcast.emit('user-joined', name);  //tell everyone somenone joined
    })

    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})  // send message 
    });

    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id])   // when user disconnects or leaves the chat
        delete users[socket.id];   // deletes the user from users[]
    });
})