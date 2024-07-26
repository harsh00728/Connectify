import React from 'react'
import {useState, useEffect} from 'react'
import {Box, AppBar, Toolbar, Button, Typography, Tabs, Tab, Avatar} from '@mui/material'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { authActions } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import NavItems from './NavItems'
import { IconButton } from "@mui/material";
import axios from 'axios'

const Header = () => {
  //global state.
  let isLogin= useSelector((state)=> state.isLogin);
  isLogin= isLogin || localStorage.getItem("userId");

  const id= localStorage.getItem('userId');
  const dispatch= useDispatch();
  const navigate= useNavigate();

  // state.
  const [value, setValue]= useState();
  const [user, setUser]= useState();

  const getInfo= async ()=> {
    try{
      const {data}= await axios.get(`http://localhost:8080/api/v1/user/user-data/${id}`);
      if(data.success){
       setUser(data.userData);
      }
    }catch(error){
      console.log(error);
    }
  }

  useEffect( ()=> {
   getInfo();
 }, [])

  //logout function 
  const handleLogout= ()=>{
    try{
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate('/login');
      localStorage.clear();
    } catch(err){
      console.log(err);
    }
  }

  return (
    <>
        <AppBar position='sticky'>
            <Toolbar>
                <Typography variant='h4' >Connectify...</Typography>
                
                {isLogin && (
                    <Box display={'flex'} marginLeft={"auto"}  >
                    <Tabs textColor='inherit' value={value} onChange={(e, val)=> setValue(val)} >
                        <NavItems/>
                    </Tabs>
                </Box>
                )}

                <Box display={'flex'} marginLeft={"auto"}>
                    {!isLogin && (
                      <>
                        <Button sx={{margin:1, color:'white'}} LinkComponent={Link} to="/login" >Login</Button>
                        <Button sx={{margin:1, color:'white'}} LinkComponent={Link} to="/register" >Register</Button>
                      </>
                    )}
                     
                    {isLogin && (
                      <>
                        <Button sx={{margin:1, color:'white'}} onClick={handleLogout}>Logout</Button>
                        <IconButton style={{display:"flex", flexDirection:"column"}} LinkComponent={Link} to="/dashboard">
                          <Avatar alt="Image" src={`http://localhost:8080/userImages/`+ user?.image}/>
                          <div style={{fontSize:"15px"}}>DashBoard</div>
                        </IconButton >
                      </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Header