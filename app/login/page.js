"use client";
import React from 'react'
import Image from 'next/image'
import Button from '@/components/button'
import TextField from '@/components/textField';
import AuthField from '@/components/authField';

export default function Login() {
  return (
    <div>
       <div  style={{width:'100%',height:'50px',display:'flex',alignItems:'center',backgroundColor:'white'}}>
             <div style={{width:'100%',height:'40px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:'10px',paddingRight:'10px'}}>
                  <div style={{display:'flex',flexDirection:'row',height:'20px',alignItems:'center'}}>               
                         <Image src={"/images/logo.png"}  width={108}  height={8} style={{marginRight:'20px',position:'relative',top:'-1px'}}/>
                  </div>
                  <div style={{display:'flex',flexDirection:'row'}}>
                       <Button title={"SignUp"} width={"105px"} height={"28px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>{router.push('/login')}} />
                  </div>
             </div>
        </div>

        <div style={{height:'92vh'}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
                  <Image src={"/images/login/1.png"}  width={600} height={500} />
                  <div className='box-shadow-type-two' style={{position:'absolute',top:'0',left:'0',right:'0',bottom:'0',margin:'auto',width:'350px',height:'400px',backgroundColor:'white',borderRadius:'15px'}}>
                         <div style={{width:'inherit',height:'inherit',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around'}}>
                            <div style={{display:'flex',flexDirection:'row',height:'20px',alignItems:'center'}}>               
                                <Image src={"/images/logo.png"}  width={135}  height={8} style={{paddingTop:'40px'}} />
                            </div>
                            <div style={{display:'flex',flexDirection:'column',height:'100px',justifyContent:'space-between',position:'relative',top:'30px'}}>
                              <AuthField width={"300px"} height={"45px"} placeholder={"username"} borderRadius={"10px"} type={"text"} icon={"/images/login/3.png"} />
                              <AuthField width={"300px"} height={"45px"} placeholder={"password"} borderRadius={"10px"} type={"password"}  icon={"/images/login/2.png"}/>
                              <label style={{fontSize:'13px',position:'absolute',bottom:'-25px',right:'0',}}>forgot password ?</label>
                            </div>
                             
                             <div style={{height:'100px',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',position:'relative',bottm:'20px'}}>
                                <Button title={"login"} width={"80%"} height={"35px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>{router.push('/login')}} />
                             </div>
                         </div>   
                  </div>
            </div>
            

        </div>
    </div>
  )
}
