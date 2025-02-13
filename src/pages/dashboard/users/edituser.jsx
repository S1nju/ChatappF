import { useState } from "react"
import Loading from '../../loading/loading'

import Spinner from 'react-bootstrap/Spinner';
import './users.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Axios } from "../../../api/axios";




export default  function Edituser(){

const[name,setname]=useState('');
const[email,setemail]=useState('');
const[password,setpassword]=useState('');
const[disable,setdiable]=useState(true);
const [role,setrole]=useState('');
const[loading,setloading]=useState(false);
const[loading2,setloading2]=useState(false);
let number =  window.location.pathname.split('/');
let id = number[number.length - 1];

useState(()=>{
setloading2(true);
    Axios.get('/user/user?id='+id).then(data=>{
        setname(data.data.username)
        setemail(data.data.email)
        setpassword(data.data.password)
        setrole(data.data.authorities[0].authority)
        console.log(role)
    }).then(()=>{setdiable(false);setloading2(false)}).catch(e=>{
        window.location.replace('/notfound')
    })
},[])
async function edit(){

setloading(true);
    try {
        await
        Axios.put('/user/update',{
            id:id,
            username:name,
            email:email,
            password:password,
            authorities:[{authority:role}]
        });

       window.location.pathname='/dashboard/users'

    } catch (error) {
        console.log(error);
        setloading(false)

    }
}


return(

<div className="allparente">


<div  className="edituserform">

    {loading2?     <div style={{position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',height:'50%',width:'82%' }}>

<Spinner  animation="border" role="status">
<span className="visually-hidden">Loading...</span>
</Spinner>

</div> :  <>
<h2 style={{ textAlign:'start',width:'fit-content'}}>Edit User</h2>
<p className="textw">Edit user's email and name</p>
<hr></hr>
<hr></hr>

<Form style={{display:'flex',flexFlow:'column'}} >
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="username"  name="email"  value={name}  onChange={e=>setname(e.target.value)} required />
      </Form.Group>

  <Form.Group className="mb-3" controlId="formPlaintextPassword">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com"  name="password"  value={email} onChange={e=>setemail(e.target.value)} required minLength='8'/>
      </Form.Group>
      <Form.Select  onChange={(e)=>setrole(e.target.value)}  value={role} aria-label="Default select example" className="mb-5">
   {disable? <option  style={{fontWeight:'500'}}>Select Role</option> : <>
      <option value='USER'>User</option>
      <option value='ADMIN'>ADMIN</option>
      </>}

    </Form.Select>

    <Button onClick={edit} style={{
   alignSelf:'center',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:'10%',
        width:'40%'
    }} disabled={disable}>
    { loading && <Loading></Loading>}
 Confirm</Button>
    <hr></hr>

</Form>   </>}


</div>

</div>


)




}