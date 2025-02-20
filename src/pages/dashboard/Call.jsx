import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useWebSocket from './wsCustomhook';
import MicOffIcon from '@mui/icons-material/MicOff';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

import Peer from 'simple-peer/simplepeer.min.js'; // Use the browser version

export default function Call(props) {
    const [typeofCall,setTypeOfcall]=useState(null);
    const [Stream,setStream]=useState(null);
    const [availableCalls,setAvailableCalls]=useState(false);
    let handleMessagerecived=(msg)=>{
        console.log(msg)

    }
    const navigate=useNavigate();
    function mssg(msg){
        console.log(msg)
        if(msg.type=='answer'){
        
            setAvailableCalls(true)}
    
      }
       
          
             let{client}=useWebSocket(`/user/topic`,handleMessagerecived,mssg)
    let {targetname}=useParams();
    const myVideo = useRef();
    const connectionRef = useRef();
    const userVideo = useRef();

    useEffect(() => {
        if (client ) {
            // Get user media (video & audio)
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then((currentStream) => {
                    setStream(currentStream);
                    myVideo.current.srcObject = currentStream;
                    console.log(currentStream)
                    
                    const peer = new Peer({ 
                        initiator: true, 
                        trickle: false,  // ✅ Allow ICE candidates to be sent immediately
                        stream: currentStream, 
                        config: {
                            iceServers: [
                                {
                                    urls: "stun:stun.relay.metered.ca:80",
                                  },
                                  {
                                    urls: "turn:global.relay.metered.ca:80",
                                    username: "3fa5d424e8b4c916da0e486a",
                                    credential: "FQAf8StVJUIOBwJ1",
                                  },
                                  {
                                    urls: "turn:global.relay.metered.ca:80?transport=tcp",
                                    username: "3fa5d424e8b4c916da0e486a",
                                    credential: "FQAf8StVJUIOBwJ1",
                                  },
                                  {
                                    urls: "turn:global.relay.metered.ca:443",
                                    username: "3fa5d424e8b4c916da0e486a",
                                    credential: "FQAf8StVJUIOBwJ1",
                                  },
                                  {
                                    urls: "turns:global.relay.metered.ca:443?transport=tcp",
                                    username: "3fa5d424e8b4c916da0e486a",
                                    credential: "FQAf8StVJUIOBwJ1",
                                  },
                            ],
                        },
                    });
                    
            
                    peer.on("signal", (data) => {
                 
                    
                        client.publish({
                            destination: "/app/webrtc",
                            body: JSON.stringify({
                                type: data.type,
                                senderid: props.userName,  // Sender's username or ID
                                recid: targetname,         // Receiver's username or ID
                                sdp: data.sdp,  
                               
                            }),
                        });
                
                    });
                    
                    // ✅ Send ICE candidates separately
           
                    
                    // ✅ Receive and set remote media stream
                    peer.on("stream", (remoteStream) => {
                        console.log("📡 Caller received remote stream:", remoteStream);
                      
                            userVideo.current.srcObject = remoteStream;
                            userVideo.current.onloadedmetadata = () => {
                                console.log("✅ Playing remote stream");
                                userVideo.current.play();
                            };
                        
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
    {availableCalls&& <video playsInline  ref={userVideo} autoPlay width="200" />}
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
