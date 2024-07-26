import React, { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { TextField, Button, IconButton} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MessageRoom = () => {
  const socket= useMemo( ()=> io("http://localhost:8080"), []);

  const location= useLocation();
  const receiver= location.state.Receiver;
  const senderId= location.state.SenderId;
  const navigate= useNavigate();

  //state variable
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.emit('join', senderId);

    socket.on('receiveMessage', (message) => {
      if (message.senderId === receiver._id || message.receiverId === receiver._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    socket.on('notification', (data) => {
      toast.success(data.message);
    });

    socket.on('messageDeleted', (messageId) => {
      setMessages((prevMessages) => prevMessages.filter(msg => msg._id !== messageId));
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [receiver._id, senderId]);


  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(`http://localhost:8080/api/v1/user/all-messages/${senderId}/${receiver._id}`);
      setMessages(response.data.messages);
    };
    fetchMessages();
  }, [receiver._id, senderId]);


  // handle SendMessage
  const handleSendMessage = () => {
    const message = {
      senderId: senderId,
      receiverId: receiver._id,
      content: newMessage,
    };
    socket.emit('sendMessage', message);
    setNewMessage('');
  };

  // handleDelete msg.
  const handleDelete = (messageId) => {
    socket.emit('deleteMessage', messageId);
    toast.success("msg deleted");
  };

  //handleBack
  const handleBack= async ()=> {
    navigate("/messaging");
  }

  return (
    <> 
      <div style={{overflowY:"scroll", width:"100%", height:"566px" ,
        backgroundImage: 'url("https://media.istockphoto.com/id/1403848173/vector/vector-online-chatting-pattern-online-chatting-seamless-background.jpg?s=612x612&w=0&k=20&c=W3O15mtJiNlJuIgU6S9ZlnzM_yCE27eqwTCfXGYwCSo=")',
      }}>

        <div style={{display:"flex", justifyContent:"flex-end"}}>
            <IconButton onClick={handleBack}>
                <CloseIcon color="error"/>
            </IconButton>
        </div>
      
        {messages.map((msg) => 
          <>
            {(msg.senderId === senderId) && (<div style={{backgroundColor:"dodgerblue", color:"white", padding:"5px 15px", borderRadius:"16px", width:"15%", marginLeft:"83%", marginTop:"3px", marginBottom:"3px"}} key={msg._id}>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                  <p>{msg.timestamp.slice(11,16)}</p>
                  <DeleteIcon color="error" onClick={() => handleDelete(msg._id)}/>
              </div>
              {msg.senderId === senderId ? 'You' : receiver.username}: <i style={{fontSize:"20px"}}>{msg.content}</i>
            </div>)}

            {(msg.senderId !== senderId) && (<div style={{backgroundColor:"dodgerblue", color:"white", padding:"5px 15px", borderRadius:"16px", width:"15%", marginLeft:"2%", marginTop:"3px", marginBottom:"3px"}} key={msg._id}>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                  <p>{msg.timestamp.slice(11,16)}</p>
                  <DeleteIcon color="error" onClick={() => handleDelete(msg._id)}/>
              </div>
              {msg.senderId === senderId ? 'You' : receiver.username}: <i style={{fontSize:"20px"}}>{msg.content}</i>
            </div>)}
          </>
        )}
      
      </div>

      
      <div style={{width:"100%", position:"fixed", bottom:"0px"}}>
      <TextField
              value={newMessage}
              placeholder="write msg"
              onChange={(e) => setNewMessage(e.target.value)}
              variant="outlined"
              style={{width: "70%", marginLeft:"10%"}}
              required
          />
          
          <Button
            style={{marginLeft:"5px", marginTop:"1px", height:"54px", width:"7%"}}
            variant="contained" 
            color="primary" 
            onClick={handleSendMessage}
          >  Send <SendIcon />
          </Button>
      </div>
      
    </>
  )
}

export default MessageRoom