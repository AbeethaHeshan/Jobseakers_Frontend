import React,{useEffect,useState} from 'react'
import checkAuthentication from '@/components/HOC/WithAuth'
import { httpGET, httpPOST } from '@/service/network-configs/http/service'
import { BASE_URL } from '@/service/network-configs/http/basicConfig';
import { GET_CLIENT } from '@/service/api-endpoints/client';

 function Main() {


 useEffect(()=>{
     
    async function getClient(){

         const refresh_token = getUserCredentialsFromLocalStorage()?.refresh_token;
         const access_token = getUserCredentialsFromLocalStorage()?.access_token;
         const userId = getUserCredentialsFromLocalStorage()?.userId;
         const userRole = getUserCredentialsFromLocalStorage()?.userRole;

        

         const headers = {
            "Authorization":`Bearer ${access_token}`,
            "userId":userId,
            "role":userRole,
           
         }

         const response =  await httpGET(BASE_URL+GET_CLIENT,headers);
     }

      getClient()

 },[])
  return (
    <div>
        client
    </div>
  )
}

export default checkAuthentication(Main);