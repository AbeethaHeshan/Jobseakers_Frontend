import React from 'react'

export default function AdvertiesmentViewContainer(props) {
  return (
    <div key={props.key} className='box-shadow-type-one'  style={{width:'300px',margin:'10px',display:'flex',flexDirection:'column',borderRadius:'10px',padding:'5px',backgroundColor:'#F2EFFE',border:'2px solid #DFD7FF',cursor:'pointer'}}>
    <div style={{width:'90%',display:"flex",flexDirection:'row',justifyContent:'space-between',margin:'5px',alignSelf:'center'}}>
           <label style={{fontSize:'12px',fontFamily:'Catamaran',color:'#97999D'}}>From : {props.from}</label>
           <label style={{fontSize:'12px',fontFamily:'Catamaran',color:'#97999D'}}>To : {props.to}</label>
    </div>
    <div style={{width:'90%',display:"flex",justifyContent:'center',alignSelf:'center'}}>
         <lable style={{fontSize:'14px',fontFamily:'Catamaran',color:'#464755'}}>{props.title}</lable>
    </div>
    <div style={{width:'90%',display:"flex",justifyContent:'center',alignSelf:'center'}}>
         <p style={{ wordWrap: 'break-word', width: '200px',fontSize:'12px',fontFamily:'Catamaran',lineHeight:'1' ,color:'#464755'}}>{props.description}</p>
    </div>
</div>

  )
}
