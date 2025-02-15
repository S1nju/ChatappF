import { Avatar, Button, IconButton, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState, useRef, useContext } from 'react';
import Cookie from 'cookie-universal';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Axios } from '../../api/axios';
import { user } from '../../api/api';
import { menu } from '../../contex/hamburger';
import SendIcon from '@mui/icons-material/Send';
import Loading from '../loading/loading';
import useWebSocket from './wsCustomhook';
export default function Message() {
  const cookie = Cookie();
  const { targetname } = useParams();
  let name = window.location.pathname.split('/')[1]

  const [loading,setloading]=useState(true);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const [userInfo, setUserInfo] = useState(null);

  let {darklight,setdark}=useContext(menu);
  const messagesEndRef = useRef(null);

 function handleMessagerecived(msg){
    setChatMessages((prev) => [...prev, msg]);
  }
let{client}=useWebSocket(`/user/topic`,handleMessagerecived)

  // Fetch chat history once when the component loads
  useEffect(() => {
    if (!name || !targetname) return;

    const fetchChats = async () => {
      try {
        const response = await axios.get(`https://chatappb-xxt1.onrender.com/messages/${name}/${targetname}`, {
          headers: { Authorization: `Bearer ${cookie.get('token')}` },
        });
        setChatMessages(response.data);
        setloading(false)
      } catch (error) {
        console.error('Error fetching chat history:', error);
        setloading(true)
      }
    };
    setloading(true)
    fetchChats();
  }, [name, targetname]);

  const handleMessageSend = () => {
    if (!message.trim() || !client) return;

    const chatMsg = {
      senderid: name,
      recId: targetname,
      content: message,
      timeStamp: new Date(),
    };
setChatMessages(prev=>[...prev, chatMsg])
client.publish({
      destination: '/app/chat',
      body: JSON.stringify(chatMsg),
    });

    setMessage('');
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div style={{ display: 'flex', flexFlow: 'column', padding: '10px 4px', height: '100%' ,overflowX: 'hidden',width:"100%"}}>
      <div style={{ display: 'flex', gap: '10px' }}>
     
      <Avatar alt={targetname} src="/static/images/avatar/2.jpg" style={{width:"35px",height:"35px"}} />

              
 
        <div>
          <span>{targetname}</span>
          <span style={{ color: 'grey', display: 'block', fontSize: '9px' }}>{"ONLINE"}</span>
        </div>
      </div>
      
      <div style={{ flexGrow: 2,  overflowY: 'auto', overflowX: 'hidden'  }}>
        {loading?<div
        style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            height:"100%"
        }}
        ><Loading ></Loading></div>:<>{chatMessages.map((item, i) => (<>
                  
          <div  style={{
            display: 'flex',
            justifyContent: item.senderid !== name ? 'start' : 'end',
        
            margin: '10px',
            
            width: '100%',
          }}>
       <Paper
                   sx={{
                     p: 1.5,
                     maxWidth: "70%",
                     bgcolor:  item.senderid !== name ? "primary.main" : "grey.300",
                     color:  "black",
                     marginX:item.senderid == name ?"15px":"",
                     borderRadius:  item.senderid == name ? "20px 20px 0 20px" : "20px 20px 20px 0",
                   }}
                   key={i}
                 >
                   <Typography variant="body2">{item.content}</Typography>
                   <Typography variant="caption" sx={{ display: "block", textAlign: "right", mt: 0.5, opacity: 0.7,fontSize:"9px" }}>
                     {(new Date(item.timeStamp)).toLocaleString()}
                   </Typography>
                 </Paper>
          </div>
         
          </>
        ))}</>}
 
        <div ref={messagesEndRef}></div>
      </div>

      <div style={{ width: '100%', display: 'flex', gap: '5px', alignItems: 'center' ,padding:"10px"}}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}

        sx={{ mr: 1 }}
      />
      <IconButton color="primary" onClick={handleMessageSend} disabled={!message.trim()}>
        <SendIcon />
      </IconButton>
    
      </div>
    </div>
  );
}
