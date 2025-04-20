const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const {Server} = require('socket.io');

const server = http.createServer(app);

const io = new Server(server , {
    cors:{
        origin:'*'
    }
})
const PORT = 3000;

// Socket.IO logic
io.on("connection", (socket) => {
    console.log('A user connected',socket.id);
    socket.emit('message', 'هذه هي الرسالة الخاصة بي!'); // Emit to the connected client

    // socket.on('disconnect', () => {
    //     io.emit('message', 'User has left the chat');
    // });

    // socket.on('getMsg', (msg) => {
    //     io.emit('message', msg); // Broadcast message to all clients
    // });
    // socket.on('d-msg' ,(data)=>{
    //     console.log(data);
    // });
    // socket.on('click-msg' , (click)=>{
    //     console.log('click' ,click);
        
    // });
    
    socket.on('client-recive' ,(msg)=>{
        console.log(msg);
    });

    socket.on('send-msg' ,(event)=>{
        socket.broadcast.emit('recive-msg' , event);
        console.log(event);
        
    })

});

// Express routing
const router = express.Router();
app.use(express.json())
router.post('/io-route', (req, res) => {
    const {message} = req.body;
  io.emit('message' , 'route message');
  res.json({message});
});


app.use('/api', router);

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
