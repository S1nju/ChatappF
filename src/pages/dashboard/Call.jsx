import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useWebSocket from './wsCustomhook';
import MicOffIcon from '@mui/icons-material/MicOff';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import Peer from 'simple-peer'
export default function Call(props) {
    const [typeofCall,setTypeOfcall]=useState(null);
    const [Stream,setStream]=useState(null);
    const [availableCalls,setAvailableCalls]=useState([]);
    let handleMessagerecived=(msg)=>{
        console.log(msg)

    }
    const navigate=useNavigate();
    let{client}=useWebSocket(`/user/topic`)
    let {targetname}=useParams();
    const myVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        if (client ) {
            // Get user media (video & audio)
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((currentStream) => {
                    setStream(currentStream);
                    myVideo.current.srcObject = currentStream;
    
                    // Create a WebRTC peer connection (initiator = true)
                    const peer = new Peer({ initiator: true, trickle: false, stream: currentStream });
    
                    // When the peer generates an SDP offer, send it via WebSockets
                    peer.on("signal", (data) => {
                        console.log("Sending SDP Offer:", data);
    
                        client.publish({
                            destination: "/app/webrtc",
                            body: JSON.stringify({
                                type: "offer",
                                senderid: props.userName,  // Sender's username or ID
                                recid: targetname,    // Receiver's username or ID
                                sdp: data,                 // Actual SDP offer
                            }),
                        });
                    });
    
                    connectionRef.current = peer;
                })
                .catch((err) => console.error("Error accessing media devices:", err));
        }
    }, [client]);
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
    <video playsInline muted ref={myVideo} autoPlay width="200" />
    </div>
    <div>
        <IconButton><MicOffIcon /></IconButton>
       
        <IconButton><VideocamOffIcon /></IconButton>
       
    <Link onClick={()=>myVideo.current.srcObject==null} to={`/${props.userName}/${targetname}`} style={{textDecoration:"none"}} >   <IconButton color='error' ><PhoneDisabledIcon /></IconButton></Link>
    </div>
    </div>
   
  )
}
