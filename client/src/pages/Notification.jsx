import React from 'react'
import { useState, useEffect} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Box, Typography } from '@mui/material';
import {Button, List } from '@mui/material';
import { ListItem, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';

const Notification = () => {
    const [receiverResult, setReceiverResult] = useState([]);
    const [senderResult, setSenderResult] = useState([]);
    
    const id= localStorage.getItem('userId');

    // receiver requests & senders requests.
    const allRequests= async ()=> {
        try{
          const requests= await axios.get(`http://localhost:8080/api/v1/user/all-requests`);
          let result1= requests.data.filter(request=> request.sender._id === id);
          let result2= requests.data.filter(request=> request.receiver._id === id);
          setSenderResult(result1);
          setReceiverResult(result2);
        } catch(err){
          console.log(err);
        }
      }

      useEffect( ()=> {
        allRequests();
      }, []);


      // handleAccept.
      const handleAccept = async (request) =>{
        try{
            const requestId= request._id;
            const senderId= request.sender._id;
            const receiverId= request.receiver._id;
            await axios.post(`http://localhost:8080/api/v1/user/connection/accept`, {requestId});
            await axios.post(`http://localhost:8080/api/v1/user/connection`, {senderId, receiverId});
            toast.success("request Accepted");
        } catch(err){
            console.log(err);
        }
      }

      // handle Decline
      const handleDecline = async (requestId) =>{
        try{
            await axios.post(`http://localhost:8080/api/v1/user/connection/decline`, {requestId});
            toast.success("request decline");
        } catch(err){
            console.log(err);
        }
      }

  return (
    <>
        <Box
        width={"75%"}
        border={1}
        borderRadius={10}
        padding={3}
        margin={"auto"}
        boxShadow={"10px 10px 20px #ccc"}
        display="flex"
        flexDirection={"column"}
        marginTop="30px"
      >
          <Typography
            variant="h3"
            textAlign={"center"}
            fontWeight="400"
            padding={3}
            color="black"
          >
            Notifications
          </Typography>


          <List>
                {receiverResult.map((request) => (
                    <>
                      <ListItem key={request._id}>
                        <ListItemText primary={request.sender.username} secondary={"reqested to Join with You"} />
                        <Button sx={{mr:2}} variant='contained' color="success" style={{borderRadius: 35}} onClick={() => handleAccept(request)}>Accept</Button>
                        <Button variant='contained' color="error" style={{borderRadius: 35}} onClick={() => handleDecline(request._id)}>Decline</Button>
                    </ListItem>
                    <Divider variant="middle" />
                    </>
                ))}
        </List>

        <List>
                {senderResult.map((request) => (
                    <>
                      <ListItem key={request._id}>
                        <ListItemText primary={"You requested to join"} secondary={request.receiver.username} />
                        <Button sx={{mr:2}} variant="outlined" style={{ borderRadius: 35, color: "orange" ,border:"1px solid orange " }}>Pending</Button>
                    </ListItem>
                    <Divider variant="middle" />
                    </>
                ))}
        </List>
          

        </Box>  
    </>
  )
}

export default Notification