import React,{useState} from 'react'

export default function TransparentScreen(props) {
  return (
    <div style={{position:'absolute',width:'130vh',height:'85vh',backgroundColor:'#FFFFFF',top:'0',bottom:'0',left:"0",right:'120px',margin:'auto',border:'2px solid #DFD7FF',borderRadius:'10px',display:props.visible ? 'flex' : 'none'}}>
         <div style={{backgroundImage:'url(/images/common/close.png)',width:'30px',height:'30px',backgroundPosition:'center',backgroundSize:'35px',borderRadius:"100%",backgroundRepeat:'no-repeat',cursor:'pointer',position:'absolute',right:'0',margin:'10px'}} onClick={()=>{props.onClick()}}/>
         {props.children}
    </div>
  )
}
