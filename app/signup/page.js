"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/button';
import { useRouter } from 'next/navigation';

const data = [
    ["/images/signup/1.png" , "I’m a client,\nhiring for a project" , 'client'],  //"I’m a client,'\n'hiring for a project"
    ["/images/signup/2.png" , "I’m a freelancer,\nlooking for work ", 'employee']     //I’m a freelancer,'\n'looking for work
] 

export default function Index() {
    const router = useRouter();
    const [hover,setHover] = useState()
    const [selected, setSelected] = useState()
    const [selectedValue, setSelectValue] = useState("")
 
    const onChangeRoute = (value) => {
        switch (value) {
          case 'client':
            router.push('/signup/client');
            break;
          default:
            router.push('/signup/employee');
            break;
        }
      };

  return (
    <div>
       <div  style={{width:'100%',height:'50px',display:'flex',alignItems:'center',backgroundColor:'white'}}>
             <div style={{width:'100%',height:'40px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:'10px',paddingRight:'10px'}}>
                  <div style={{display:'flex',flexDirection:'row',height:'20px',alignItems:'center'}}>               
                         <Image src={"/images/logo.png"}  width={108}  height={8} style={{marginRight:'20px',position:'relative',top:'-1px'}}/>
                  </div>
             </div>
        </div>

        <div  style={{height:'92vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
              <div className='box-shadow-type-one' style={{height:'400px',width:'700px',borderRadius:'15px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly'}}>
               
                     <Image  src={"/images/signup/title.png"} width={300} height={50}/>

                    <ul style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',width:'80%',height:'200px',columnGap:'30px'}}>
                           {
                            data.map((details,index)=>{     

                                       const isActive = selected === index;
                                       const isHovered = hover === index  && !isActive;     
                                return(
                                    <li key={index}>
                                       <div className='box-shadow-type-one' style={{width:'200px',height:'150px',borderRadius:'15px',display:'flex',flexDirection:'column',alignItems:'center',padding:'14px',position:'relative',border: isActive ? "2px solid #6149D8": isHovered ? "2px solid #CCC4F0" : "" ,cursor:'pointer'}}
                                         onClick={()=>{setSelected(index); 
                                        
                                         setSelectValue(details[2])
                                         }}
                                         onMouseEnter={()=>{setHover(index)}}
                                         onMouseLeave={()=>{setHover(null)}}
                                        >
                                           <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:'10px',width:'80%'}}>
                                               <Image src={details[0]} width={55} height={10}/>
                                               <input type='radio' name='radioGroup'  style={{position:'relative',right:'-12px',top:'-8px'}}  checked={isActive ? "on" : ""} />
                                           </div>
                                           <p style={{width:'80%',lineHeight: '1',paddingLeft:'10px',color:'#464755',fontSize:'15px'}}>{details[1]}</p> 
                                       </div>
                                    </li>
                                )
                            })
                           }
                            
                     </ul>
                   
                    <div style={{width:'40%'}}>
                        <Button title={"Create Account"} width={"100%"} height={"35px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>onChangeRoute(selectedValue)} />
                    </div>
              </div>
        </div>

       

    </div>
  )
}


// position: absolute;
// right: -6px;
// bottom: 46px;
// margin: auto;