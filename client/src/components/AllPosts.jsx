import React, {useState, useEffect} from 'react'
import axios from 'axios'
import BlogCard from './BlogCard';


const AllPosts = () => {
  const [posts, setPosts]= useState([]);
  const [userPosts, setUserPosts]= useState([]);
  const id= localStorage.getItem('userId');

  //get blogs
  const getAllPosts= async() => {
    try{
      const res= await axios.get(`http://localhost:8080/api/v1/user/post/all-posts/${id}`);
      console.log(res.data);
      setPosts(res.data.posts);
      setUserPosts(res.data.userpost);
    } catch(error){
      console.log(error);
    }
  };

  useEffect( ()=> {
    getAllPosts();
  }, [])

  return (
    <div>
      {posts && posts.map((post) => (
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
      ))}

      {userPosts && userPosts.map((post) => (
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
      ))}

    </div>
  );
};

export default AllPosts;