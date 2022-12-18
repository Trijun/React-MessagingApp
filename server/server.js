const app = require('express')
const http = require('http').createServer(app)
const io = require('socket.io')(http,{
    cors: {
      origin: "*"
    }
  }
)

io.on('connection', socket =>{
    const id = socket.handshake.query.id
    
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
 
    console.log('a user connected')

    socket.join(id)

    socket.on('send-message', ({recipients, text})=>{
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter( r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message',{
                recipients: newRecipients, sender: id, text
            })
        })
    })

    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })
})

http.listen(5000,()=>{
    console.log("listening to port 5000")
})