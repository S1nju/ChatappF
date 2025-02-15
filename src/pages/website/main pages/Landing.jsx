import React,{useContext} from 'react'
import './App.css'
import TTopbar from './topbar'
import { Button, Typography } from '@mui/material'

import SpotlightCard from '../../../blocks/Components/SpotlightCard/SpotlightCard'
import { NavLink } from 'react-router-dom'
import { menu } from '../../../contex/hamburger'
export default function Landing() {
  let {darklight,setdark}=useContext(menu);
    const footerStyles = {
        backgroundColor: "#222",
        color: "#fff",
        padding: "20px 0",
        marginTop:"70px",

     
      };
    
      const containerStyles = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "flex-start",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
      };
    
      const sectionStyles = {
        flex: "1 1 250px",
        margin: "10px",
      };
    
      const headingStyles = {
        fontSize: "1.2rem",
        marginBottom: "15px",
      };
    
      const listStyles = {
        listStyle: "none",
        padding: 0,
      };
    
      const listItemStyles = {
        marginBottom: "10px",
      };
    
      const linkStyles = {
        color: "#fff",
        textDecoration: "none",
        transition: "color 0.3s",
      };
    
      const linkHoverStyles = {
        color: "#1e90ff",
      };
    
      const socialIconStyles = {
        display: "flex",
        gap: "10px",
      };
    
      const socialLinkStyles = {
        color: "#fff",
        fontSize: "1.5rem",
        textDecoration: "none",
        transition: "color 0.3s",
      };
    
      const footerBottomStyles = {
        textAlign: "center",
        marginTop: "20px",
        fontSize: "0.9rem",
        color: "#aaa",
      };


  return (
   <> <TTopbar></TTopbar>
 
   <div id='home' style={{
    display:"flex",
    flexFlow:"column",
    paddingTop:"100px",
    margin:"0",
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center",
   }}>
      <div
       style={{
        display:"flex",
        flexFlow:"row wrap",
      
        textAlign:"center",
        alignItems:"center",
        justifyContent:"center",
       }}
      
      >  
    <Typography  variant="h3" component="h3" sx={{width:"90%"}}>
WELCOME TO <Typography variant="h3" component="h3" sx={{color: darklight?'#B2A5FF':'#493D9E',}}>
CHATAPP
</Typography>
</Typography>
<Typography 
    style={{ paddingTop:"30px", width:"90%",fontWeight:"bold"}}>This app connects between people
</Typography> 
<NavLink to="/dashboard"><Button variant='contained' sx={{marginTop:"30px",backgroundColor:darklight?'#B2A5FF':'#493D9E'}}>start Messaging</Button></NavLink>
 

</div>

  
 </div>

  
<footer id='contact' style={footerStyles}>
      <div style={containerStyles}>
        {/* About Section */}
        <div style={sectionStyles}>
          <h3 style={headingStyles}>About Us</h3>
          <p>
            We are committed to delivering the best products and services to
            our customers worldwide.
          </p>
        </div>

        {/* Links Section */}
        <div style={sectionStyles}>
          <h3 style={headingStyles}>Quick Links</h3>
          <ul style={listStyles}>
            <li style={listItemStyles}>
              <a href="#home" style={linkStyles} onMouseOver={(e) => e.target.style.color = linkHoverStyles.color} onMouseOut={(e) => e.target.style.color = linkStyles.color}>
                Home
              </a>
            </li>
            <li style={listItemStyles}>
              <a href="#about" style={linkStyles} onMouseOver={(e) => e.target.style.color = linkHoverStyles.color} onMouseOut={(e) => e.target.style.color = linkStyles.color}>
                About
              </a>
            </li>
            <li style={listItemStyles}>
              <a href="#contact" style={linkStyles} onMouseOver={(e) => e.target.style.color = linkHoverStyles.color} onMouseOut={(e) => e.target.style.color = linkStyles.color}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div style={sectionStyles}>
          <h3 style={headingStyles}>Follow Us</h3>
          <div style={socialIconStyles}>
            <a href="https://github.com/S1nju" style={socialLinkStyles} onMouseOver={(e) => e.target.style.color = linkHoverStyles.color} onMouseOut={(e) => e.target.style.color = socialLinkStyles.color}>
              🌐
            </a>
            <a href="https://github.com/S1nju" style={socialLinkStyles} onMouseOver={(e) => e.target.style.color = linkHoverStyles.color} onMouseOut={(e) => e.target.style.color = socialLinkStyles.color}>
              🐦
            </a>
            <a href="https://github.com/S1nju" style={socialLinkStyles} onMouseOver={(e) => e.target.style.color = linkHoverStyles.color} onMouseOut={(e) => e.target.style.color = socialLinkStyles.color}>
              📷
            </a>
            <a href="https://github.com/S1nju" style={socialLinkStyles} onMouseOver={(e) => e.target.style.color = linkHoverStyles.color} onMouseOut={(e) => e.target.style.color = socialLinkStyles.color}>
              🔗
            </a>
          </div>
        </div>
      </div>

      <div style={footerBottomStyles}>
        © 2025 Bouhaik anes mohammed el amine. All rights reserved.
      </div>
    </footer>
    
    </>
  )
}
