import React from 'react'

export default function JobTypeDropDrown(props) {
  return (
      <select  className='box-shadow-type-one' style={{borderRadius:'10px',width: props.width,paddingLeft:'10px',height:"40px"}} onChange={(e)=>{props.onChange(e.target.value)}} >
           <option disabled  selected>Working Type</option>
           <option>online</option>
           <option>offline</option>
      </select>
  )
}
