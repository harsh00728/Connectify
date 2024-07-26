import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import {useDispatch} from "react-redux"
import {authActions} from "../redux/store"
import toast from 'react-hot-toast';

const Login = () => {
  const navigate= useNavigate();
  const dispatch= useDispatch();
  
  axios.defaults.withCredentials= true;

 //state
  const [inputs, setInputs]= useState({
    email:"",
    password:"",
  });

  // handle input change
  const handleChange = (e)=> {
    setInputs( (prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

    //form handle
    const handleSubmit= async (e)=> {
      e.preventDefault();
      try{
        const {data}= await axios.post('http://localhost:8080/api/v1/user/login',{email:inputs.email, password:inputs.password});
        if(data.success){
          localStorage.setItem('userId', data?.user._id);
          localStorage.setItem('userImage', data?.user.image);
          dispatch(authActions.login());
          toast.success('user Login Successfully');
          navigate('/home');
        } else{
          toast.success(data.message);
        }
      } catch(error){
        console.log(error);
      }
    };
  
  return (
    <>  
      <form onSubmit={handleSubmit}>
        <Box 
        maxWidth={450}
        display="flex"
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        margin="auto"
        marginTop={5}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        borderRadius={5}
        >
          <Typography
            variant='h4' 
            sx={{textTransform:"uppercase"}} 
            padding={3} 
            textAlign="center"
          > Login</Typography>

          <TextField 
            type={'email'} 
            placeholder='email' 
            name='email' 
            value={inputs.email} 
            onChange={handleChange} 
            margin='normal' 
            required/>

          <TextField 
            type={"password"} 
            placeholder='password' 
            name="password" 
            value={inputs.password} 
            onChange={handleChange} 
            margin="normal" 
            required/>

          <Button 
            type="submit" 
            sx={{borderRadius:3, marginTop:3}} 
            variant="contained"
            color='primary' 
          > Submit</Button>

          <Link to={"/forgotPassword"}>Forgot Password?</Link>

          <Button 
            sx={{borderRadius:3, marginTop:3}} 
            onClick={()=> navigate('/register')} 
          > Not having Account? Please Register </Button>
        </Box>
      </form>   
    </>
  )
}

export default Login;