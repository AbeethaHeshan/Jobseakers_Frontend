"use client";
import Button from '../../components/button';
import Dropdown from '../../components/dropdown'
import TextField from '../../components/textField';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const nav = [
     ["red","Find Jobs"] ,
     ["green", 'Why Seekers']
]

export default function Landing() {
  const router = useRouter();

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
        <div className='headder' style={{width:'100%',height:'50px',display:'flex',alignItems:'center',backgroundColor:'white'}}>
             <div style={{width:'100%',height:'40px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:'10px',paddingRight:'10px'}}>
                  <div style={{display:'flex',flexDirection:'row',height:'20px',alignItems:'center'}}>               
                         <Image src={"/images/logo.png"}  width={108}  height={8} style={{marginRight:'20px',position:'relative',top:'-1px'}}/>
                       <ul style={{display:'flex',flexDirection:'row'}}>
                          {
                               nav.map((data,index)=>{  
                                  return(
                                       <li key={index} style={{marginLeft:'10px',marginRight:'10px'}} >
                                          <Dropdown
                                              label={data[1]}
                                              color={data[0]}  
                                          />
                                       </li>
                                  )
                               })
                          }
                       </ul>
  
                  </div>
                  <div style={{display:'flex',flexDirection:'row'}}>
                         <Button title={"Login"} width={"105px"} height={"28px"} color={"white"} backgroundColor={"#CCC4F0"} onClick={()=>{router.push('/login/page')}} />
                         <Button title={"SignUp"} width={"105px"} height={"28px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>{router.push('/signup/page')}} />
                  </div>
             </div>
        </div>
       
        <div style={{display:'flex',flexDirection:'row'}}>
               
          
              <div  style={{display:'flex',flexDirection:'row',width:'100vw',justifyContent:'space-around',alignItems:'center',height:'fit-content',position:'absolute',top:'0',left:'0',right:'0',bottom:'0',margin:'auto',columnGap:'20px',padding:'25px'}}>
                <div style={{padding:'40px'}}>
                    <h1 style={{fontFamily:'Catamaran', fontWeight:'800',fontSize:'65px',color:'#6149D8' , lineHeight:'15px'}}>Embrace freelance </h1>
                    <h2 style={{fontFamily:'Catamaran', fontWeight:'700',fontSize:"60px" , color:'#464755'}}>freedom and flexibility</h2>
                    <p  style={{fontFamily:'Catamaran', fontWeight:'600',fontSize:"18px" , color:'#464755'}}>Unlock your professional potential and thrive as a freelancer.</p>
                    <p  style={{fontFamily:'Catamaran', fontWeight:'600',fontSize:"18px" , color:'#464755',position:'relative',bottom:'6px'}}>Choose the path to excellence and unleash your entrepreneurial spirit in the freelance world.</p>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',columnGap:'10px',paddingTop:'20px'}}>
                            <TextField width={"300px"} height={"40px"} placeholder={"Find your job"} />
                            <Button title={"Find"} width={"110px"} height={"40px"} color={"white"} backgroundColor={"#6149D8"} fontSize={"20px"} />
                    </div>
                
                </div>
                <div style={{position:'relative'}}> 
                          <Image src={"/images/landing/1.png"} width={700}  height={100}/>                 
                          <Image src={"/images/landing/2.png"} width={400} height={100}  style={{position:'absolute',top:'40px',left:'0',right:'0',bottom:'0',margin:'auto'}}/>                 
                </div>
                  
                
              </div>

        </div>



    </div>   
  )
}
