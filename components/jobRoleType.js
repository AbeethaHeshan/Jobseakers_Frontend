import { GET_ALL_CATAGORY_TYPES, GET_ALL_CATAGORY_TYPES_BY_SERVICE_TYPE } from '@/service/api-endpoints/jobs';
import { BASE_URL } from '@/service/network-configs/http/basicConfig';
import { httpGET, httpPOST } from '@/service/network-configs/http/service';
import React,{useState,useEffect} from 'react'

export default function JobRoleType(props) {

    const [data, setData] = useState([]);
    useEffect(()=>{

      async function  getAll(){

          const value = props.catogary;
          const parm = GET_ALL_CATAGORY_TYPES_BY_SERVICE_TYPE + `?catogary=${value}`

          const response = await httpPOST(BASE_URL + parm,'application/json')
          console.log(response);
          if(response?.status === 200 ) {
                     console.log("response.data")
                     setData(response?.data)
          }else if (response?.status >= 400){
                     //notify(notifyStatus.ERROR,response.message)
          }else if (response?.status >= 403){

          }

      }
      getAll();

  },[props]);
 return (
   <select className='box-shadow-type-one' style={{borderRadius:'10px',width: props.width != null ? props.width : '100%',paddingLeft:'10px',height:"40px"}} onChange={(e)=>{props.onChange(e.target.value)}} >
            <option style={{fontSize:'12px' , width:'100%' , paddingLeft:'20px'}} disabled selected >Select Job Role</option>
        {
           data.map((item, index) => (
             <option style={{fontSize:'12px' , width:'100%' , paddingLeft:'20px'}} value={item}  key={index}>{item}</option>
           ))
        }
   </select>
 )
}
