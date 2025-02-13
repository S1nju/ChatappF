import React, { useContext } from 'react';
import { useState, useCallback, useMemo,useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { menu } from "../../../contex/hamburger.jsx";
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from "@codemirror/theme-one-dark";
import { sql } from "@codemirror/lang-sql";
import Entity from './Entity.jsx';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Edge from './Edge.jsx'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import './App.css'
import { Axios } from '../../../api/axios.jsx';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, useMediaQuery, useTheme } from '@mui/material';



 

 
export default function Reactflow() {
  let id =  window.location.pathname.split('/');
  let number = id[id.length - 1];
  const nodetype = useMemo(()=>({entitytable:Entity}),[])
  let initialNodes = []; 
   let {darklight,setdark} = useContext(menu);
  let initialEdges = [];
  const [nodes, setNodes] = useState(initialNodes); 
  const [edges, setEdges] = useState(initialEdges);
  const [edgesval, setEdgesval] = useState(0);
  const [selectededg, setselectededg] = useState({});
  const [isopen, setopen] = useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (ev,edg) => {
    setOpen2(true);
    setselectededg(edg)
    setEdgesval(edg.data.index)

  };

  const handleClose = () => {
    setOpen2(false);
  };
  const handleClose2 = () => {
    setOpen3(false);
  };
  useEffect(()=>{
    const s = async (params) => {
      try {
        let res = await Axios.get('/db/db?id='+number)
  
        if(res.data.id==null){
          window.location.pathname='/dashboard/dbs'
        }
      
       
        let tab= res.data.tables.map((i,k)=>{
  let obj ={
    id: ""+k,
    position: { x: (Math.random()*300), y: (Math.random()*200) },
    data:{
        title:i.name,
        pkey:{name:i.pkey,type:i.type},
        attribuetes:i.columns
            },
     type:"entitytable"
  }
  return obj
        })
   
     setNodes(tab)
     let edg = res.data.tables.flatMap((i, k) =>
      i.relationto.map((target) => ({
        id: `e${k}-${target.targetId}`,
        source: k.toString(), // Ensure the source is the node's actual ID (assume `i.id` exists)
        target: target.targetId.toString(), // Ensure target ID is a string
        type: 'custom-edge', // Add edge type (adjust based on your React Flow needs)
        animated: true,
        data:{index:target.relationType}// Enable animation
      }))
    );
             setEdges(edg)
             console.log(edg)
      } catch (e) { console.log(e)
  
      
      }
  
  }
 s();
  },[])
  const [navopen, setnavopen] = useState(false);
  const [forupdate, setforupdate] = useState(false);
  const [EntityForm,setEntityForm] =useState({
name:"",type:"",title:"",id:""
  });
  
const edgeTypes = {
  'custom-edge': Edge
}
  const [attr,setattr] =useState([]);
  const onConnect = useCallback(
    (params) => {const edge = { ...params, type: 'custom-edge',animated:true,data:{index:1} };
      return setEdges((eds) => addEdge(edge, eds))},
    [],
  );

  const onNodesChange = useCallback(
    (changes) => {
      return setNodes((nds) => applyNodeChanges(changes, nds))},
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => {
      return setEdges((eds) => applyEdgeChanges(changes, eds))},
    [],
  );
  const [textfileds,settextfileds]=useState([]);
  let addtextfiled = function(){
    textfileds.at(0)
   setattr([...attr,{name:"",type:""}])
  
        
      

  }
     const handlenodeupdate =(e,node)=>{
      setnavopen(true)
      setforupdate(true)
      let uvv=JSON.parse(JSON.stringify(node.data.attribuetes))
   
    uvv.forEach((i,el)=>{
      switch(i.type){
        case "varchar" :
          i.type= 10
          break;
          case "int" :
            i.type= 20
          break;
          case "float" :
            i.type= 30
          break;
          case "list" :
            i.type= 40
          break;
          case"char"  :
            i.type= 50
          break;
          default:
            i.type=""
            break;}})
          
     
  console.log(uvv)
      // Update the nodes state with the modified node
    
     
      let typeval;
      switch(node.data.pkey.type){
        case "varchar" :
          typeval= 10
          break;
          case "int" :
            typeval= 20
          break;
          case"float"  :
          typeval=30 
          break;
          case "list" :
          typeval= 40 
          break;
          case  "char":
          typeval= 50
          break;
          default:
            typeval=""
          
            break;}
    setEntityForm({
      name:node.data.pkey.name,type:typeval,title:node.data.title,id:node.id
    })
    
    setattr(uvv)
    
     }
     const deletenode = (e)=>{
    
        // Remove the node with the specified id
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== EntityForm.id));
    
        // Remove edges connected to the node
        setEdges((prevEdges) =>
          prevEdges.filter((edge) => edge.source !== EntityForm.id && edge.target !== EntityForm.id)
        );
        setforupdate(false)
      setnavopen(false)
      setEntityForm({name: "", type: "", title: "",id: ""})
      setattr([])
     }
     const updatenode = (e) => {
      let uv=JSON.parse(JSON.stringify(attr))
      uv.forEach((i,el)=>{
       switch(i.type){
         case 10 :
           i.type= "varchar"
           break;
           case 20 :
             i.type= "int"
           break;
           case 30 :
             i.type= "float"
           break;
           case 40 :
             i.type= "list"
           break;
           case 50 :
             i.type= "char"
           break;
           default:
             i.type=""
             setopen(true)
             return;
           
       }
       
     })
     let typeval;
  
     switch(EntityForm.type){
       case 10 :
         typeval= "varchar"
         break;
         case 20 :
           typeval= "int"
         break;
         case 30 :
         typeval= "float"
         break;
         case 40 :
         typeval= "list"
         break;
         case 50 :
         typeval= "char"
         break;
         default:
           typeval=""
           setopen(true)
           return;
           
     }
      
      const updatedNode = {
        id: EntityForm.id,  // Update the node with id '1'
        data:{
            title:EntityForm.title,
            pkey:{name:EntityForm.name,type:typeval},
            attribuetes:uv
                },
      
      };
  
      // Update the nodes state
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === updatedNode.id ? { ...node, ...updatedNode } : node
        )
      );setforupdate(false)
      setnavopen(false)
    };
  const handleChange = (e) => {
  

    setEntityForm((prevState) => ({
        ...prevState
          ,[e.target.name]: e.target.value,
        }
      ));
  };
  const handleChange2 = (e,i) => {
  
    let uv=[...attr];
  

uv[i][e.target.name]=e.target.value;

 console.log(attr);
setattr(uv);

  };
  const [saveAlert,setSavealgert]=useState(false);
  const [saveAlerts,setSavealgerts]=useState(false);
  const [Load,setload]=useState(false);
  const save = async() => {
  setload(true);
    try {
    let res = await Axios.get('/db/db?id='+number)
   if(res.status===200){
    if(res.data.id!=null){
      let db = res.data;

      db.tables= nodes.map((i,k)=>{
        const targetIds = edges
        .filter(edge => edge.source === i.id) // Filter edges with the specified source
        .map(edge => {return {targetId:edge.target,relationType:edge.data.index}});
        let obj ={
  name: i.data.title,
  pkey: i.data.pkey.name,
  type: i.data.pkey.type,
  columns:i.data.attribuetes,
  relationto: targetIds
        }
                    return obj
    })
     await Axios.put('/db/update',db)
setSavealgerts(true)
setload(false)
setTimeout(()=>{setSavealgerts(false)},2000);
    }
    else{
      setSavealgert(true)
      setload(false)
      setTimeout(()=>{setSavealgert(false)},2000);
    }}
    setload(false)
    } catch (error) {
      setSavealgert(true)
      setload(false)
      setTimeout(()=>{setSavealgert(false)},2000);
    
      
    }

  };
  let addnode = function(ine){
    if(EntityForm.name===""||EntityForm.type===""||EntityForm.title===""){
setopen(true)
    }else {
   let typeval;
  
      switch(EntityForm.type){
        case 10 :
          typeval= "varchar"
          break;
          case 20 :
            typeval= "int"
          break;
          case 30 :
          typeval= "float"
          break;
          case 40 :
          typeval= "list"
          break;
          case 50 :
          typeval= "char"
          break;
          default:
            typeval=""
            setopen(true)
            return;
            
      }
      let uv=[...attr]
     uv.forEach((i,el)=>{
      switch(i.type){
        case 10 :
          i.type= "varchar"
          break;
          case 20 :
            i.type= "int"
          break;
          case 30 :
            i.type= "float"
          break;
          case 40 :
            i.type= "list"
          break;
          case 50 :
            i.type= "char"
          break;
          default:
            i.type=""
            setopen(true)
            return;
          
      }
      
    })
   
    setNodes(e=>{
   
      let arr = [...e,{
        id: ""+(e.length) ,
        position: { x: (Math.random()*300), y: (Math.random()*200) },
        data:{
            title:EntityForm.title,
            pkey:{name:EntityForm.name,type:typeval},
            attribuetes:uv
                },
         type:"entitytable"
    }]
        
 
        setattr([]);
        setEntityForm({
          name:"",type:"",title:""
            });
        return arr
    })
   
  }}
  let deleteattribute = function(i){
    settextfileds(e=>{
         
         return  e.filter((_, index) => index !== i);
    })
    setattr(e=>{
         
      return  e.filter((_, index) => index !== i);
 })

  }

  let handleChange22=(e)=>{
    setEdgesval(e.target.value)



  }
  let handletypechange=()=>{
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id == selectededg.id
      ? { ...edge, data:{index:edgesval} }
          : edge
      )
    );
    
    setOpen2(false);
  }

