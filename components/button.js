import React from 'react'

export default function Button({title,width,height,backgroundColor,color,fontSize,onClick}) {
  return (
    <div
     onClick={onClick}
     style={{width:width,
                 height:height,
                 display:'flex',
                 justifyContent:'center',
                 alignItems:'center',
                 borderRadius:'20px',
                 backgroundColor:backgroundColor,
                 margin:'5px',
                 cursor:'pointer'}} >
         <label style={{color:color,fontSize: fontSize != null ? fontSize :'13px',cursor:'inherit'}}>{title}</label>
    </div>
  )
}


// style={{width:width,
//     height:height,
//     display:'flex',
//     justifyContent:'center',
//     alignItems:'center',
//     borderRadius:'20px',
//     backgroundColor:backgroundColor,
//     margin:'5px',
//     cursor:'pointer'}} >