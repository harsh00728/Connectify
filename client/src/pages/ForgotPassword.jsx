import React from 'react'
import {Box, Typography, TextField, Button, colors} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'


const ForgotPassword = () => {

    const navigate= useNavigate();

    //state
     const [inputs, setInputs]= useState({
       email:"",
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
            const {data}= await axios.post('http://localhost:8080/api/v1/user/forgot-password',{email:inputs.email});
            if(data.success){
              alert('reset password link send yo your email');
              navigate('/login');
            }  
          }catch(error){
            console.log(error);
          }
      }

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
             > FORGOT PASSWORD</Typography>  

             <TextField 
               type={'email'} 
               placeholder='email' 
               name='email' 
               value={inputs.email} 
               onChange={handleChange} 
               margin='normal' 
               />
   
             <Button 
               type="submit" 
               sx={{borderRadius:3, marginTop:3}} 
               variant="contained"
               color='primary' 
             > Send</Button>
   
           </Box>
         </form>   
       </>
  )
}

export default ForgotPassword