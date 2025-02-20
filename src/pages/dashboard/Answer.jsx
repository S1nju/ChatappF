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
                        { urls: "stun:stun1.l.google.com:19302" },
                        { urls: "stun:stun2.l.google.com:19302" },
                        { urls: "stun:stun3.l.google.com:19302" },
                        // Add TURN servers if needed.
                        {
                            url: 'turn:numb.viagenie.ca',
                            credential: 'muazkh',
                            username: 'webrtc@live.com'
                        },
                        {
                            url: 'turn:192.158.29.39:3478?transport=udp',
                            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                            username: '28224511:1379330808'
                        },
                        {
                            url: 'turn:192.158.29.39:3478?transport=tcp',
                            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                            username: '28224511:1379330808'
                        }
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

            peer.signal({
                type: props.callStatus.type,
                sdp: props.callStatus.sdp,
            });

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
                <div>
                    <video playsInline muted  ref={userVideo} autoPlay width="500" style={{ background: 'black' }} />
                    <video playsInline muted ref={myVideo} autoPlay width="100" height="100" />
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
