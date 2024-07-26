import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { TextField, Button, List, Container, Avatar } from '@mui/material';
import { ListItem, ListItemText } from '@mui/material';
import toast from 'react-hot-toast';
import Divider from '@mui/material/Divider';

const SearchBar = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    
    const id= localStorage.getItem('userId');

    const allUsers= async ()=> {
      try{
        const Data= await axios.get(`http://localhost:8080/api/v1/user/all-users?q=${id}`);
        setResults(Data.data.users);
      } catch(err){
        console.log(err);
      }
    }

    useEffect( ()=> {
      allUsers();
    }, [])

// getting status of request of each user.
    const getConnectionStatus = (user) => {
      const connection = user.connection.find(conn =>
        (conn.sender === id && conn.receiver === user._id) ||
        (conn.sender === user._id && conn.receiver === id)
      );
      return connection ? connection.status : 'none';
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await axios.get(`http://localhost:8080/api/v1/user/friends?q=${query}`);
        setResults(response.data);
    };

    const handleSendRequest = async (receiverId) => {
      try {
        const requestData= await axios.post('http://localhost:8080/api/v1/user/connection/send', {
          senderId: id,
          receiverId,
        });
        console.log(requestData.data);
        if(requestData.data.success == true){
          toast.success(requestData.data.message);
        } else{
          toast.success(requestData.data.message);
        }
        
      } catch (err) {
        console.error(err);
      }
    };
    

    return (
        <Container>
            <form onSubmit={handleSearch}>
                <TextField
                    variant="outlined"
                    label="Search friends"
                    fullWidth
                    margin="normal"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button variant="contained" color="primary" type="submit">
                    Search
                </Button>
            </form>
            <List>
                {results.map((user) => (
                  <>
                    <ListItem key={user._id}> 
                    <Avatar alt="Image" src={`http://localhost:8080/userImages/`+ user.image} />
                    <ListItemText primary={user.username} secondary={user.email} />
                    
                    {getConnectionStatus(user) === 'none' && (
                      <Button style={{ borderRadius: 35, color: "#3FA2F6", border:"1px solid #3FA2F6" }} onClick={() => handleSendRequest(user._id)}>
                      Connect
                      </Button>
                    )}
                    {getConnectionStatus(user) === 'pending' && (
                      <Button style={{ borderRadius: 35, color: "orange" ,border:"1px solid orange " }} disabled>
                        Pending
                      </Button>
                    )}
                    {getConnectionStatus(user) === 'accepted' && (
                      <Button style={{ borderRadius: 35, color: "grey" ,border:"1px solid grey " }} disabled>
                        Connected
                      </Button>
                    )}

                    </ListItem>
                    <Divider variant="middle" />
                  </>
                ))}
            </List>
        </Container>
    );
}

export default SearchBar