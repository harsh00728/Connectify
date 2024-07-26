import React from 'react'
import FrameLayout from '../components/FrameLayout';
import CreatePost from '../components/CreatePost';
import AllPosts from '../components/AllPosts';
import { Typography } from '@mui/material';

const Home = () => {

  const leftContent = (
      <div style={{width:"800px", marginLeft:"400px", marginTop:"20px", boxShadow:"0px 10px 20px #ccc"}}>
      <Typography variant="h4"
            textAlign={"center"}
            fontWeight="400"
            padding={3}
            color="black"
            sx={{position:"sticky", top:"50px", backgroundColor:"white", zIndex:"1"}}>
        All Posts
      </Typography>
      <AllPosts />
      </div>
    
  );
  const rightContent = (
    <div style={{position:"sticky", top:"150px", marginLeft:"150px", display:"flex", flexDirection:"column", alignItems:"center"}}>
      <CreatePost />
    </div>
  );

  return (
    <FrameLayout leftContent={leftContent} rightContent={rightContent} />
);
}

export default Home