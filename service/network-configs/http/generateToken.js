import { GENERATE_TOKEN } from "@/service/api-endpoints/auth"
import { BASE_URL } from "./basicConfig"
import { httpGET} from "./service"
import { headers } from "next/dist/client/components/headers"
import { getUserCredentialsFromLocalStorage } from "@/util/storage"
import { GET_CLIENT } from "@/service/api-endpoints/client"


export const generateToken = async () =>{

     const { access_token, refresh_token, userRole, userId } = getUserCredentialsFromLocalStorage();
     const headders = {
         "Authorization" : `Bearer ${refresh_token}` 
     }
     const response = await httpGET(BASE_URL+GENERATE_TOKEN,headders);
     console.log(response , " ccccccccccccccccc ");
     if(response?.status === 200){
        localStorage.clear();
        const credentials = {
            access_token : response.data.access_token,
            refresh_token : response.data.refresh_token,
            userRole : userRole,
            userId : userId
         }

        localStorage.setItem('user', JSON.stringify(credentials));

        return response?.status;

     } else if (response?.status === 400){
        return response?.status;
     }else if (response?.status === 401){
        return response?.status;
     }  

}