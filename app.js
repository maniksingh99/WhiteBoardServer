const express = require('express');
const app = express();

const http = require('http').createServer(app);

//socket enabled server
const io = require('socket.io')(http);

app.use(express.static("client"));

// app.get("/", function (req, res) {
//     res.end("<h1>Welcome to home Page</h1>")
// })

io.on("connection",function(socket){
    console.log("New client connected");
    console.log(socket.id);
    socket.on("color",function(color){
        socket.broadcast.emit('colorchange',color);
    })
    socket.on("md",function(point){
        socket.broadcast.emit("onmd",point);
    })
    socket.on("mm",function(point){
        socket.broadcast.emit("onmm",point);
    })
})

let port = process.env.PORT || 3000;
http.listen(port,function(){
    console.log("Server started at port 3000");
})
