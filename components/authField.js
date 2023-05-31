import React from 'react'
import Image from 'next/image';
export default function AuthField(props) {
    const inputStyle = {
        border: '1px solid #999',
        borderRadius:props.borderRadius!= null ? props.borderRadius : '100px',
        padding: '5px',
        width: props.width,
        height: props.height,
        border:'none',
        paddingLeft:'30px',
        paddingRight:'10px',
      };
    
    
  return (
    <div style={{position:'relative'}}>
     
        <Image src={props.icon} width={20} height={5}  style={{position:'absolute',top:'0',left:"5px",bottom:'0',margin:'auto'}}/>
    
      <input
        className='box-shadow-type-one'
        type ={ props.type == "text"  ? "text" : "password"}
        style={inputStyle}
        placeholder={props.placeholder}
      
     />


    </div>
    
  
  )
}