const [dbtext,settdbtext]=useState('');
let transformtodb=()=>{
  let text ='';
  let text2=''
 
 nodes.forEach((item)=>{
  text+=`CREATE TABLE ${item.data.title.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")}\n (${item.data.pkey.name.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")} ${item.data.pkey.type.toLocaleUpperCase()}(**[INT_HERE]**) PRIMARY KEY \n`
  item.data.attribuetes.map((attri)=>{
text +=`,${attri.name.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")} ${attri.type.toLocaleUpperCase()}(**[INT_HERE]**) \n`

  })
  let consttext='';
  const targetIds = edges
        .filter(edge => edge.target === item.id) // Filter edges with the specified source
        .map(edge => {return {targetId:edge.source,relationType:edge.data.index}});
    
        targetIds.map((relation,k)=>{
   nodes.forEach((n)=>{
   if( n.id==relation.targetId){
  
if(relation.relationType==0||relation.relationType==1){
  text+=`,${n.data.pkey.name.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")} ${n.data.pkey.type.toLocaleUpperCase()}(**[INT_HERE]**)\n`
  consttext+=`,FOREIGN KEY(${n.data.pkey.name.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")}) REFERENCES ${n.data.title.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")}(${n.data.pkey.name.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")})\n`
}
if(relation.relationType==2){
  text2=`CREATE TABLE relation_${n.data.title.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")}_${item.data.title.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")}\n(${n.data.pkey.name.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")} ${n.data.pkey.type.toLocaleUpperCase()}(**[INT_HERE]**),\n${item.data.pkey.name.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")} ${item.data.pkey.type.toLocaleUpperCase()}(**[INT_HERE]**),\n PRIMARY KEY(${n.data.pkey.name.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")},${item.data.pkey.name.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")}),\nFOREIGN KEY(${n.data.pkey.name.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")}) REFERENCES ${n.data.title.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")}(${n.data.pkey.name.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")}),\nFOREIGN KEY(${item.data.pkey.name.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")}) REFERENCES ${item.data.title.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")}(${item.data.pkey.name.replace(/[\s;!@#$%^&*()+=\[\]{}:"'<>,.?/\\|-]/g, "_")}));`
}

   }

   })

  })
  text+= consttext+' );\n'
 }
)
text+=text2;

settdbtext(text);
setOpen3(true);
}









  return (
    <div className='content' style={{ height: '100vh' }}>



{saveAlerts&& <Alert style={{position:"absolute",top:"15%",right:'60%',zIndex:90}} severity="success">Save Success</Alert> }
{saveAlert&& <Alert style={{position:"absolute",top:"15%",right:'60%',zIndex:90}}  severity="error">Save Failed</Alert> }

      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handlenodeupdate}
        onEdgeClick={handleClickOpen}
        nodeTypes={nodetype}
        edgeTypes={edgeTypes}
    fitView
      > 
        <Background />
        <Fab color='primary'  onClick={save} sx={{
            position: 'fixed',
            bottom: 120,
            right: 23,
            zIndex:70
          }} size="small" aria-label="save">
            
 
        {Load? (
          <CircularProgress
           color="inherit"
           size={20}
          />
        ) :       <SaveIcon />}
  </Fab>
        <Fab color="primary" aria-label="add"     sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }} onClick={()=>setnavopen(true)}>
        <AddIcon />
      </Fab>
      <Fab color="primary" aria-label="add"     sx={{
          position: 'fixed',
          bottom: 75,
          right: 23,
        }} size="small" onClick={transformtodb}>
        <ChangeCircleIcon />
      </Fab>
       
        <Controls />
      
      </ReactFlow>
      <Dialog
        fullScreen={fullScreen}
        open={open3}
        onClose={handleClose2}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"THE SQL CODE FOR THIS ER"}
        </DialogTitle>
        <DialogContent>
        <CodeMirror
        value={dbtext}
        height="100%"
        extensions={[sql()]} // Enables SQL syntax highlighting
        onChange={(value) => settdbtext(value)}
        theme=
          { oneDark}
        
      />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose2}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen={fullScreen}
        open={open2}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Choose multiplicity for the edge"}
        </DialogTitle>
        <DialogContent>
          <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={edgesval}
          label="Type"
          name='type'
          onChange={handleChange22}
          size='small'
        >
          <MenuItem value={0}>1:n</MenuItem>
    
          <MenuItem value={1}>1:1</MenuItem>
          <MenuItem value={2}>n:n</MenuItem>
        </Select>
      </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handletypechange} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer open={navopen} 
         sx={{
          width: 300,          // Set fixed width here
          flexShrink: 0,       // Prevent the drawer from shrinking
          '& .MuiDrawer-paper': {
            width: 240,        // Set width of the paper element (the actual drawer)
            boxSizing: 'border-box',
          },
        }}
        onClose={()=>{setnavopen(false);setforupdate(false);setEntityForm({name:"",type:"",title:""});setattr([])}} >
      <div className='navedit'>
     <div style={{display:"flex",justifyContent:"space-between"}}><h4>Entity Editor</h4>  <Button  size="small"   variant="none" color="error" onClick={()=>{setnavopen(false);setforupdate(false);setEntityForm({name:"",type:"",title:""});setattr([])}}>
     <CloseIcon />
          </Button></div>   
      { isopen&& <Alert severity="error" onClose={() => {setopen(false)}}>
        Please Fill all fields with the right inputs
      </Alert>}
        <div>
      <TextField size="small" id="outlined-basic" label="Title" name='title' value={EntityForm.title} onChange={ handleChange} variant="outlined" /></div>
