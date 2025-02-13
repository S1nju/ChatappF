
import {  useEffect, useState } from "react"


import './users.css'
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import { Axios } from "../../../api/axios";
import Tdata from "../dashboardcomp/table";
import { Avatar } from "@mui/material";

export default function Users(){
    const [users1,setusers]=useState([]);
    const [user,setuser]=useState('');

    const [Loading,setloading]=useState(false);
    const [delete2,setdelete]=useState(0)

    useEffect(()=>{

     setloading(true);
    async function fetchdata() {
      Axios.get('/auth/user').then(data=>setuser(data.data)).catch(err=>console.log(err)).then(()=>{

        Axios.get("/user/users").then(data=>setusers(data.data)).then(()=>setloading(false)).catch(err=>console.log(err))
      })
     }
     fetchdata();
    },[delete2])
const filteredusers = users1.filter(user => 
      user.authorities.some(auth => auth.authority === "USER")
  );
const headerdata= [

  {  id:'username',
    name:'Name'
  },
  { id:'email',
    name:'Email'
  },
  {id:'authority',
    name:'Role'
  }
]; return (
 <div  style={{overflow:'scroll'}} className="usersshow" >
           <div style={{
            marginLeft:'30px',
            marginBottom:'40px'
           }}>
           <h1 style={{
                 color:'#29a5f7',
                 fontSize:'40px',
                 marginBottom:'30px'
               }} >  Welcome Admin</h1>
               <div style={{display:'flex',gap:'15px'}}>
               <Avatar alt={user.name} src="/static/images/avatar/2.jpg" style={{height:'71px',width:'71px'}} /><div><h4>{Loading?'loading..':user.name}</h4><p style={{color:'gray'}}>You can add , edit and delete users here</p></div></div></div>
               <div>
               <NavLink to='/dashboard/user'>  <Button>Add New User</Button></NavLink>
                <hr></hr>
                <Tdata header={headerdata} data={filteredusers} loading={Loading} type={'user'} handle={setdelete}></Tdata>

</div>
        </div>


  )
}