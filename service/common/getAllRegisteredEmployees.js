import { getUserCredentialsFromLocalStorage } from "@/util/storage";
import { GET_EMPLOYES_FOR_CLIENT } from "../api-endpoints/client";
import { BASE_URL } from "../network-configs/http/basicConfig";
import { httpGET } from "../network-configs/http/service";

 function filterEmployees(details){
        console.log(details)
    const arr =  new Array();
    details.map((data,index)=>{
    
            arr.push({
            name: data.name,
            userId:data.userId
        })       
    })   

    return arr;
  }

  



  function filterCatogaries(details){
    const arr =  new Array();
    details.map((data,index)=>{
        arr.push(data.jobRoleType)       
    }) 
    console.log(arr , " cccccccccccccccccc");
    return arr;

   }


  function allEmployees(details){
      return details;
  }


  export function getAvailaleEmployees(type,details){

         return  details.filter(detail => detail.jobRoleType === type).map(detail => ({ name: detail.name, userId: detail.userId }));

  } 

  export function getAvailaleEmployeesX(type,details){

    return  details.filter(detail => detail.jobRoleType === type).map(detail => detail);

} 

export async function  getEmployeesForClient(){

    const url = BASE_URL + GET_EMPLOYES_FOR_CLIENT;

    const { access_token, refresh_token, userRole, userId }  = getUserCredentialsFromLocalStorage();

    const headers = {
    'Content-Type': 'application/json',
    'userId': userId,
    'role':'EMPLOYEE'
    };

    const response = await httpGET(url,headers)

    if(response?.status === 200){

     filterEmployees(response.data);
     filterCatogaries(response.data);
     allEmployees(response.data);

     return {onlyEmployees:filterEmployees(response.data),onlyCatogaries:filterCatogaries(response.data),allEmployees:response.data}

    }else if(response?.status === 400){

    notify(notifyStatus.ERROR,"Failed  please try again")
    }else{
    notify(notifyStatus.ERROR,"Failed  please try again ")
    }

    }