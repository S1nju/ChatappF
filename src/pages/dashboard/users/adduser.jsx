
import { useState } from "react"
import Loading from '../../loading/loading'
import './users.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Axios } from "../../../api/axios";
import Alert from 'react-bootstrap/Alert';
export default  function Adduser(){
  const [form,setform]=useState({
    name:'',
    email:'',
    password:'',
    role:''
})
console.log(form);
function check(e){
    setform({...form,[e.target.name]:e.target.value})
}
const[loading,setloading]=useState(false);
const[show,setshow]=useState(false);
const[errtxt,seterrtxt]=useState('');
async function create(){
setloading(true);
    try {
      let res=
      await Axios.post('user/add',form)

      if(res.status===200){
        window.location.pathname='/dashboard/users'
          setloading(false)


      }




    } catch (error) {
      setshow(true);

        setloading(false);
        if(error.response.status===422){
          seterrtxt('Email is already been taken');
      }else{
          seterrtxt('Please Verify the inputs');
      }


    }
}


return(<div className="allparente">


    <div  className="edituserform">

<h2 style={{ textAlign:'start',width:'fit-content'}}>Create New User</h2>
<p className="textw">Create a user and set his role</p>
<hr></hr>
<hr></hr>
<Alert show={show} style={{display:'flex',alignItems:'center',justifyContent:'space-between'}} key={'danger'} variant={'danger'}>
    <div>   <i className="fa-regular fa-circle-xmark"></i>  {errtxt} </div> <Button  onClick={() => setshow(false)} variant="outline-sucsses">
       <i className="fa-solid fa-xmark"></i> </Button></Alert>

<Form style={{display:'flex',flexFlow:'column'}} >
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="username"  name="name"  value={form.name}  onChange={check} required />
      </Form.Group>


  <Form.Group className="mb-3" controlId="formPlaintextPassword">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com"  name="email"  value={form.email} onChange={check} required minLength='8'/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  name="password"  value={form.password}  onChange={check} required />
      </Form.Group>
      <Form.Select name="role"  onChange={check}  value={form.role} aria-label="Default select example" className="mb-5">
   <option  style={{fontWeight:'500'}}>Select Role</option><option value='1995'>Admin</option>
      <option value='2001'>User</option>
      <option value='1996'>Writer</option>
      <option value='1999'>Product Manager</option>
    </Form.Select>

    <Button onClick={create} style={{
   alignSelf:'center',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:'10%',
        width:'40%'
    }}>
    { loading && <Loading></Loading>}
 Create</Button>
    <hr></hr>

</Form>
</div>

</div>)


}