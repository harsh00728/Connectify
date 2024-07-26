import React from 'react'
import {Box, Typography, TextField, Button, colors} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

const Register = () => {
    const navigate= useNavigate();

    //state
     const [inputs, setInputs]= useState({
       name:"",
       email:"",
       password:""
     });

     const [formErrors, setFormErrors]= useState({});
     const [isSubmit, setIsSubmit]= useState(false);

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
         setFormErrors(validate(inputs));
         setIsSubmit(true);
         if(Object.keys(formErrors).length === 0 && isSubmit){
          try{
            const {data}= await axios.post('http://localhost:8080/api/v1/user/register',{username:inputs.name, email:inputs.email, password:inputs.password});
            console.log(data.success);
            if(data.success){
              toast.success('user Register Successfully');
              navigate('/login');
            } else{
              toast.success(data.message);
              navigate('/login');
            }
          }catch(error){
            console.log(error);
          }
        }
      }


       useEffect( ()=> {
            console.log(formErrors);
            if(Object.keys(formErrors).length === 0 && isSubmit){
                console.log(inputs);
            }
       }, [formErrors]);

       // validate form value function.
       const validate= (values)=> {
            const errors= {};
            const regex= /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/i;
            if(!values.name){
                errors.name= "* Name is required";
            }
            if(!values.email){
                errors.email= "* Email is required";
            } else if(!regex.test(values.email)){
                errors.email= "* Invalid Email Format";
            }
            if(!values.password){
                errors.password= "* Password is required";
            } else if(values.password.length < 8){
                errors.password= "* Atleast 8 characters are Required";
            }
            return errors;
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
             > Register</Typography>
   
             <TextField 
               type={'text'} 
               placeholder='name' 
               name='name' 
               value={inputs.name} 
               onChange={handleChange} 
               margin='normal' 
               />
             <p style={{color:"red"}}> {formErrors.name} </p>   

             <TextField 
               type={'email'} 
               placeholder='email' 
               name='email' 
               value={inputs.email} 
               onChange={handleChange} 
               margin='normal' 
               />
             <p style={{color:"red"}}>{formErrors.email}</p>
   
             <TextField 
               type={"password"} 
               placeholder='password' 
               name="password" 
               value={inputs.password} 
               onChange={handleChange} 
               margin="normal" 
               />
             <p style={{color:"red"}}>{formErrors.password}</p>
   
             <Button 
               type="submit" 
               sx={{borderRadius:3, marginTop:3}} 
               variant="contained"
               color='primary' 
             > Submit</Button>
   
             <Button 
               sx={{borderRadius:3, marginTop:3}} 
               onClick={()=> navigate('/login')} 
             > Already Registered? Please Login </Button>
           </Box>
         </form>   
       </>
     )
}

export default Register;