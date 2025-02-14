import { NavLink, Outlet } from "react-router-dom";
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
import { Avatar, Button, Card, CardContent, Typography,CardActions } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import axios from "axios";
import Cookie from 'cookie-universal'
export default function Dashboard(){
    const [u,setu]=useState("");
    const cookie = Cookie()

    const [graph,setgraphs]=useState("");

      const  [NAVIGATION,setNav] = useState([
    
       
      ]);
    

    useEffect(()=>{
        try {
          async function findandDisplayAllConnectedUsers(token,name){
     
            try {
              const response = await axios.get('https://chatappb-xxt1.onrender.com/online',{ headers:{
                Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
              }});
             let arr=[]
            response.data.map(item=>{
            console.log(u)
          arr.push( {
            segment:`dashboard/${name}/${item.username}`,
            title:item.username,
            icon: <Avatar alt={item.username} src="/static/images/avatar/2.jpg" sx={{width:27,height:27}} />,
            
          })

            })
            setNav([...arr
               
             
            ])
            
            } catch (error) {
              console.error('Error fetching users:', error);
            }
          
      
          
    }
  

             Axios.get('/auth/'+user).then(d=>{
             

                setu(d.data);
                console.log(d.data)
                findandDisplayAllConnectedUsers(cookie.get('token'),d.data.name);
            
    
                
             })





        } catch (e) {

            window.location.pathname='/login'

        }
    },[])

  
   
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
        <DashboardLayout>
            { window.location.pathname==="/dashboard"?
       <div style={{display:"flex",flexFlow:"column wrap",width:"100%"}}> 
      
       <div style={{display:"flex",padding:"30px",width:"100%"}}>
       <div>
    <h3>Hello Welcome to chatapp</h3> 
     <div style={{display:"flex", gap:"30px",marginTop:"30px",flexFlow:"row wrap",width:"100%"}}>
         <Avatar alt={u.name} src="/static/images/avatar/2.jpg" style={{height:'71px',width:'71px'}} />
                
                <div><h4>{u.name}</h4><span>this is your Profile</span>
                  </div>
                 
                  
                   </div>
                  <hr ></hr>
                
       </div>
    
       
       </div>
       
       </div>
       :<Outlet></Outlet>}
        
        </DashboardLayout>
      </AppProvider>)
//     <div className="dparent">

// <Topbar></Topbar>

// <div style={{display:'flex'}}>
// <Sidebar></Sidebar>


// <Outlet ></Outlet></div>




//     </div>)
}
