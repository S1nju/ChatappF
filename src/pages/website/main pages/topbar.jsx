import {  useContext, useEffect, useState } from "react";

import {logout } from "../../../api/api"

import { Axios } from "../../../api/axios";
import Cookie from 'cookie-universal'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun Icon (Light Mode)
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon Icon (Dark Mode)

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import StorageIcon from '@mui/icons-material/Storage'; 
import {  NavLink } from "react-router-dom";
import { menu } from "../../../contex/hamburger";

export default function TTopbar(d) {
  const pages = ['Homepage', 'About', 'Contact'];
 let {darklight,setdark} = useContext(menu);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  let handlechange=()=>{
    setdark(prev=>prev=!prev)

  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    window.location.pathname='/'
    
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
 const[user,setuser]=useState('')


 useEffect(()=>{


     Axios.get('/auth/user').then(data=>setuser(data.data)).catch(err=>console.log(err))









 },[])
async function hlogout(){
  const cookie = Cookie();
  try {



     await Axios.post('/auth/'+logout).then(()=>cookie.remove('token'))
     window.location.pathname='/login'
     setAnchorElUser(null);
  } catch (error) {
      console.log(error);
      setAnchorElUser(null);

  }}



  return (
    
     <AppBar   position="fixed"
     sx={{
      zIndex:70,
       width: '100%',
       overflowX: 'hidden', // Prevent horizontal overflow
     }}>
      <Container maxWidth="xl">
 
        <Toolbar disableGutters>
        <StorageIcon sx={{ display: { md: 'flex', xs: 'none' }, mr: 1 }} /> 
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           ERD
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <StorageIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
         ERTODB
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <IconButton color="inherit" onClick={handlechange}>
          {darklight ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
          <Box sx={{ flexGrow: 0 }}>
         
          {user!==''? <div>
            <Tooltip title="Open settings">
              
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
          
          <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
                </MenuItem>
                
                <MenuItem >
                <NavLink to={"/dashboard"} style={{textDecoration:"none"}}>   <Typography sx={{ textAlign: 'center',color:"black" }}>Dashboard</Typography></NavLink>
                </MenuItem>
                
                <MenuItem  onClick={hlogout}>
                  <Typography sx={{ textAlign: 'center' }}>logout</Typography>
                </MenuItem>
            </Menu></div> : <div style={{
              display:"flex",
              gap:"5px"
            }}> 
              
              
              <NavLink to={"/signup"} style={{textDecoration:"none", color:"black"}}> 
              
                <Button variant="contained" sx={{backgroundColor:"white",color:"royalblue"}} >Register 
                  
                  </Button></NavLink>
                  <NavLink to={"/login"} style={{textDecoration:"none", color:"black"}}> 
              
              <Button variant="contained" sx={{backgroundColor:"blue",color:"white"}} >Login 
                
                </Button></NavLink></div>}
           
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

  );
}
