
const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname+"/public")));

io.on("connection",function(socket){
    socket.on("sender-join",function(data){
        socket.join(data.uid);
    });
    socket.on("recever-join",function(data){
        socket.join(data.uid);
        socket.in(data.uid).emit("init",data.uid);
    });
    socket.on("file-meta",function(data){
        socket.in(data.uid).emit("fs-meta",data.metedata);
    });
    socket.on("fs-start",function(data){
        socket.in(data.uid).emit("fs-share",{});
    });
    socket.on("fs-raw",function(data){
        socket.in(data.uid).emit("fs-share",data.buffer);
    });
})

server.listen(5000);