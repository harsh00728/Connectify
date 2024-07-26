import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from 'react-hot-toast';

const EditPersonalDetails = () => {

  const id= localStorage.getItem('userId');
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  
  
  // get user details
  const getUserDetail = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/user/user-data/${id}`);
      if (data?.success) {
        
        setInputs({
          username: data?.userData.username,
          country: data?.userData.country,
          city: data?.userData.city,
          phone: data?.userData.phone,
          email: data?.userData.email,
          school: data?.userData.school,
          college: data?.userData.college,
          bio: data?.userData.bio,
          skills: data?.userData.skills
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, [id]);

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/user/update-user/${id}`, {
          username: inputs.username,
          country: inputs.country,
          city: inputs.city,
          phone: inputs.phone,
          email: inputs.email,
          school: inputs.school,
          college: inputs.college,
          bio: inputs.bio,
          skills: inputs.skills
      });
      if (data?.success) {
        toast.success("User Updated");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
        <form onSubmit={handleSubmit}>
        <Box
          width={"35%"}
          border={1}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
           
          <Typography
            variant="h3"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
          >
            Update Personal Details
          </Typography>

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Username
          </InputLabel>
          <TextField
            name="username"
            value={inputs.username}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />

        <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Email
          </InputLabel>
          <TextField
            name="email"
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Skills(sepearted by comma's)
          </InputLabel>
          <TextField
            name="skills"
            value={inputs.skills}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />

        <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Contact
          </InputLabel>
          <TextField
            name="phone"
            value={inputs.phone}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />

        <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            College
          </InputLabel>
          <TextField
            name="college"
            value={inputs.college}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />

        <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            School
          </InputLabel>
          <TextField
            name="school"
            value={inputs.school}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />

        <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Country
          </InputLabel>
          <TextField
            name="country"
            value={inputs.country}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />

        <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            City
          </InputLabel>
          <TextField
            name="city"
            value={inputs.city}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />

        <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Bio
          </InputLabel>
          <TextField
            name="bio"
            value={inputs.bio}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          

          <br /><br />

          <Button type="submit" color="warning" variant="contained">
            UPDATE
          </Button>
        </Box>
      </form>
    </>
  )
}

export default EditPersonalDetails