<div
style={{display:'flex',gap:'5px'}}>
  <TextField  id="outlined-basic" size="small" 
  label="PKey" name='name' value={EntityForm.name} 
  onChange={handleChange} variant="outlined" />

<FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={EntityForm.type}
          label="Type"
          name='type'
          onChange={handleChange}
          size='small'
        >
          <MenuItem value={10}>Varchar</MenuItem>
          <MenuItem value={20}>int</MenuItem>
          <MenuItem value={30}>float</MenuItem>
          <MenuItem value={40}>list</MenuItem>
          <MenuItem value={50}>char</MenuItem>
        </Select>
      </FormControl>
</div>
{attr.map((i,k)=>
     <div key={k} style={{display:'flex',gap:"10px",width:"100%"}}><TextField  size="small" id="outlined-basic" label="Attribute" name='name' 
        value={i.name}  onChange={(ev) => handleChange2(ev,k)}   variant="outlined" />
        
        <FormControl fullWidth  >
        <InputLabel  id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={i.type}
          label="Type"
          name='type'
          onChange={(ek) => handleChange2(ek,k)} 
          size='small'
          
          
        >
          <MenuItem value={10}>Varchar</MenuItem>
          <MenuItem value={20}>int</MenuItem>
          <MenuItem value={30}>float</MenuItem>
          <MenuItem value={40}>list</MenuItem>
          <MenuItem value={50}>char</MenuItem>
        </Select>
      </FormControl>
        <Button  size="small"  variant="outlined" color="error" onClick={()=>deleteattribute(k)}>
        <CloseIcon />
          </Button></div>
   
)}
<div><Button variant="contained" onClick={addtextfiled}>Add Atrribute</Button></div>
{forupdate?<div style={
  {
    display:"flex",
    gap:"10px",
  }
}><Button sx={{
  width:"50%"
}} variant="contained" onClick={updatenode}>update</Button> 
<Button 
 sx={{
  width:"50%"
}} 
variant="contained" color="error"onClick={deletenode}>Delete</Button></div>:<Button variant="contained" onClick={addnode}>Create Entity</Button>}
    </div>
    
      </Drawer>
    
  
    


    </div>
  );
}