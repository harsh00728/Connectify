import React, {useState, useEffect} from 'react'
import axios from 'axios'

import BlogCard from '../components/BlogCard';
import { Typography } from '@mui/material';


const UserPosts = () => {
  const [userPosts, setUserPosts]= useState([]);
  const id= localStorage.getItem('userId');

  //get blogs
  const getAllPosts= async() => {
    try{
      const res= await axios.get(`http://localhost:8080/api/v1/user/post/all-posts/${id}`);
      setUserPosts(res.data.userpost);
    } catch(error){
      console.log(error);
    }
  };

  useEffect( ()=> {
    getAllPosts();
  }, [])

  return (
    <div style={{boxShadow:"0px 10px 20px #ccc", width:"70%", marginLeft:"230px"}}>
      <Typography variant="h4"
            textAlign={"center"}
            fontWeight="400"
            padding={3}
            color="black"
            sx={{position:"sticky", top:"50px", backgroundColor:"white", zIndex:"1"}}>
           User Posts
      </Typography>

      {userPosts && userPosts.length >0 ?(
        userPosts.map((post) => (
          <BlogCard
          id={post?._id}
          isUser={localStorage.getItem("userId") === post?.userId?._id}
          userId={localStorage.getItem("userId")}
          content={post?.content}
          image={post?.image}
          username={post?.userId?.username}
          userImage={post?.userId?.image}
          time={post.createdAt}
          />
        ))
      ): (
        <h2>No post created Yet</h2>
      )}

    </div>
  );
};

export default UserPosts;