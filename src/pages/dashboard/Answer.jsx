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

    let{client}=useWebSocket(`/user/topic`)
    const navigate=useNavigate();
   const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const[stream,setStream]=useState({});
    const[remoteStream,setremoteStream]=useState({});
    const answerCall = async () => {
        setCallAccepted(true);
    
        try {
            const cc = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(cc); // ✅ Update state, but use `cc` directly
            myVideo.current.srcObject = cc;
    
            const peer = new Peer({ initiator: false, trickle: false, stream: cc }); // ✅ Use `cc` directly
            console.log("📡 My Stream Before Peer:", stream);
            peer.on("signal", (data) => {
                if (client) {
                    console.log("📡 Sending answer signal:", data);
                    client.publish({
                        destination: "/app/webrtc",
                        body: JSON.stringify({
                            type: "answer",
                            senderid:props.callStatus.recid ,
                            recid:props.callStatus.senderid ,
                            sdp: data.sdp,
                        }),
                    });
                } else {
                    console.error("❌ WebSocket not connected!");
                }
            });
    
            peer.on("stream", (currentStream) => {
                console.log("📡 Received remote stream:", currentStream);
                setremoteStream(currentStream);
    
                   
                        userVideo.current.srcObject = currentStream;
                        userVideo.current.play().catch((err) => console.error("❌ Video play error:", err));
                    
             
                
            });
    
            peer.signal({ type: props.callStatus.type, sdp: props.callStatus.sdp }); // ✅ Signal the offer
            connectionRef.current = peer;
        } catch (error) {
            console.error("❌ Error accessing media devices:", error);
        }
    };
    

  return (
    <div style={{position:"absolute",zIndex:10000,width:'100dvw',height:"100dvh",opacity:"0.95",display:"flex",alignItems:"center"

        ,flexFlow:"column",justifyContent:"space-around"
    }}>
   

<>

{joined? remoteStream!={}&& <div> <video playsInline muted ref={userVideo} autoPlay width="500" />  <video playsInline muted ref={myVideo} autoPlay width="100" height="100" /></div>:<>
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
