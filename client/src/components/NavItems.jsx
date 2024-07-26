import React from 'react'
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SendIcon from '@mui/icons-material/Send';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from "@mui/material";
import { Link } from 'react-router-dom'

const NavItems = () => {
  return (
    <>
        <IconButton style={{display:"flex", flexDirection:"column"}} LinkComponent={Link} to="/home">
            <HomeSharpIcon/>
            <div style={{fontSize:"15px"}}>Home</div>
        </IconButton >
        <IconButton style={{display:"flex", flexDirection:"column"}} LinkComponent={Link} to="/connections">
            <GroupIcon/>
            <div style={{fontSize:"15px"}}>Connection</div>
        </IconButton>
        <IconButton style={{display:"flex", flexDirection:"column"}} LinkComponent={Link} to="/userposts">
            <BusinessCenterIcon />
            <div style={{fontSize:"15px"}}>User Post</div>
        </IconButton>
        <IconButton style={{display:"flex", flexDirection:"column"}} LinkComponent={Link} to="/messaging">
            <SendIcon />
            <div style={{fontSize:"15px"}}>Messaging</div>
        </IconButton>
        <IconButton style={{display:"flex", flexDirection:"column"}} LinkComponent={Link} to="/notification">
            <NotificationsIcon />
            <div style={{fontSize:"15px"}}>Notification</div>
        </IconButton>
    </>
  )
}

export default NavItems; 