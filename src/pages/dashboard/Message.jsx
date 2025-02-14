import { Avatar, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Cookie from 'cookie-universal';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Axios } from '../../api/axios';
import { user } from '../../api/api';

export default function Message() {
  const cookie = Cookie();
  const { name, targetname } = useParams();
  
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    Axios.get('/auth/' + user)
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!userInfo?.name) return;

    const socket = new SockJS('https://chatappb-xxt1.onrender.com/ws');
    const stomp = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Connected to STOMP broker');

        stomp.subscribe(`/user/${userInfo.name}/queue/messages`, (message) => {
          const msg = JSON.parse(message.body);
          console.log('Received private message:', msg.content);
          
          setChatMessages((prev) => [...prev, msg]); // Update state directly
        });

        stomp.subscribe(`/user/topic`, (message) => {
          console.log('Received public message:', message.body);
        });

        stomp.publish({
          destination: 'app/user.addUser',
          body: JSON.stringify(userInfo),
        });
      },
      onDisconnect: () => console.log('Disconnected from STOMP broker'),
      onStompError: (frame) => console.error('STOMP error:', frame),
    });

    stomp.activate();
    setStompClient(stomp);

    return () => {
   
      stomp.deactivate();
    
    };
  }, [userInfo]);

  // Fetch chat history once when the component loads
  useEffect(() => {
    if (!name || !targetname) return;

    const fetchChats = async () => {
      try {
        const response = await axios.get(`https://chatappb-xxt1.onrender.com/messages/${name}/${targetname}`, {
          headers: { Authorization: `Bearer ${cookie.get('token')}` },
        });
        setChatMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChats();
  }, [name, targetname]);

  const handleMessageSend = () => {
    if (!message.trim() || !stompClient) return;

    const chatMsg = {
      senderid: name,
      recId: targetname,
      content: message,
      timeStamp: new Date(),
    };
setChatMessages(prev=>[...prev, chatMsg])
    stompClient.publish({
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
    <div style={{ display: 'flex', flexFlow: 'column', padding: '25px', height: '100%' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Avatar alt={targetname} src="/static/images/avatar/2.jpg" />
        <div>
          <span>{targetname}</span>
          <span style={{ color: 'grey', display: 'block', fontSize: '10px' }}>ONLINE</span>
        </div>
      </div>
      
      <div style={{ flexGrow: 2, margin: '10px', overflowY: 'auto', overflowX: 'hidden' }}>
        {chatMessages.map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: item.senderid !== name ? 'start' : 'end',
            margin: '10px',
            
            width: '100%',
          }}>
            <div style={{
              backgroundColor: item.senderid !== name ? 'royalblue' : 'blue',
              padding: '10px 10px 0px 10px',
              borderRadius: '50px',
              display: 'flex',
              alignItems: 'center',
              marginRight:"15px",
              justifyContent: 'center',
            }}>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div style={{ width: '100%', display: 'flex', gap: '5px', alignItems: 'center' }}>
        <TextField
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="filled"
          sx={{ width: '90%' }}
          inputProps={{ maxLength: 50 }}
        />
        <Button variant="outlined" onClick={handleMessageSend} sx={{ height: '100%' }}>
          Send
        </Button>
      </div>
    </div>
  );
}
