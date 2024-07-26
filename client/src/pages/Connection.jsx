import React from 'react'
import SearchBar from '../components/SearchBar';
import FrameLayout from '../components/FrameLayout';
import { Avatar, Box, Typography } from '@mui/material';
import axios from 'axios'
import {useState, useEffect} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import toast from 'react-hot-toast';

const Connection = () => {

    let [friendsArray, setFriendsArray] = useState([]);
    const id= localStorage.getItem('userId');

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

    const leftContent = (
        <Box
          width={"95%"}
          border={1}
          borderRadius={10}
          padding={3}
          marginLeft={5}
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
            <SearchBar/>
        </Box>

      );

      const handleRemoveRequest = async (receiverId) => {
        try {
          const Data= await axios.post('http://localhost:8080/api/v1/user/remove-friend', {
            senderId: id,
            receiverId,
          });
          toast.success(Data.data.message);
        } catch (err) {
          console.error(err);
        }
      };
    
      const rightContent = (
        <Box
        sx={{position:"sticky", top:"100px"}}
        width={"90%"}
        border={1}
        borderRadius={10}
        padding={3}
        marginRight={5}
        boxShadow={"10px 10px 20px #ccc"}
        display="flex"
        flexDirection={"column"}
        marginTop="30px"
      >
          <Typography
            variant="h5"
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
                    <Button style={{ borderRadius: 35, color: "grey", border:"1px solid grey" }} onClick={() => handleRemoveRequest(user._id)}>
                      Remove
                      </Button>
                    </ListItem>
                    <Divider variant="middle" />  
                  </>
                ))}
            </List>

      </Box>
      );

    return (
        <FrameLayout leftContent={leftContent} rightContent={rightContent} />
    );
}

export default Connection