import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useWebSocket from './wsCustomhook';
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
                senderId: props.userName,
                receiverId: targetname,
                sdp: "offer"
            })
        });}
    },[client])
  return (
    <div style={{position:"absolute",zIndex:10000,width:'100%',height:"100%",backgroundColor:"black",opacity:"0.95",display:"flex",alignItems:"center"

        ,justifyContent:'center'
    }}>
<div
 style={{display:"flex",alignItems:"center"

    ,justifyContent:'center',flexFlow:"column ",gap:"25px"
}}
>

    <Avatar alt={props.userName} src='./ddd'></Avatar>
    <h5>you are calling ...</h5>
    </div>
    </div>
   
  )
}
