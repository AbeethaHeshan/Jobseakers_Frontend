import React from 'react'

export default function TextField(props) {
    const inputStyle = {
        border: props.borderColor != null ? `2px solid ${props.borderColor}` : '1px solid #999',
        borderRadius:props.borderRadius!= null ? props.borderRadius : '100px',
        padding: '5px',
        width: props.width,
        height: props.height,
        border:'none',
        paddingLeft:'18px',
        paddingRight:'10px',
        
      };
    
  return (
    <input
      className='box-shadow-type-one'
      type="text"
      style={inputStyle}
      placeholder={props.placeholder}
    />
  )
}
