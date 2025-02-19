import { useState, useEffect, useRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Axios } from "../../api/axios";
import { user } from "../../api/api";

const useWebSocket = (topic, onMessageReceived) => {
  const clientRef = useRef(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // ✅ Fetch user info once on mount
  useEffect(() => {
    let isMounted = true;
    Axios.get(`/auth/${user}`)
      .then((res) => {
        if (isMounted) {
          setUserInfo(res.data);
        }
      })
      .catch((err) => console.error("Error fetching user info:", err));
    return () => {
      isMounted = false;
    };
  }, []);

  // ✅ WebSocket initialization
  useEffect(() => {
    if (!userInfo) return; // ✅ Ensure userInfo is available before connecting
    if (clientRef.current) return; // ✅ Prevent re-initialization

    console.log("🔵 Initializing WebSocket...");

    const socket = new SockJS("https://chatappb-xxt1.onrender.com/ws");
    const clientInstance = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // ✅ Auto-reconnect every 5s if disconnected
      heartbeatIncoming: 4000, // ✅ Helps keep connection alive
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log("✅ Connected to WebSocket");
        setIsConnected((prev) => {
            return true;
          });
          clientInstance.subscribe(`/user/${userInfo.name}/queue/webrtc`, (message) => {
            console.log(JSON.parse(message.body))
      
            const signal = JSON.parse(message.body);
      
        });

        clientInstance.subscribe(`/user/${userInfo.name}/queue/messages`, (message) => {
          const msg = JSON.parse(message.body);
          console.log("📩 Received private message:", msg.content);
          onMessageReceived(msg);
        });

        clientInstance.subscribe(topic, (msg) => {
          console.log("📩 Received message:", msg.body);
        });

        clientInstance.publish({
          destination: "app/user.addUser",
          body: JSON.stringify(userInfo),
        });
      },

      onStompError: (frame) => {
        console.error("❌ STOMP ERROR:", frame.headers["message"]);
      },

      onWebSocketClose: () => {
        console.warn("⚠️ WebSocket closed. Reconnecting...");
        setIsConnected(false);
      },
    });

    clientInstance.activate();
    clientRef.current = clientInstance; 
// ✅ Store instance in ref (prevents re-renders)

    return () => {
      console.log("🔴 Cleaning up WebSocket...");
      clientInstance.deactivate();
      clientRef.current = null;
    };
  }, [userInfo, topic]); // ✅ Only re-run when userInfo or topic changes
  // ✅ Track isConnected changes
// ✅ This will log when state updates

  return { client: clientRef.current, isConnected };
};

export default useWebSocket;
