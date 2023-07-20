import React from 'react'
import { Oval } from 'react-loader-spinner'

export default function Loarder({visible}) {

  return (
    <div style={{position:'absolute',height:'100%',boder:'2px solid red',display: visible ? 'flex' : 'none',justifyContent:'center',alignItems:'center',backgroundColor:'#00000035',width:'100%',top:'0',left:'0',right:'0',bottom:'0',margin:'auto',zIndex:'50'}} >
           <div style={{width:'12vw',height:'10vh',backgroundColor:'white',borderRadius:'10px',boder:'2px solid red',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Oval
                        height={35}
                        width={35}
                        color="#6149D8"
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#CCC4F0"
                        strokeWidth={3}
                        strokeWidthSecondary={3}
                    />
                    <label>Please wait ....</label>
           </div>
    </div>
  )
}
