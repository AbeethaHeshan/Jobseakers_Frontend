import Image from 'next/image'
import React,{useState} from 'react'

export default function Dropdown({label,color}) {
    const [open, setOpen] = useState(false);
  return (
    <div style={{display:'flex',flexDirection:open ? 'column' : 'row'}}
         onMouseEnter={()=>setOpen(true)} 
         onMouseLeave={()=>setOpen(false)}
    >
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',cursor:'pointer',height:'20px'}}>
           <label style={{fontFamily:'Catamaran',fontSize:'15px',color:'#464755',marginRight:'5px'}}>{label}</label>
           <Image src={"/images/landing/3.png"} width={15} height={5}  className={`transition-transform duration-200  ${ open  ? 'transform rotate-180' : ''}`} />
      </div>   
      {
        open ? <div 
            style={{
                width: '100vw',
                height: '200px',
                border: '2px solid red',
                top:'35px',
                left:'0px',
                right:'0px',
                margin:'auto',
                position: 'absolute',
                backgroundColor: color,
                zIndex:'25'
            }}
      >
    
      </div> : ''
      }  
      
      


    </div>
  )
}
