"use client";
import React,{useEffect, useState} from 'react'
import Image from 'next/image'
import Button from '../../components/button'
import TextField from '../../components/textField';
import AuthField from '../../components/authField';
import { useRouter } from 'next/navigation';
import { httpGET, httpPOST } from '@/service/network-configs/http/service';
import { BASE_URL } from '@/service/network-configs/http/basicConfig';
import { AUTH } from '@/service/api-endpoints/auth';
import Loarder from '@/components/Loarder';
import Toaster from '@/components/Toaster';
import { headers } from 'next/dist/client/components/headers';
import { notify, notifyStatus } from '@/util/notify';
import Cookies from 'js-cookie';
import { GET_CLIENT } from '@/service/api-endpoints/client';
import { getUserCredentialsFromLocalStorage } from '@/util/storage';
export default function Login() {
  const router = useRouter();
   const [userName, setUserName] = useState({value:'',bool:false});
   const [password, setPassword] = useState({value:'',bool:false});
   const [isLoding, setLoading] = useState(false);
   
   async function login(){
           setLoading(true)
       const data = JSON.stringify({
          "username" : userName.value,
          "password" : password.value
      })

      const headers = {
         'Content-Type': 'application/json', 
      }
      const response =  await httpPOST(BASE_URL+AUTH , data, 'application/json',headers);   
      
      if(response?.status === 200){
        console.log(response.data);
        setLoading(false);
        if(response?.data?.userRole === "EMPLOYEE"){
              
              
             const credentials = {
                access_token : response.data.access_token,
                refresh_token : response.data.refresh_token,
                userRole : response.data.userRole,
                userId : response.data.userId
             }
              
            localStorage.setItem('user', JSON.stringify(credentials));

            Cookies.set("user", credentials, { expires: 7 });  //  expires in 7 days
           
             router.replace("/login/employee/page")
        }else if (response?.data?.userRole === "CLIENT"){
              console.log("CLIENT LOG");
              const credentials = {
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token,
                userRole: response.data.userRole,
                userId: response.data.userId
              };
        
              let headers = {
                'Authorization': `Bearer ${credentials.access_token}`,
                "userId": credentials.userId,
                "role": credentials.userRole,
              };
        
              const clientResponse = await httpGET(BASE_URL + GET_CLIENT, headers);

              if (clientResponse?.status === 200) {
                localStorage.setItem('user', JSON.stringify(credentials));
                Cookies.set("user", credentials, { expires: 7 });
                router.replace("/login/client/page");
              } else {
                setLoading(false);
                localStorage.clear();
                notify(notifyStatus.INFO, response.message);
              }

        }
      }else if(response?.status >= 400){
              setLoading(false);
              localStorage.clear();
              notify(notifyStatus.ERROR,"Failed to login; Try again ")
          
      }else{
              setLoading(false);
              localStorage.clear();
              notify(notifyStatus.ERROR,"Failed to login; Try again ")
                 
      } 
  }
   useEffect(()=>{     
    localStorage.clear();
   },[])

  return (
    <div>
       <div  style={{width:'100%',height:'50px',display:'flex',alignItems:'center',backgroundColor:'white'}}>
             <div style={{width:'100%',height:'40px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:'10px',paddingRight:'10px'}}>
                  <div style={{display:'flex',flexDirection:'row',height:'20px',alignItems:'center'}}>               
                         <Image src={"/images/logo.png"}  width={108}  height={8} style={{marginRight:'20px',position:'relative',top:'-1px'}} onClick={()=>router.push('/landing/page')}/>
                  </div>
                  <div style={{display:'flex',flexDirection:'row'}}>
                       <Button title={"SignUp"} width={"105px"} height={"28px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>{router.push('/signup/page')}} />
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
                              <AuthField width={"300px"} height={"45px"} placeholder={"username"} borderRadius={"10px"} type={"text"} icon={"/images/login/3.png"} margin={"10px"}   onChange={(e)=>{setUserName({...userName,value:e.value,bool:e.bool})}} />
                              <AuthField width={"300px"} height={"45px"} placeholder={"password"} borderRadius={"10px"} type={"password"}  icon={"/images/login/2.png"}  margin={"10px"} onChange={(e)=>{setPassword({...password,value:e.value,bool:e.bool})}}/>
                              <label style={{fontSize:'13px',position:'absolute',bottom:'-42px',right:'12px',}}> forgot password ? </label>
                            </div>
                             
                             <div style={{height:'100px',width:'100%',display:'flex',  justifyContent:'center',alignItems:'center',position:'relative',bottm:'20px'}}>
                                <Button title={"login"} width={"80%"} height={"35px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>{login()}} />
                             </div>
                         </div>    
                  </div>
            </div>
            

        </div>
        <Loarder visible={isLoding}/>
        <Toaster/>
    </div>
  )
}
