import React, {useState, useEffect} from 'react'
import {Typography, IconButton, TextField, Button, Avatar } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import DeleteIcon from "@mui/icons-material/Delete";

const Comment = () => {

    const navigate= useNavigate();
    const location= useLocation();
    const postId= location.state.postId;
    const id= localStorage.getItem('userId');

    // states
    const [comment, setComment]= useState('');
    const [results, setResults]= useState([]);

    const allComments= async ()=> {
        try{
          const Data= await axios.get(`http://localhost:8080/api/v1/user/all-comments?q=${postId}`);
          setResults(Data.data.comments);
        } catch(err){
          console.log(err);
        }
      }
  
      useEffect( ()=> {
        allComments();
      }, [])

    //handleBack
    const handleBack= async ()=> {
        navigate("/home");
    }

    // handlePostComment
    const handleSubmitComment= async()=> {
        try {
            const request= await axios.post('http://localhost:8080/api/v1/user/send-comment', {
              postId:postId,
              userId:id,
              content:comment
            });
            toast.success(request.data.message);
            window.location.reload();
            setComment('');
        } catch(err){
            console.error(err);
        }  
    }

    // handleDelete
    const handleDelete= async (commentId)=> {
        try {
            const data= await axios.delete(`http://localhost:8080/api/v1/user/delete-comment/${commentId}`);
            toast.success(data.data.message);
            window.location.reload();
          } catch(error) {
            console.log(error);
          }
    }

  return (
    <div style={{width:"800px", marginLeft:"400px", marginTop:"20px", boxShadow:"0px 10px 20px #ccc", overflowY:"scroll", height:"80vh"}}>
        
        <div style={{display:"flex", justifyContent:"flex-end"}}>
            <IconButton onClick={handleBack}>
                <CloseIcon color="error"/>
            </IconButton>
        </div>

        <Typography variant="h4"
              textAlign={"center"}
              fontWeight="400"
              padding={3}
              color="black"
              sx={{position:"sticky", top:"20px", backgroundColor:"white", zIndex:"1"}}>
          Comments
        </Typography>

            <List>
                {results.map((comment) => 
                    <>
                        {(comment.userId._id == id) && (<>
                            <ListItem key={comment._id}>
                                <Avatar alt="Remy Sharp" src={`http://localhost:8080/userImages/`+comment.userId.image} />
                                <ListItemText primary={comment.content} secondary={comment.userId.username}/>
                                <IconButton onClick={()=> handleDelete(comment._id)}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </ListItem>
                            <Divider variant="middle" />  
                        </>)}

                        {(comment.userId._id != id) && (<>
                            <ListItem key={comment._id}>
                                <Avatar alt="Remy Sharp" src={`http://localhost:8080/userImages/`+comment.userId.image} />
                                <ListItemText primary={comment.content} secondary={comment.userId.username}/>
                            </ListItem>
                            <Divider variant="middle" />  
                        </>)}

                    </>
                
                  
                )}
            </List>

        

        <div style={{width:"60%", position:"fixed", bottom:"0px"}}>
      <TextField
              value={comment}
              placeholder="write msg"
              onChange={(e) => setComment(e.target.value)}
              variant="outlined"
              style={{width: "75%"}}
              required
          />
          
          <Button
            style={{marginLeft:"5px", marginTop:"1px", height:"54px", width:"12%"}}
            variant="contained" 
            color="primary" 
            onClick={handleSubmitComment}
          >  Comment <SendIcon />
          </Button>
      </div>

      </div>
  )
}

export default Comment