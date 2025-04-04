import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useWebSocket from './wsCustomhook';
import MicOffIcon from '@mui/icons-material/MicOff';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import Peer from 'simple-peer/simplepeer.min.js';

export default function Answer(props) {
    const [CallAccepted, setCallAccepted] = useState(false);
    const [joined, setJoined] = useState(false);
    const [remoteMediaStream, setRemoteMediaStream] = useState(null);
    const { client } = useWebSocket(`/user/topic`);
    const navigate = useNavigate();
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const [stream, setStream] = useState(null);


    const answerCall = async () => {
        setCallAccepted(true);

        try {
            const currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
            myVideo.current.onloadedmetadata = () => {
                myVideo.current.play();
            };

            const peer = new Peer({
                initiator: false,
                trickle: false, // disable trickle ICE
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

            peer.on('signal', (data) => {
                console.log('Sending signal:', data);
                if (client) {
                    client.publish({
                        destination: '/app/webrtc',
                        body: JSON.stringify({
                            type: data.type,
                            senderid: props.callStatus.recid,
                            recid: props.callStatus.senderid,
                            sdp: data.sdp,
                         
                        }),
                    });
                } else {
                    console.error('WebSocket not connected!');
                }
            });

            peer.on('stream', (remoteStream) => {
                console.log('Received remote stream:', remoteStream);
                console.log('Video tracks count:', remoteStream.getVideoTracks());
                if (userVideo.current) {
                    userVideo.current.srcObject = remoteStream;
                    // Optionally call load() to initialize playback.
                    userVideo.current.load();
                    userVideo.current.onloadedmetadata = () => {
                        userVideo.current.play()
                            .then(() => {
                                console.log("Remote video playing directly.");
                            })
                            .catch((error) => {
                                console.error("Error playing remote video:", error);
                            });
                    };
                } else {
                    console.error("userVideo reference is null");
                }
            });

            peer.on('error', (err) => {
                console.error('Peer error:', err);
            });


            peer.on('connectionStateChange', (state) => {
                console.log('Connection state changed:', state);
            });
if(props.callStatus.type=='offer'){

            peer.signal({
                type: props.callStatus.type,
                sdp: props.callStatus.sdp,
            });
        }
            connectionRef.current = peer;

        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    };

    return (
        <div
            style={{
                position: 'absolute',
                zIndex: 10000,
                width: '100dvw',
                height: '100dvh',
                opacity: '0.95',
                display: 'flex',
                alignItems: 'center',
                flexFlow: 'column',
                justifyContent: 'space-around'
            }}
        >
            {joined ? (
                <div 
                style={{display:"flex",alignItems:"center"

                    ,justifyContent:'center',flexFlow:"column ",gap:"25px"
                }}>
<video playsInline  ref={userVideo} autoPlay style={{width:'80%',height:"300px"}} />
    <video playsInline muted ref={myVideo} autoPlay width="100"style={{position:"absolute",left:30}} />
    
    <div>
        <IconButton onClick={()=>myVideo.current.mute()} ><MicOffIcon  /></IconButton>
       
        <IconButton onClick={()=>{myVideo.current.pause();}}><VideocamOffIcon  /></IconButton>
       
    <Link  onClick={()=>{connectionRef.current.destroy();myVideo.current.stop(); }} to={`/`} style={{textDecoration:"none"}} >   <IconButton color='error' ><PhoneDisabledIcon /></IconButton></Link>
    </div>
                </div>
            ) : (
                <>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexFlow: 'column',
                            gap: '25px'
                        }}
                    >
                        <Avatar alt={props.callStatus.senderid} src="./ddd" style={{ width: '80px', height: '80px' }} />
                        <h5>{props.callStatus.senderid} is calling...</h5>
                    </div>
                    <div style={{ display: 'flex', gap: '50px' }}>
                        <Link to={`/${props.userName}/${props.callStatus.senderid}`} style={{ textDecoration: 'none' }}>
                            <IconButton color="error" size="large">
                                <PhoneDisabledIcon />
                            </IconButton>
                        </Link>
                        <IconButton
                            color="success"
                            size="large"
                            edge="end"
                            onClick={() => {
                                console.log("Answer button clicked");
                                setJoined(true);
                                answerCall();
                            }}
                        >
                            <PhoneEnabledIcon />
                        </IconButton>
                    </div>
                </>
            )}
        </div>
    );
}
