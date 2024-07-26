const express= require('express')
const cors= require("cors")
const morgan= require("morgan")
const colors= require("colors")
const dotenv= require("dotenv")
const connectDB= require("./config/db")
const cookieParser= require('cookie-parser')
const path= require ('path')

const http = require('http');
const socketIo = require('socket.io');

// env configure.
dotenv.config({path: "./config/.env"});

// mongoDB connection.
connectDB();

//routers
const userRoutes= require('./routers/userRoutes');
const connectionRoutes= require('./routers/connectionRoutes');
const postRoutes= require('./routers/postRoutes');
const messageRoutes= require('./routers/messageRoutes');
const commentRoutes= require('./routers/commentRoutes');

// models
const messageModel = require('./models/messageModel')

// rest object 
const app= express();
const server = http.createServer(app);
const io = socketIo(server,{
  cors:{
      origin:"http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
  },
});


// middlewares
app.use(express.static(path.join(__dirname, "/public")));
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

//routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/user', connectionRoutes);
app.use('/api/v1/user', postRoutes);
app.use('/api/v1/user', messageRoutes);
app.use('/api/v1/user', commentRoutes);

//PORT
const PORT= process.env.PORT;
const DEV= process.env.DEV_MODE;

// web socket
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (userId) => {
    socket.join(userId);
  });

  socket.on('sendMessage', async (data) => {
    const { senderId, receiverId, content } = data;

    if(content && content.trim() !== ''){
      const message = new messageModel({ senderId, receiverId, content });
      await message.save();
      io.emit('receiveMessage', message);
      io.to(receiverId).emit('notification', { message: 'You have a new message', senderId });
    } 
    
  });

  socket.on('deleteMessage', async (messageId) => {
    await messageModel.findByIdAndDelete(messageId);
    io.emit('messageDeleted', messageId);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


// listen
server.listen(PORT, ()=>{
    console.log(`Server running on ${DEV} mode port no. ${PORT}`.bgCyan.white);
})