import { useState } from "react"
import Loading from "../../../loading/loading";

import Spinner from 'react-bootstrap/Spinner';
import '../../users/users.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Axios } from "../../../../api/axios";
import { useParams } from "react-router-dom";




export default  function Editcatg(){

const[title,settitle]=useState('');
const[image,setimage]=useState('');
const[disable,setdiable]=useState(true);
const[loading,setloading]=useState(false);
const[loading2,setloading2]=useState(false);
const {id} =useParams();
useState(()=>{
setloading2(true);
    Axios.get('/category/'+id).then(data=>{

        settitle(data.data.title)


    }).then(()=>{setdiable(false);setloading2(false)}).catch(e=>{
        window.location.replace('/notfound')
    })
},[])
async function edit(){
  const form = new FormData()
  form.append('title',title)
  form.append('image',image)

setloading(true);
    try {
        await
        Axios.post('/category/edit/'+id,form);

       window.location.pathname='/dashboard/categories'

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
        <Form.Label>title</Form.Label>
        <Form.Control type="text" placeholder="title"  name="email"  value={title}  onChange={e=>settitle(e.target.value)} required />
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control onChange={e=>setimage(e.target.files.item(0))}  type="file" />

      </Form.Group>


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