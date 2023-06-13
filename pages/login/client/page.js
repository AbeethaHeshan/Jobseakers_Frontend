import React,{useEffect,useState} from 'react'
import checkAuthentication from '@/components/HOC/WithAuth'
import { httpGET, httpPOST } from '@/service/network-configs/http/service'
import { BASE_URL } from '@/service/network-configs/http/basicConfig';
import { GET_CLIENT } from '@/service/api-endpoints/client';
import { getUserCredentialsFromLocalStorage } from '@/util/storage';
import Image from 'next/image';


const listData = [
    ["/images/svg/clientMenu/purple/1.svg","/images/svg/clientMenu/white/1.svg","Profile Info"],
    ["/images/svg/clientMenu/purple/2.svg","/images/svg/clientMenu/white/2.svg","Teams"],
    ["/images/svg/clientMenu/purple/3.svg","/images/svg/clientMenu/white/3.svg","Employees"],
    ["/images/svg/clientMenu/purple/4.svg","/images/svg/clientMenu/white/4.svg","Tasks"],
    ["/images/svg/clientMenu/purple/5.svg","/images/svg/clientMenu/white/5.svg","Advertiestments"],
]






 function Main() {

      const [selectedIndex, setSelectedIndex] = useState(0)
      const [selectedLabel, setSelectedLabel] = useState('Profile Info')

 useEffect(()=>{
     
    async function getClient(){

        //  const refresh_token = getUserCredentialsFromLocalStorage()?.refresh_token;
        //  const access_token = getUserCredentialsFromLocalStorage()?.access_token;
        //  const userId = getUserCredentialsFromLocalStorage()?.userId;
        //  const userRole = getUserCredentialsFromLocalStorage()?.userRole;
          const { access_token, refresh_token, userRole, userId } = getUserCredentialsFromLocalStorage();
          console.log(access_token ,userRole , userId);

         const headers = {
            'Authorization':`Bearer ${access_token}`,
            "userId":userId,
            "role":userRole,
         }

         const response =  await httpGET(BASE_URL+GET_CLIENT,headers);

         console.log(response);
     }

      getClient()

 },[])
  return (
    <div style={{display:'flex',flexDirection:'column',width:'100vW',height:'100vh',alignItems:'center'}}>
        <div className='box-shadow-type-one' style={{width:'100%',height:'45px',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
          <div style={{width:'90%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{height:'40px',display:'flex',flexDirection:'row',alignItems:'center',width:'100px',justifyContent:'space-between',columnGap:'15px'}}>
                        <Image src={"/images/logo.png"}  width={200}  height={8} style={{width:'100px',height:'13px'}} onClick={()=>router.push('/landing/page')}/>
                        <ul style={{display:'flex',flexDirection:'row',columnGap:'15px',fontSize:'14px'}}>
                          <li>Reposts</li>
                          <li>Messages</li>
                        </ul>

                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',columnGap:'10px'}}>
                    <label>Amal Namal </label>
                    <div style={{width:'35px',height:'35px',borderRadius:'100%',border:'2px solid gray',marginRight:'30px'}}/>
                </div>
          </div>
        </div>
         
        
        <div style={{width:'80vw',height:"95vh",display:'flex',alignItems:'end'}}>
             <div style={{width:'80vw',height:"85vh",display:'flex',flexDirection:'row',columnGap:'50px'}}>
                  <div style={{width:'250px',height:"85vh",display:'felx',flexDirection:'row'}}>
                       <ul style={{width:'100%' , display:'flex',flexDirection:'column',rowGap:'10px'}}>
                           {
                            listData.map((data,index)=>{
                                 const isSelected =  index === selectedIndex;
                               return(
                                <li key={index}>
                                  <div style={{width:'100%',height:'40px',position:'relative',backgroundColor:'#F2EFFE',cursor:'pointer'}}  
                                   onClick={(e)=>{ setSelectedIndex(index); setSelectedLabel(data[2])}}
                                  >
                                        <div style={{position:'absolute',left:'0',height:'100%',width:'4px',backgroundColor:'#6149D8',display:isSelected ? 'flex' : 'none'}}/>
                                        <div style={{display:'flex',flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-around',height:'100%'}}>
                                              <Image  src={isSelected ? data[0] : data[1]} width={22} height={8}/> 
                                              <label style={{color: isSelected ? '#6149D8' : '#97999D',fontFamily:'Inter',fontWeight:'500',fontSize:'14px',width:'100px'}}>{data[2]}</label>
                                        </div>
                                  </div>       
                                </li>
                               )
                            })
                           }
                       </ul>
                  </div>
                  <div style={{border:'2px solid #6149D8',width:'100%',height:"85vh",display:'felx',flexDirection:'row' ,borderRadius:'10px',position:'relative'}}>
                            <label style={{position:'absolute',left:'10px',top:'-37px',fontSize:'25px',fontFamily:'Inter',color:'#464755',fontWeight:'500'}}>{selectedLabel}</label>
                  </div>
             </div>
        </div>



    </div>
  )
}

export default checkAuthentication(Main);