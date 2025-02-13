import React from 'react'
import  {Button}  from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Axios } from '../../../api/axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Tdata({header,data,loading,type,handle}) {


const headerdata = header.map((item,i)=>{
  return( <TableCell>{item.name}</TableCell>)


})
async function handledelete(e){

  try {
    await
    Axios.delete('/'+type+'/delete?id='+e);
    handle(prev=>prev+1)

  } catch (error) {
    console.log(error);

  }

}

const datashow = data.map((item,key)=>{  return( <TableRow
  key={key}
  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
>
<TableCell  scope="row">
                {key+1}
              </TableCell>
              {header.map((item2,key2)=>
{ return    item2.id==='authority'?<TableCell key={key2} >USER</TableCell>: <TableCell key={key2} >{item[item2.id] } </TableCell> }

)}
              <TableCell style={{display:'flex',gap:'8px'}}>{
                
                type==='user'?<NavLink to={`/dashboard/user/${item.id}`}>
            <Button><i className="fa-solid fa-pencil"></i></Button></NavLink>:
                <NavLink to={`/editor/db/${item.id}`}>
            <Button><i className="fa-solid fa-pencil"></i></Button></NavLink>}

            <Button onClick={()=>handledelete(item.id)} variant="danger"><i className="fa-regular fa-trash-can"></i></Button>   </TableCell>





            </TableRow>)})






  return (

       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Id</TableCell>
          {headerdata}
          <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {!loading?
        ( datashow===0? <TableCell sx={{textAlign:"center"}} rowSpan={4} >
      No data found
        </TableCell>
        
        :  datashow) : <TableCell sx={{textAlign:"center"}}  scope="row" rowSpan={4}>
       Loading...
      </TableCell>}

        
        </TableBody>
      </Table>
    </TableContainer>
  
  )
}
