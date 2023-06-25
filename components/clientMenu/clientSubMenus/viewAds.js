import AdvertiesmentViewContainer from '@/components/advertiesmentViewContainer'
import { GET_ADVERTIESMENT_BY_CLIENT_ID } from '@/service/api-endpoints/advertiesment';
import { BASE_URL } from '@/service/network-configs/http/basicConfig';
import { httpGET, httpPOST } from '@/service/network-configs/http/service';
import { getUserCredentialsFromLocalStorage } from '@/util/storage';
import React,{useEffect,useState} from 'react'

export default function ViewAds() {
    const [data,setData] = useState();
    useEffect(()=>{

        async function  getAll(){
             const { access_token, refresh_token, userRole, userId }  = getUserCredentialsFromLocalStorage();
               console.log(access_token , " CCCCCCCCCCCC " ,  userId);
             const header = {
                  "userId" : userId,
                  "Authorization" : `Bearer ${access_token}`
             }
            const response = await httpGET(BASE_URL + GET_ADVERTIESMENT_BY_CLIENT_ID,header)
            console.log(response);
            if(response?.status === 200 ) {
                       console.log("response.data")
                       setData(response?.data)
            }else if (response?.status == 400){
                       notify(notifyStatus.ERROR,response.message)
            }else if (response?.status >= 403){
                notify(notifyStatus.ERROR,"ddd")
            }
            
        }
        getAll();
  
    },[]);
      

  return (
    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',height:'0px',margin:'10px'}}>
          
          {
            data?.map((details,index)=>{
                return(
                    <AdvertiesmentViewContainer from={details.startDate} to={details.endDate} title={details.title} description={details.description} key={index}/>
                )
            })
          }
    </div>
  )
}
