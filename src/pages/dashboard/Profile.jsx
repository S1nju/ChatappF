import { Avatar, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Axios } from '../../api/axios'
import { logout, user } from '../../api/api'
import { Padding } from '@mui/icons-material'
import { color } from 'framer-motion'
import Cookie from 'cookie-universal'
export default function Profile() {
    
  const [ u,setu]=useState({})
   function logout(){
    const cookie = Cookie();
    try {
  
  
  
        Axios.post('/auth/logout').then(()=>cookie.remove('token')).then(()=>  window.location.pathname='/login')
     
     
    } catch (error) {
        console.log(error);
    
  
    }
  }

  useEffect(()=>{
        
        
          Axios.get('/auth/'+user).then(d=>{
             

            setu(d.data);
            console.log(d.data)

            
         })},[])
  return (<section
  style={{
    display:"flex",
    flexFlow:"column",
    padding:"25px",
    width:"100%"
  }}
  >
    <div
    style={{
        backgroundImage:"url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExem5wemN5em9paDdkcXh0c2l6MXY2Zzk4ZWMwdmY0a3J3cmY5YXBwdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QZlOCK7qV2lJPH3gK6/giphy.gif')",
        backgroundSize:"100%",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        width:"100%",
        minHeight:"20%",
        marginBottom:"30px"
    }}>

    </div>
    <div   style={{
    display:"flex",
gap:"20px",
    width:"100%"
  }}>
    <Avatar alt={u.name} src={'/'} /><div><h6>{u.name}</h6>
    <p style={{color:"grey",margin:0}}>welcome {u.name}</p>
    </div>

    </div>
    <hr></hr>
    <div style={{
       
        alignSelf:"center"
      }}>
        <div style={{display:"flex",flexFlow:"row wrap",gap:"10px",justifyContent:"center"}}>
            <div><p>username :</p>
        <TextField
        label=""
        variant="outlined"
        disabled
        size='small'
        value={u.name}
    
        sx={{ marginBottom: 2 }}
      /></div>
         <div><p>Email :</p>
        <TextField
        label=""
        variant="outlined"
        disabled
        size='small'
        fullWidth
        value={u}
    
        sx={{ marginBottom: 2 }}
      /></div>
        </div>
        <div style={{display:"flex",flexFlow:"row wrap",gap:"10px",justifyContent:"center"}}>
            <div><p>Role :</p>
        <TextField
        label=""
        variant="outlined"
        disabled
        size='small'
        value={u.authorities}
    
        sx={{ marginBottom: 2 }}
      /></div>
     
        </div>
      
         
  
      
      
      </div><div style={{
        display:'flex',
        gap:"30px",
        alignSelf:"center"
      }}>
          <Button variant='outlined' >Save</Button> 
    <Button variant='outlined' color='error' onClick={logout}>Logout</Button>
    
    </div>
    </section>
  )
}
