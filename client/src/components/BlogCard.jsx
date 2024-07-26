import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Badge } from "@mui/material";
import axios from "axios";
import toast from 'react-hot-toast';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MapsUgcSharpIcon from '@mui/icons-material/MapsUgcSharp';
import {useState,  useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function BlogCard({
    id,
    isUser,
    userId,
    content,
    image,
    username,
    userImage,
    time,
}) {

  const navigate= useNavigate();
  // states.
  const [isLike, setIsLike]= useState(false);
  const [likeCount, setLikeCount]= useState('');

  const getAllLikes= async() => {
    try{
      const res= await axios.get(`http://localhost:8080/api/v1/user/post/likes/${id}`);
      setLikeCount(res.data.likeCount);
    } catch(error){
      console.log(error);
    }
  };

  useEffect( ()=> {
    getAllLikes();
  }, [])


  // handle delete
  const handleDelete = async () => {
    try {
      const data= await axios.delete(`http://localhost:8080/api/v1/user/post/delete-post/${id}`);
      toast.success(data.data.message);
      window.location.reload();
      
    } catch(error) {
      console.log(error);
    }
  };

  // handle Likes
  const handleLike= async()=> {
    try{
      const data= await axios.put(`http://localhost:8080/api/v1/user/post/post-like/${id}`, {userId: userId});
      setIsLike(data.data.status);
      setLikeCount(data.data.likeCount);
      console.log(likeCount);
    } catch(err){
      console.log(err);
    }
  }

  
  // handle Comments
  const handleComment= async (id)=> {
    navigate("/comment", {replace:true ,state:{postId: id}});
  }


  return (
    <Card
      sx={{
        width: "70%",
        margin: "auto",
        mt: 6,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box> 
      )}
      <CardHeader
        avatar={
          <Avatar src={`http://localhost:8080/userImages/`+ userImage} sx={{ bgcolor: red[500] }} aria-label="user-blog"></Avatar>
        }
        title={username}
        subheader={time.slice(0,16)}
      />
      <CardMedia component="img" height="400" image={`http://localhost:8080/userImages/`+image} alt="image" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>

      <Box display={"flex"}>
          <Badge badgeContent={likeCount} color="primary">
            <IconButton onClick={handleLike} sx={{ margin: "auto" }}>
              <FavoriteBorderIcon/>
            </IconButton>
          </Badge>
          <IconButton onClick={() => handleComment(id)} sx={{ margin: "auto" }}>
           <MapsUgcSharpIcon/>
          </IconButton>
        </Box> 
    </Card>
  );
}