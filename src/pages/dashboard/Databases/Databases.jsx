
import {  useEffect, useState } from "react"
import { prods } from "../../../api/api";

import '../users/users.css'
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import { Axios } from "../../../api/axios";
import Tdata from "../dashboardcomp/table";
import { Avatar } from "@mui/material";

export default function Databases(){
    const [Products,setProduct]=useState([]);
    const [user,setuser]=useState('');
    const [Loading,setloading]=useState(false);
    const [delete2,setdelete]=useState(0)
    useEffect(()=>{

      setloading(true);
         Axios.get('/auth/user').then(data=>setuser(data.data)).catch(err=>console.log(err))
      
     },[delete2])
    useEffect(()=>{

     setloading(true);
        Axios.get('/db/'+prods).then(data=>{setProduct(data.data)
        }).then(()=>setloading(false)).catch(err=>console.log(err))
    },[delete2])





const headerdata= [


  { id:'name',
    name:'Name'
  },
  { id:'type',
    name:'Type'
  }
  ];
  
 


    return (



        <div  style={{overflow:'scroll'}} className="usersshow" >
           <div style={{
          



           }}>
           <h1 style={{
                 color:'#29a5f7',
                 fontSize:'35px',
                 marginBottom:'30px'
               }} >DataBases</h1><div style={{display:'flex',gap:'15px',justifyContent:"space-between"}}>
               <div style={{display:'flex',gap:'15px'}}>
               <Avatar alt={user.name} src="/static/images/avatar/2.jpg" style={{height:'71px',width:'71px'}} />
                
                <div><h4>{Loading?'loading..':user.name}</h4>
                <p style={{color:'gray'}}>
                  In this section you can create update and delete databases</p>
                  </div> </div>
                  <NavLink to='/dashboard/newDb' style={{alignSelf:"end"}} >  <Button>Create DB</Button></NavLink>
                  </div>
                  
                
                  </div>


               <div>
               


                <hr></hr>



<Tdata header={headerdata} data={Products} loading={Loading} type={'db'} handle={setdelete}></Tdata>
</div>
        </div>


  )
}