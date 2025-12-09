import {Server} from 'socket.io';
import http  from 'http';
import express from 'express';
import {ENV} from '../lib/env.js';
import { socketAuthMiddleware } from '../middlewares/socket.auth.middleware.js';



const app = express()
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: ENV.CLIENT_URL,
        credentials: true
    },
})

io.use(socketAuthMiddleware);


//to store online user
const userSocketMap = {} //{userID: socketID}

io.on("connection",(socket)=>{
    console.log("A user connected: ",socket.user.fullName);

    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    //io.emit send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); 

    //with socket.on we listen for events form client
    socket.on("disconnect",()=>{
        console.log("A user disconnected: ",socket.user.fullName);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
})

export {io, server, app}