import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import { Avatar, Box, Typography } from '@mui/material';
import axios from 'axios'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Messaging = () => {
    let [friendsArray, setFriendsArray] = useState([]);
    const id= localStorage.getItem('userId'); 
    const navigate= useNavigate();

    const allFriends= async ()=> {
        try{
          const friends= await axios.get(`http://localhost:8080/api/v1/user/all-friends?q=${id}`);
          setFriendsArray(friends.data.user.friends);
        } catch(err){
          console.log(err);
        }
      }
  
      useEffect( ()=> {
        allFriends();
      }, [])

    // handleMessageRoom
    const handleMessageRoom= (Receiver)=> {
      navigate("/messageRoom", {replace:true ,state:{Receiver: Receiver, SenderId: id}});
    }



  return (
    <Box
        sx={{position:"sticky", top:"100px"}}
        width={"70%"}
        border={1}
        borderRadius={10}
        padding={3}
        margin= "auto"
        boxShadow={"10px 10px 20px #ccc"}
        display="flex"
        flexDirection={"column"}
        marginTop="30px"
      >
          <Typography
            variant="h4"
            textAlign={"center"}
            fontWeight="400"
            padding={3}
            color="black"
          >
            Friend List
          </Typography>

          <List>
                {friendsArray.map((user) => (
                  <>
                    <ListItem key={user._id}>
                    <Avatar alt="Remy Sharp" src={`http://localhost:8080/userImages/`+user.image} />
                    <ListItemText primary={user.username}/>
                    <Button style={{ borderRadius: 35, color: "green", border:"1px solid green" }} onClick={() => handleMessageRoom(user)}>
                      Open Chat
                      </Button>
                    </ListItem>
                    <Divider variant="middle" />  
                  </>
                ))}
            </List>

      </Box>
  )
}

export default Messaging