import React,{useContext} from 'react'
import './App.css'
import TTopbar from './topbar'
import { Button, Typography } from '@mui/material'
import Wave from 'react-wavify'
import TiltedCard from '../../../blocks/Components/TiltedCard/TiltedCard'
import TextPressure from '../../../blocks/TextAnimations/TextPressure/TextPressure'
import LogoWall from '../../../blocks/Components/LogoWall/LogoWall';

import SpotlightCard from '../../../blocks/Components/SpotlightCard/SpotlightCard'
import { NavLink } from 'react-router-dom'
import { menu } from '../../../contex/hamburger'
export default function Landing() {
  let {darklight,setdark}=useContext(menu);
  const logoImgs = [
    { imgUrl: './1567361.png', altText: "ERTODB" },
    { imgUrl: './6742694.png', altText: "ERTODB" },
    { imgUrl: './OIP (1).jpg', altText: "ERTODB" },
    { imgUrl:  './OIP (2).jpg', altText: "ERTODB" },
    { imgUrl:  './OIP (3).jpg', altText: "ERTODB" },
  ];
    const footerStyles = {
        backgroundColor: "#222",
        color: "#fff",
        padding: "20px 0",
        marginTop:"20px"
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
    <Typography  variant="h2" component="h2" sx={{width:"90%"}}>
 Welcome to your <Typography variant="h2" component="h2" sx={{color: darklight?'#90caf9':'royalblue',}}>
 ER To database application
</Typography>
</Typography>
<Typography 
    style={{ paddingTop:"30px", width:"90%",fontWeight:"bold"}}>This app provides the
    Conception of ER diagrams to
     to use in your next sql applications for varios sgbd</Typography> 
<NavLink to="/dashboard"><Button variant='contained' sx={{marginTop:"30px"}}>start Messaging</Button></NavLink>
 



<div style={{height: 'auto', width: '100%', position: 'relative'}}>
  <LogoWall
    items={logoImgs}
    direction='horizontal'
    pauseOnHover={true}
    size='clamp(8rem, 1rem + 20vmin, 25rem)'
    duration='60s'
    bgColor={darklight?'#121212':'#fff'}
    bgAccentColor={darklight?'#121212':'#fff'}
  />  
</div>
<Wave fill={darklight?'rgb(129 159 183)':'royalblue'}
        paused={false}
        style={{ display: 'flex'}}
        options={{
          height: 20,
          amplitude: 20,
          speed: 0.15,
          points: 3
        }}
        
  />
  
  <div style={{backgroundColor:darklight?'rgb(129 159 183)':'royalblue',padding:"50px",width:"100%",display:"flex",flexFlow:"row wrap",gap:"50px",alignContent:"center",justifyContent:"center"}}>
  
 
  <Typography 
    style={{  width:"100%",fontWeight:"500",color:"black",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <TextPressure
    text="Why ER to DB"
    flex={true}
    alpha={false}
    stroke={false}
    width={true}
    weight={true}
    italic={true}
    textColor={darklight?'#000':'#fff'}
    strokeColor="#ff0000"
    minFontSize={20}

  />
    
    
    </Typography> 
<div>
<TiltedCard
  imageSrc="../../../assets/c1d644c9-3170-4dfc-ad96-f74a423e6e2f.jpg"
  altText="ERTODB"
  captionText="ERTODB"
  containerHeight="300px"
  containerWidth="300px"
  imageHeight="300px"
  imageWidth="300px"
  rotateAmplitude={12}
  scaleOnHover={1.2}
  showMobileWarning={false}
  showTooltip={true}
  displayOverlayContent={true}
/>
<p className="tilted-card-demo-text" style={{fontWeight:"500",fontSize:"25px",color:darklight?'#000':'#fff'}}>
     Save Your Diagrams
      <hr style={{backgroundColor:"black",marginTop:"0"}}></hr>
    </p>
</div>
<div>
<TiltedCard
  imageSrc="../../../assets/86fb7861-d698-4513-83af-70967740814c.jpg"
  altText="ERTODB"
  captionText="ERTODB"
  containerHeight="300px"
  containerWidth="300px"
  imageHeight="300px"
  imageWidth="300px"
  rotateAmplitude={12}
  scaleOnHover={1.2}
  showMobileWarning={false}
  showTooltip={true}
  displayOverlayContent={true}

/>
<p className="tilted-card-demo-text" style={{fontWeight:"500",fontSize:"25px",color:darklight?'#000':'#fff'}}>
     Easy to deal with
      <hr style={{backgroundColor:"black",marginTop:"0"}}></hr>
    </p>
</div>
<div>
<TiltedCard
  imageSrc="../../../assets/446ee1af-ec90-4577-80f7-e10a52afd04b.jpg"
  altText="ERTODB"
  captionText="ERTODB"
  containerHeight="300px"
  containerWidth="300px"
  imageHeight="300px"
  imageWidth="300px"
  rotateAmplitude={12}
  scaleOnHover={1.2}
  showMobileWarning={false}
  showTooltip={true}
  displayOverlayContent={true}
 
/>
<p className="tilted-card-demo-text" style={{fontWeight:"500",fontSize:"25px",color:darklight?'#000':'#fff'}} >
      Fast and Secure
      <hr style={{backgroundColor:"black",marginTop:"0"}}></hr>
    </p>
</div>
  </div>
    </div>
    <div id="about" style={{display:"flex",
alignItems:"center",
justifyContent:"center",
        padding:"30px",
        gap:"15px",
        flexFlow:"row wrap",
         height:"550px"
    }} >
    
    <div>
    <Typography variant="h3" component="h3" style={{color:"royalblue"}} >
About us
</Typography>
<hr style={{backgroundColor:"black",marginTop:"0",width:"30%",height:"2px"}}></hr>
<Typography  style={{maxWidth:"800px"}} >
Lorem Ipsum is simply dummy text of the 
printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
software like Aldus PageMaker including versions of Lorem Ipsum.
</Typography>

    </div>
    <div></div>

      
<SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.4)" >
<i class="fa fa-lock" style={{color:"white"}}></i>
<h2 style={{color:"white"}}>Created by</h2>
<p style={{color:"white"}}>Bouhaik anes mohammed el amine</p>
< Button variant='contained' sx={{backgroundColor:"white",color:"royalblue"}}>Lets Connect</Button>
</SpotlightCard>
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
