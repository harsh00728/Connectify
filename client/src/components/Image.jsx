import React from 'react'
import {useRef, useState, useEffect} from 'react' 
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'

const Image = () => {
    const inputRef= useRef(null);
    const [file, setFile]= useState("");
    let [image, setImage]= useState("");
    const id= localStorage.getItem('userId');

    const singleUser= async ()=> {
        try{
          const singleuser= await axios.get(`http://localhost:8080/api/v1/user/user-data/${id}`);
          console.log(singleuser.data.userData.image)
          setImage(singleuser.data.userData.image);
        } catch(err){
          console.log(err);
        }
      }

    useEffect( ()=> {
        singleUser();
      }, [])

    const handleFile= (e)=> {
        setFile(e.target.files[0]);
    }

    const handleUpload= async()=> {
        const formdata= new FormData();
        formdata.append('image', file);
        try{
            if(file != ""){
              const data= await axios.post(`http://localhost:8080/api/v1/user/update-image?q=${id}`, formdata);
              console.log(data.data.user.image);
              setImage(data.data.user.image);
            }
            setFile("");
            window.location.reload();
        }catch(err){
            console.log(err);
        }
        
    }

    const handleImageClick= ()=> {
      inputRef.current.click();
    }
  
  return (
    <>  
      <div onClick={handleImageClick}  style={{height:200, width:200, borderRadius: "50%", backgroundColor:"pink"}} >
        <img src={`http://localhost:8080/userImages/`+ image} alt="image" style={{height:200, width:200, borderRadius: "50%"}} />
      </div>
      <br />
      <div className='container' >
        <input type="file" ref={inputRef}  onChange={handleFile} style={{display: "none"}}/>
        <Button variant="contained" onClick={handleUpload}> Update Image<EditIcon /> </Button>
    </div>
    </>
  )
}

export default Image