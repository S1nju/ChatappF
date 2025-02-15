import { useState } from "react"
import axios from 'axios'
import { baseurl,register } from "../../../api/api"
import { Link } from "react-router-dom";
import Loading from "../../loading/loading"
import Cookie from 'cookie-universal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import './auth.css'
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
export default  function Register(){
const [form,setform]=useState({
    username:'',
    email:'',
    password:'',
})
const[errtxt,seterrtxt]=useState('');
const [loading,setloading]=useState(false);
const [loading2,setloading2]=useState(false);
const [show,setshow]=useState(true)
function check(e){


    setform({...form,[e.target.name]:e.target.value})
}


async function submit(e){
    e.preventDefault();
    setloading(true)
try { 
    
    let res=
    await axios.post(baseurl+'/auth/'+register,form)
  
    if(res.status===200){
        if(form.email==""||form.password==""||form.username==""){
            setshow(true)  
            setloading(false)
            seterrtxt('Please fill the inputs');
        }else{
   
        setloading(false)
      
        const token = res.data;
    
        console.log(token);
        window.location.pathname='/'
        cookie.set('token',token)
        }
    }
    
} catch (error) {
    console.log(error);
    setshow(true)
    setloading(false)
    if(error.response.status===422){
        seterrtxt('Email is already been taken');
    }else{
        seterrtxt('Please Verify the inputs');
    }
    
}

   
}


 
return(
<div className="allparent">
<div className="lphoto"></div>
<div className="registerformparent">

{errtxt!==''&&     <Alert show={show} style={{position:'absolute',bottom:'25px'}} key={'danger'} variant={'danger'}>
       <i className="fa-regular fa-circle-xmark"></i>  {errtxt}  <Button onClick={() => setshow(false)} variant="outline-sucsses">
       <i className="fa-solid fa-xmark"></i>
          </Button>  </Alert>}
<h4>WELCOME</h4>
<p className="textw">Create An account and start messaging</p>
<hr></hr>
<hr></hr>
<Form onSubmit={submit}>


    <Form.Group className="mb-3" controlId='1'>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username"  name="username"  value={form.name}  onChange={check} required minLength='12'/>
      </Form.Group> 
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com"  name="email"  value={form.email}  onChange={check} required />
      </Form.Group> 
      <Form.Group className="mb-3" controlId="formPlaintextPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  name="password"  value={form.password} onChange={check}  required minLength='8'/>
      </Form.Group>

   
    <Button onClick={submit}  style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:'10%',
        width:'100%'
    
    }}>{loading && <Loading></Loading>}Register</Button>
   <hr></hr>
</Form>
<p>Or you  already have an account <Link to='/login'><b>Login</b></Link></p>
</div>


</div>)


}
