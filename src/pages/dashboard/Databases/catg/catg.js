
import {  useEffect, useState } from "react"
import { catg } from "../../../../api/api";

import '../../users/users.css'
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import { Axios } from "../../../../api/axios";
import Image from 'react-bootstrap/Image';
import Tdata from "../../dashboardcomp/table";

export default function Catg(){
    const [categories,setcategories]=useState([]);
    const [user,setuser]=useState('');
    const [Loading,setloading]=useState(false);
    const [delete2,setdelete]=useState(0)
    useEffect(()=>{

      setloading(true);
         Axios.get('/user').then(data=>setuser(data.data)).catch(err=>console.log(err))
     },[delete2])
    useEffect(()=>{

     setloading(true);
        Axios.get('/'+catg).then(data=>setcategories(data.data)).then(()=>setloading(false)).catch(err=>console.log(err))









    },[delete2])





const headerdata= [


  { id:'title',
    name:'Title'
  },
  { id:'image',
    name:'Image'
  }
  ];
  const a = headerdata[0]['name']
  console.log(a);


    return (



        <div  style={{overflow:'scroll'}} className="usersshow" >
           <div style={{
            marginLeft:'30px',
            marginBottom:'40px'



           }}>
           <h1 style={{
                 color:'#29a5f7',
                 fontSize:'40px',
                 marginBottom:'30px'
               }} >Categories page</h1>
               <div style={{display:'flex',gap:'15px'}}>
                <Image  style={{height:'71px',width:'71px'}}  src={require('./favicon.ico')} roundedCircle /> <div><h4>{Loading?'loading..':user.name}</h4><p style={{color:'gray'}}>You can add , edit and delete categories here</p></div></div></div>


               <div>
               <NavLink to='/dashboard/newcatg'>  <Button>Add New Category</Button></NavLink>


                <hr></hr>



<Tdata header={headerdata} data={categories} loading={Loading} type={'category'} handle={setdelete}></Tdata>
</div>
        </div>


  )
}