import React from 'react'

export default function TextGroupContainer(props) {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'start',lineHeight:'1.1'}}>
        <div style={{display:'flex',flexDirection:'row',width:props.width != null ? props.width : '300px',justifyContent:'space-between',alignItems:'center'}}>
        <label style={{fontSize:'18px',color:'#464755',fontWeight:'500',fontFamily:'Inter'}}>{props?.topic}</label>
        <label style={{fontSize:'14px',color:'#6149D8',fontWeight:'400',fontFamily:'Inter',width:'40px'}} onClick={()=>{}}>Edit</label>
        </div>  
        <label style={{fontSize:'15px',color:'#858383',fontWeight:'400',fontFamily:'Inter'}}>{props?.subTopic}</label>
    </div>
  )
}
