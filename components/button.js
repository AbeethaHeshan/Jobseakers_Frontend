import React,{useState} from 'react'

export default function Button({title,width,height,backgroundColor,color,fontSize,onClick,disable}) {
   const [isHover, setHover] = useState(false)

  return (
    <button
     disabled = {disable=! null ? disable : 'false' }
     onClick={onClick}
     onMouseOver={()=>{setHover(true)}}
     onMouseLeave={()=>{setHover(false)}}
     style={{width:width,
                 height:height,
                 display:'flex',
                 justifyContent:'center',
                 alignItems:'center',
                 borderRadius:'20px',
                 backgroundColor:isHover ? "#5037D0" :  backgroundColor,
                 margin:'5px',
                 cursor:'pointer'}} >
         <label style={{color:color,fontSize: fontSize != null ? fontSize :'13px',cursor:'inherit'}}>{title}</label>
    </button>
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

