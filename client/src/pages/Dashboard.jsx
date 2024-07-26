import React from 'react';
import { Container, Grid, Paper, Typography, Box, Chip} from '@mui/material';
import Image from "../components/Image"
import axios from 'axios'
import {useState, useEffect} from 'react'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'

const Dashboard = () => {

    const id= localStorage.getItem('userId');
    let [user, setUser]= useState();
  
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
  

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
                        <Image />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box>
                            <Typography variant="h4" gutterBottom>
                              {user?.username}
                            </Typography>
                            <Typography variant="h5" color="textSecondary">
                                Student At {user?.college}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Address: {user?.city} {", "+ user?.country}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Email: {user?.email}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Phone: {user?.phone}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Skills
                        </Typography>
                        <Box>
                            <Chip
                                label={user?.skills}
                                color="primary"
                                style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Bio
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                        {user?.bio}
                        </Typography>
                    </Grid>

                    <br /> <br />
                      
                    <Button LinkComponent={Link} to="/editDetails" variant="contained" >Edit Details <EditIcon /> </Button>  
                
                </Grid>
            </Paper>
        </Container>
    );
};

export default Dashboard;
