import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/website/auth/login";
import Redirect from "./pages/website/auth/googlecallback";
import Register from "./pages/website/auth/register";
import './assets/all.min.css'
import { useContext, useEffect,useRef,useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./pages/dashboard/dashboard";
import Rauth from "./pages/website/auth/rauth";

import Err403 from "./pages/website/auth/403";
import Err404 from "./pages/website/auth/404";
import Logincallback from "./pages/website/auth/logincallback";
import { Axios } from "./api/axios";
import Cookie from 'cookie-universal'
import { menu } from "./contex/hamburger";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Message from "./pages/dashboard/Message";
import { user } from "./api/api";
import Profile from "./pages/dashboard/Profile";
import Call from "./pages/dashboard/Call";
import Answer from "./pages/dashboard/Answer";
import useWebSocket from "./pages/dashboard/wsCustomhook";






function App() {
  const cookie = Cookie()
  
  const [callStatus,setCallaStatus]=useState({});
  const [offerData,setOfferData]=useState(null);
  let navigate = useNavigate()
  function mssg(msg){   setCallaStatus(msg)
    console.log(msg)
    if(msg.type=='offer'){
   
    navigate('/call')}
    if(msg.type=='answer'){
      console.log("aw")
      setOfferData(msg)
      }

  }
   
      
         let{client}=useWebSocket(`/user/topic`,()=>{},mssg)
  let {darklight,setdark} = useContext(menu);
  const [ u,setu]=useState({})
 
  const [localStream,setLocalStream]=useState(null);
  const [remoteStream,setRemoteStream]=useState(null);
  const[peerConnection,setPeerConnection]=useState(null);
 
  useEffect(()=>{
        
        
          Axios.get('/auth/'+user).then(d=>{
             

            setu(d.data);
            console.log(d.data)

            
         })},[])
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  // Define the dark theme
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if ((error.response.status === 401 )&& (cookie.get("token")!=null)) {
      cookie.remove("token"); // Remove the token
      console.log("Token has expired and has been removed.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
  return (
    <ThemeProvider theme={darklight ? darkTheme : lightTheme}>
    {/* CssBaseline ensures consistent baseline styles across browsers */}
    <CssBaseline />
    <div className="App" style={{ height: '100%' , width:"100%" }}>

<Routes>

<Route element={
<Logincallback></Logincallback>}>
<Route path="login" element={
<Login></Login>}></Route>
<Route path="signup" element={
<Register></Register>}></Route></Route>

<Route path="/auth/google/callback" element={
<Redirect></Redirect>}></Route>
<Route path="/*" element={
<Err404></Err404>}></Route>
<Route element={<Rauth allowedRole={[ 'USER', 'ADMIN']}></Rauth>}>
<Route path="/call" element={
  <Answer
  
  callStatus={callStatus}
updateCallstatus={setCallaStatus}
localStream={localStream}
setLocalStream={setLocalStream}
remoteStream={remoteStream}
setRemoteStream={setRemoteStream}
peerConnection={peerConnection}
userName={u.name}
offerData={offerData}
  ></Answer>}></Route>
<Route path="/" element={
<Dashboard></Dashboard>}>

<Route path="403" element={
<Err403></Err403>}></Route>
<Route element={<Rauth allowedRole={['USER','ADMIN']}></Rauth>}>
<Route path={`call/${u.name}/:targetname`} element={
<Call   
callStatus={callStatus}
updateCallstatus={setCallaStatus}
localStream={localStream}
setLocalStream={setLocalStream}
remoteStream={remoteStream}
setRemoteStream={setRemoteStream}
peerConnection={peerConnection}
userName={u.name}
offerData={offerData}
></Call>}>
</Route>
<Route path={`${u.name}/:targetname`} element={
<Message></Message>}>





</Route>
<Route path={`profile/settings`} element={
<Profile></Profile>}>


</Route>

</Route>




</Route></Route>

</Routes>
    </div></ThemeProvider>
  );
}

export default App;
