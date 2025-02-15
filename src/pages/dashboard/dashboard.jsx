import { Link, NavLink, Outlet } from "react-router-dom";
import './dashboard.css'
import React,{ useState,useEffect, useContext } from "react";
import { Axios } from "../../api/axios";
import { user } from "../../api/api";
import './dashboardcomp/dashboardcomp.css'
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import SplitText from '../../blocks/TextAnimations/SplitText/SplitText'
import StorageIcon from '@mui/icons-material/Storage'; 
import { Avatar, Button, Card, CardContent, Typography,CardActions, Drawer, List, ListSubheader, ListItemButton, ListItemAvatar, ListItemText, Badge, TextField } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import axios from "axios";
import Cookie from 'cookie-universal'
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import { Padding } from "@mui/icons-material";
import Loading from "../loading/loading";
import useWebSocket from "./wsCustomhook";
export default function Dashboard(){
    const [u,setu]=useState("");
    const cookie = Cookie()

    const [Selected,setSelected]=useState(0);
    const [SelectedMobile,setSelectedMobile]=useState(0);
    const [loading,setloading]=useState(true);
    

let{client}=useWebSocket(`/user/topic`,handleMessagerecived)
      const  [NAVIGATION,setNav] = useState([ {
        segment: '',
        title: 'Messages',
        icon: <ChatIcon />,
      },
      {
        segment: '/',
        title: 'Home',
        icon: <HolidayVillageIcon />,
      },
    
       
      ]);
      const  [messages,setmessages] = useState([]);
      const  [talkedto,settalkedto] = useState([]);

      function handleMessagerecived(msg){
        console.log(msg)
        setmessages((prev) => {
          
          let filtredUsers =  prev.filter((i)=>i.person!=msg.senderid)
          return [ {
           
           
          id: prev[prev.length-1].id+1,
          primary: msg.senderid,
          secondary: 'him: '+msg.content,
          person: msg.senderid,
        
          
        },...filtredUsers]});
      }
    
  
      const demoTheme = extendTheme({
        colorSchemes: { light: true, dark: true },
        colorSchemeSelector: 'class',
          palette: {
    secondary: {
      main: '#493D9E', // Your secondary color
    }},
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
          },
        },
      });
      const Skeleton = styled('div')(({ theme, height }) => ({
        backgroundColor: theme.palette.action.hover,
        borderRadius: theme.shape.borderRadius,
        height,
        content: '" "',
      }));
      useEffect(()=>{
        
        try {
          Axios.get('/auth/'+user).then(d=>{
             

            setu(d.data);
            
            findandDisplayAllConnectedUsers(cookie.get('token'),d.data.name);
            setloading(false)

            
         })

          async function findandDisplayAllConnectedUsers(token,name){
     
            try {
              const response = await axios.get('https://chatappb-xxt1.onrender.com/online',{ headers:{
                Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
              }});
             let arr=[]
             let filtredUsers =  response.data.filter((i)=>i.username!=name)
             filtredUsers.map((item,i)=>{
           
          arr.push( {
           
           
            id: i,
            primary: item.username,
            secondary: `${name}/${item.username}`,
            person: item.username,
          
            
          })

            })
            setmessages([...arr
               
             
            ])
    
            } catch (error) {
              console.error('Error fetching users:', error);
            }
          
      
          
    }
  






        } catch (e) {

            window.location.pathname='/login'

        }
    },[])
    const drawerWidth = 240;
    const [query, setQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
  
    const handleSearch = (e) => {
      const value = e.target.value.toLowerCase();
      setQuery(value);
      if(value==''){
        setFilteredUsers([])
      }else{
   
      setFilteredUsers(
        messages.filter((user) => user.person.toLowerCase().includes(value))
      );}
    };
    
  
  
    return(<AppProvider
        navigation={NAVIGATION}
        branding={{
          logo:<ChatIcon />,
            title: 'ChatApp',
            homeUrl: '/',
          }}
        theme={demoTheme}
        className="dparent"
        style={{
          overflowX:"hidden"
        }}
       
      >
        <DashboardLayout defaultSidebarCollapsed>
            <div style={{
              height:"100%",display:"flex"
            }}>
       
            <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,position:"relative",height:"90vh" },
           
          }}
          style={{}}
          open
        >
          {loading?<div
                  style={{
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      height:"100%"
                  }}
                  ><Loading ></Loading></div>: <List sx={{ mb: 2 }}>
           <ListItemButton
           
           >
                <ListItemAvatar>
                <Badge color="success" variant="dot">
                <Avatar alt={u.name}  />
</Badge>
                  
                </ListItemAvatar>
                <ListItemText primary={u.name} secondary={'Click to open  Settings'} />
              </ListItemButton>
     
           <hr ></hr>
        
           <TextField
        label="Search Users"
        variant="outlined"
        size="small"
        value={query}
        onChange={handleSearch}
        sx={{ marginBottom: 2,width:"80%",ml:2 }}
      />
          {filteredUsers.map(({ id, primary, secondary, person },i) => (
            <React.Fragment key={i}>
            <Link to={`${u.name}/${person}`} style={{textDecoration:"none"}}> <ListItemButton
                 onClick={() => setSelected(id)}
                 sx={{
                   bgcolor: Selected === id ? "rgba(211, 211, 211, 0.17)" :""}}
            >
                <ListItemAvatar>
                <Badge color="success" variant="dot">
                <Avatar alt={person} src={person} />
</Badge>
                 
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItemButton></Link> 
            </React.Fragment>
          ))}
        </List>}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width:"70px",position:"relative",height:"100%",overflowX:"hidden" },
           
          }}
          style={{}}
          open
        >
        {  loading? <div
                style={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    height:"100%"
                }}
                ><Loading ></Loading></div>: <List sx={{ mb: 2 }}>
          {messages.map(({ id, primary, secondary, person },i) => (
            <React.Fragment key={i}>
            <Link to={`${u.name}/${person}`}>  <ListItemButton
                 onClick={() => setSelectedMobile(id)}
                 sx={{
                   bgcolor: SelectedMobile === id ? "rgba(211, 211, 211, 0.17)" :""}}
            >
                <ListItemAvatar>
                <Badge color="success" variant="dot">
                <Avatar alt={person} src={person} />
</Badge>
            
                </ListItemAvatar>
              </ListItemButton></Link> 
            </React.Fragment>
          ))}
        </List>}
        </Drawer>
    { window.location.pathname=='/'?<div style={{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      height:"100%",
      width:"100%",
      padding:"25px"
    }}>

      <div style={{backgroundImage:`url('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWx5bWY4cWw4Y2RiaWpuYWJndzIydmQyamRvbXViN2F4NWV5NWJtMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oiBqxFYzZRhzDtEHcl/giphy.gif')`,
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        backgroundPosition:"center",
        height:"200px",width:"200px"
      }}>


      </div>
    </div>:  <Outlet></Outlet>}
       </div>
        </DashboardLayout>
      </AppProvider>)
//     <div className="dparent">

// <Topbar></Topbar>

// <div style={{display:'flex'}}>
// <Sidebar></Sidebar>


// <Outlet ></Outlet></div>




//     </div>)
}
