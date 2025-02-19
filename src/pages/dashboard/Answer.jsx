import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useWebSocket from './wsCustomhook';
import MicOffIcon from '@mui/icons-material/MicOff';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
export default function Answer(props) {
    const [typeofCall,setTypeOfcall]=useState(null);
    const [joined,setJoined]=useState(false);
    const [availableCalls,setAvailableCalls]=useState([]);
    let handleCallArrived=(msg)=>{
        setAvailableCalls(prev=>prev.push(msg));

    }
    const navigate=useNavigate();
    let {targetname}=useParams();
    let{client}=useWebSocket(`/user/topic`,handleCallArrived)

  return (
    <div style={{position:"absolute",zIndex:10000,width:'100%',height:"100%",backgroundColor:"black",opacity:"0.95",display:"flex",alignItems:"center"

        ,flexFlow:"column",justifyContent:"space-around"
    }}>
        {availableCalls.map(i=>{

<>
<div
 style={{display:"flex",alignItems:"center"

    ,justifyContent:'center',flexFlow:"column ",gap:"25px"
}}
>

    <Avatar alt={i.senderid} src='./ddd'></Avatar>
    <h5>{i.senderid} is calling ...</h5>
    </div>
    <div>
      
       
        <Link to={`/call/${props.userName}/${targetname}`} style={{textDecoration:"none"}} >   <IconButton color='succses' ><PhoneEnabledIcon /></IconButton></Link>
    <Link to={`/${props.userName}/${targetname}`} style={{textDecoration:"none"}} >   <IconButton color='error' ><PhoneDisabledIcon /></IconButton></Link>
    </div>
</>


        })}

    </div>
   
  )
}
