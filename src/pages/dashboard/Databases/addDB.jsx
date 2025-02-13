

import { useState } from "react"
import Loading from '../../loading/loading'

import '../users/users.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Axios } from "../../../api/axios";

import Alert from 'react-bootstrap/Alert';




export default  function AddDB(){

  const [form,setform]=useState({
  
    title:'',
    type:'',
})

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
      await Axios.post('db/save',form)

      if(res.status===200){
        window.location.pathname='/editor/db/'+res.data.id
          setloading(false)


      }




    } catch (error) {
      setshow(true);

        setloading(false);
        if(error.response.status===422){
          seterrtxt('name is already been taken');
      }else{
          seterrtxt('Please Verify the inputs');
      }


    }
}


return(<div className="allparente">


    <div  className="edituserform">

<h2 style={{ textAlign:'start',width:'fit-content'}}>Create New Database</h2>
<p className="textw">Create a Database and start editing</p>
<hr></hr>
<Alert show={show} style={{display:'flex',alignItems:'center',justifyContent:'space-between'}} key={'danger'} variant={'danger'}>
    <div>   <i className="fa-regular fa-circle-xmark"></i>  {errtxt} </div> <Button  onClick={() => setshow(false)} variant="outline-sucsses">
       <i className="fa-solid fa-xmark"></i> </Button></Alert>



       <Form.Select name="type"  onChange={check}  aria-label="Default select example" className="mb-3">
   <option  style={{fontWeight:'500'}}>Select Type</option>
   <option  style={{fontWeight:'500'}}>ORACLE</option>

   <option  style={{fontWeight:'500'}}>MYSQL</option>
   
   <option  style={{fontWeight:'500'}}>SQLITE</option>
   
   <option  style={{fontWeight:'500'}}>POSTGESQL</option>
    </Form.Select>
<Form style={{display:'flex',flexFlow:'column'}} >
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Title"  name="name"  value={form.name}  onChange={check} required />
      </Form.Group>


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