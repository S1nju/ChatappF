import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useWebSocket from './wsCustomhook';
import MicOffIcon from '@mui/icons-material/MicOff';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import Peer from 'simple-peer'
export default function Answer(props) {
    const [CallAccepted,setCallAccepted]=useState(false);
    const [joined,setJoined]=useState(false);
    const [callerinfo,setcallerinfo]=useState();
    useEffect(()=>{
        setcallerinfo(props.callStatus.senderid)
    },[props])
    let{client}=useWebSocket(`/user/topic`)
    console.log(callerinfo)
    const navigate=useNavigate();
   const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    
    const answerCall = () => {
        setCallAccepted(true);
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          
            myVideo.current.srcObject = currentStream;
        const peer = new Peer({ initiator: false, trickle: false, stream});
    
        peer.on("signal", (data) => {
            if (client) {
                console.log("Sending answer signal:", data);
                client.publish({
                    destination: "/app/webrtc",
                    body: JSON.stringify({
                        type: "answer",
                        senderid: props.callStatus.recid,
                        recid: props.callStatus.senderid,
                        sdp: data.sdp, // WebRTC SDP answer
                    }),
                });
            } else {
                console.error("WebSocket not connected!");
            }
        });
    
        peer.on("stream", (currentStream) => {
            console.log("📡 Received remote stream:", currentStream);

            if (userVideo.current) {
                userVideo.current.srcObject = null;  // Force repaint
                setTimeout(() => {
                    userVideo.current.srcObject = currentStream;
                }, 100);
            }
        
        });
    
        peer.signal(props.callStatus); // Signal the offer received
        connectionRef.current = peer;
    })
    
      
    };

  return (
    <div style={{position:"absolute",zIndex:10000,width:'100dvw',height:"100dvh",opacity:"0.95",display:"flex",alignItems:"center"

        ,flexFlow:"column",justifyContent:"space-around"
    }}>
   

<>

{joined? <div> <video playsInline muted ref={myVideo} autoPlay width="200" /><video playsInline muted ref={userVideo} autoPlay width="500" /></div>:<>
<div
 style={{display:"flex",alignItems:"center"

    ,justifyContent:'center',flexFlow:"column ",gap:"25px"
}}
>
    <Avatar alt={props.callStatus.senderid} src='./ddd' style={{width:"80px",height:"80px"}}></Avatar>
    <h5>{props.callStatus.senderid} is calling ...</h5>
    </div>
    <div style={{display:"flex",gap:"50px"}}>
      
    <Link to={`/${props.userName}/${props.callStatus.senderid}`} style={{textDecoration:"none"}} >   <IconButton color='error' size="large"   ><PhoneDisabledIcon /></IconButton></Link>
          <IconButton color='success' size="large" edge="end"  onClick={()=>{setJoined(true);answerCall();}}><PhoneEnabledIcon /></IconButton>
        </div>
    </>}
</>


        

    </div>
   
  )
}
