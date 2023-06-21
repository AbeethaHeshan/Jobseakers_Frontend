import React,{useState,useEffect} from 'react'
import Image from 'next/image'
export default function MenuButton(props) {
    const [isHover, setHover] = useState(false)
  return (
    <div  className='box-shadow-type-one'  style={{borderRadius:'10px',backgroundColor:isHover ? "#DFD7FF" : props.backgroundColor,width:'160px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',cursor:'pointer',border:'2px solid #DFD7FF'}}
      onMouseOver={()=>{setHover(true)}}
      onMouseLeave={()=>{setHover(false)}}
      onClick={()=>{props.onClick()}}
    >
                    <Image  src={props.imageUrl} width={50} height={10}  />
                    <label style={{fontFamily:'Inter',color:'#97999D',fontSize:'13px',fontWeight:'500'}}>{props.title}</label>
    </div>
  )
}
