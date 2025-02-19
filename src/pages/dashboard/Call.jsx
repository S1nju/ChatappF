import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useWebSocket from './wsCustomhook';
import MicOffIcon from '@mui/icons-material/MicOff';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
export default function Call(props) {
    const [typeofCall,setTypeOfcall]=useState(null);
    const [joined,setJoined]=useState(false);
    const [availableCalls,setAvailableCalls]=useState([]);
    let handleMessagerecived=(msg)=>{
        console.log(msg)

    }
    const navigate=useNavigate();
    let {targetname}=useParams();
    let{client}=useWebSocket(`/user/topic`,handleMessagerecived)

    useEffect(()=>{
        if(client){
           
        client.publish({
            destination: "/app/webrtc",
            body: JSON.stringify({
                type: "offer",
                senderid: props.userName,
                recid: targetname,
                sdp: "offer"
            })
        });}

    },[client])
  return (
    <div style={{position:"absolute",zIndex:10000,width:'100%',height:"100%",backgroundColor:"black",opacity:"0.95",display:"flex",alignItems:"center"

        ,flexFlow:"column",justifyContent:"space-around"
    }}>
<div
 style={{display:"flex",alignItems:"center"

    ,justifyContent:'center',flexFlow:"column ",gap:"25px"
}}
>

    <Avatar alt={props.userName} src='./ddd'></Avatar>
    <h5>you are calling ...</h5>
    </div>
    <div>
        <IconButton><MicOffIcon /></IconButton>
       
        <IconButton><VideocamOffIcon /></IconButton>
    <Link to={`/${props.userName}/${targetname}`} style={{textDecoration:"none"}} >   <IconButton color='error' ><PhoneDisabledIcon /></IconButton></Link>
    </div>
    </div>
   
  )
}
