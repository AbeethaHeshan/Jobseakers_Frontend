
// http post method
import axios from "axios";
import {
    requestConfig,postRequestConfig,
    REQUEST_SUCCESS,
    REQUEST_SUCCESS_OTHER,
    REQUEST_UNAUTHORIZED,
    SERVER_ERROR,REQUEST_FORBIDDON
} from "./basicConfig";

import {actionTypes} from '@/redux/actionTypes/allActionTypes'
import { notify, notifyStatus } from "@/util/notify";

const responseData = {
    message : '',
    status : '',
    section:'',
    actionType:'',
    data:{}
}

export const httpPOST = async (url,data,contentType,headers) => {
     return  await axios.post(url,data,postRequestConfig(headers,contentType))
          
            .then((response) => {
                return  handleSuccessPath(response)
            })
            .catch((error) => {
                if(error.code === "ERR_NETWORK"){
                    notify(notifyStatus.ERROR,"check your internet connection")
                }else{
                    return  handleErrorPath(error)
                }
               
            })
}


export const httpPOSTFormData = async (url,data,contentType,headers) => {
    return  await axios.post(url,data,postRequestConfig(headers,contentType))
         
           .then((response) => {
               return  handleSuccessPath(response)
           })
           .catch((error) => {
               if(error.code === "ERR_NETWORK"){
                   notify(notifyStatus.ERROR,"check your internet connection")
               }else{
                   return  handleErrorPath(error)
               }
              
           })
}



export const httpGET = async (url,headers) => {

    return  await axios.get(url,requestConfig(headers))
        .then((response) => {
            return  handleSuccessPath(response)
        })
        .catch((error) => {
                return  handleErrorPath(error)
        })
}

const handleSuccessPath = (response) => {
     console.log(response.data , " res  ");
    if (response.status === REQUEST_SUCCESS || response.status === REQUEST_SUCCESS_OTHER) {
        responseData.message =  response?.data?.message
        responseData.status  =  response?.data?.code
        responseData.data    =  response?.data?.data
        responseData.actionType = actionTypes.SUCCESS_ACTION
        return responseData;
    } else {
        console.warn("RESPONSE ISSUE CHECK  service/networkConfigurations/http/service")
        return response.status
    }
}

const handleErrorPath = (error) => {
    console.log(error , " vvvvvv ");
    if (error?.response?.status === 400) {
        responseData.message = error.response.data.message
        responseData.status  = error.response.data.code
        responseData.data    = error.response.data.data
        responseData.actionType = actionTypes.FAILED_ACTION
        return  responseData

    } else if(error?.response?.status === REQUEST_UNAUTHORIZED){
       responseData.status = error.response.data.code
       responseData.data = error.response.data.data
       responseData.actionType = actionTypes.FAILED_ACTION
       responseData.message = error.response.data.message
       return  responseData

    }else if(error?.response?.status === REQUEST_FORBIDDON){
        responseData.status = error.response.data.code
        responseData.data = error.response.data.data
        responseData.actionType = actionTypes.FAILED_ACTION
        responseData.message = error.response.data.message
        return  responseData
 
     }
    else if(error?.response?.status === SERVER_ERROR){
        responseData.message = error.response.data.message
        responseData.status  = error.response.data.code
        responseData.data    = error.response.data.data
        responseData.actionType = actionTypes.FAILED_ACTION
        return responseData
    }

}
