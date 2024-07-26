// components/NewPostForm.js
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Box, Typography, Button, TextField } from '@mui/material';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const id= localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', content);
    formData.append('image', image);
    formData.append('userId', id); 

    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/post/create-post`, formData);
      console.log(res);
      toast.success(res.data.message);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <Box
      width={"70%"}
      border={1}
      borderRadius={10}
      padding={3}
      marginRight={5}
      boxShadow={"10px 10px 20px #ccc"}
      display="flex"
      flexDirection={"column"}
      marginTop="100px"
    >
      <Typography
        variant="h5"
        textAlign={"center"}
        fontWeight="400"
        padding={3}
        color="black"
      >
        Create Post
      </Typography>

      
      <TextField
            value={content}
            placeholder="write about Post"
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            variant="outlined"
            required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <br />
      <Button type="submit"  variant="contained">Post</Button>

    </Box>
  </form>
  );
};

export default CreatePost;
