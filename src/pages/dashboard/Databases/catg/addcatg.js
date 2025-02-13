

import { useState } from "react"
import Loading from "../../../loading/loading";



import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



import '../../users/users.css'

import { Axios } from "../../../../api/axios";


import Alert from 'react-bootstrap/Alert';



export default  function Addcat(){

const [title,settitle]=useState('')
const [image,setimage]=useState('')
console.log(image)
const[loading,setloading]=useState(false);
const[show,setshow]=useState(false);
const[errtxt,seterrtxt]=useState('');
async function create(){
  const form = new FormData()
  form.append('title',title)
  form.append('image',image)
setloading(true);
    try {
      let res=
      await Axios.post('category/add',form)

      if(res.status===200){
        window.location.pathname='/dashboard/categories'
          setloading(false)


      }




    } catch (error) {
      setshow(true);
console.log(error)
        setloading(false);
        if(error.response.status===422){
          seterrtxt('File Type is invalid');
      }else{
          seterrtxt('Please Verify the inputs');
      }


    }
}


return(<div className="allparente">


    <div  className="edituserform">

<h2 style={{ textAlign:'start',width:'fit-content'}}>Create New Category</h2>
<p className="textw">Create a Category</p>
<hr></hr>
<hr></hr>
<Alert show={show} style={{display:'flex',alignItems:'center',justifyContent:'space-between'}} key={'danger'} variant={'danger'}>
    <div>   <i className="fa-regular fa-circle-xmark"></i>  {errtxt} </div> <Button  onClick={() => setshow(false)} variant="outline-sucsses">
       <i className="fa-solid fa-xmark"></i> </Button></Alert>

<Form style={{display:'flex',flexFlow:'column'}} >
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title"  name="title"  value={title}  onChange={e=>settitle(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control onChange={e=>setimage(e.target.files.item(0))} type="file" />

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