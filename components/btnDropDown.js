import {getAllJobTypes} from "@/redux/slices/asycncTunk/jobsSlice";

"use-client"
// import {useSelector} from "react-redux";
import React,{useEffect, useState} from 'react'
// import {actionTypes} from "@/redux/actionTypes/allActionTypes";
import {httpGET} from "@/service/network-configs/http/service";
import {BASE_URL} from "@/service/network-configs/http/basicConfig";
import {GET_ALL_JOB_TYPES} from "@/service/api-endpoints/jobs";
import { actionTypes } from "@/redux/actionTypes/allActionTypes";
import { notify, notifyStatus } from "@/util/notify";

export default function BtnDropDown(props) {

     const [data, setData] = useState([]);

     useEffect(()=>{

       async function  getAll(){
           const response = await httpGET(BASE_URL + GET_ALL_JOB_TYPES,'application/json')
          
           if(response.data.code === 200 ) {
                      console.log("response.data")
                      setData(response.data.data)
           }else if (response.data.code === 400){
                      notify(notifyStatus.ERROR,response.message)
           }else if (response.data.code === 403){
         
           }else{
                     notify(notifyStatus.ERROR,response.message)
           }
           
       }
       getAll();

   },[]);
  return (
    <select className='box-shadow-type-one' style={{borderRadius:'10px',width: props.width != null ? props.width : '100%',paddingLeft:'10px',height:"40px"}} onChange={(e)=>{props.onChange(e.target.value)}} >
             <option style={{fontSize:'12px' , width:'100%' , paddingLeft:'20px'}} >select type</option>
         { 
            data.map((item, index) => (
              <option style={{fontSize:'12px' , width:'100%' , paddingLeft:'20px'}} value={item}  key={index}>{item}</option>
            ))      
         }
    </select>
  )
}

