import { GET_WORKKS_BY, MARK_AS_READ } from '@/service/api-endpoints/works';
import { getAvailaleEmployeesX, getEmployeesForClient } from '@/service/common/getAllRegisteredEmployees';
import { BASE_URL } from '@/service/network-configs/http/basicConfig';
import { httpGET } from '@/service/network-configs/http/service';
import { notify, notifyStatus } from '@/util/notify';
import { getUserCredentialsFromLocalStorage } from '@/util/storage';
import Image from 'next/image';
import React, {useState,useEffect} from 'react'

const status = [

]

const filterStatus = [
     "Submitted","Pending","Cancel","Read"
]

export default function EmployeeView() {
      const[allEmployees,setAllEmployees] = useState([]);
      const[category,setCategorys] = useState([]);
      const[name,setNames] = useState([]);
      const[selectedRole,setSelectedRole] = useState('All');
      const[dropDownStatus,setDropDownButtonStatus] = useState(false);
      const[selectedStatus,setSelectedStatus] = useState('');
      const[details,setDetails] = useState({});
      const[filterStatusValue,setFilterStatusValue] = useState('All');
      const[respDetails,setRespDetails] = useState([]);
      const[hideButton,setHideButton] = useState(false);
      const[workId,setWorkId] = useState('');
      
    
      async function  getAll( de , fs){

        const { access_token, refresh_token, userRole, userId }  = getUserCredentialsFromLocalStorage();
          console.log(access_token , " CCCCCCCCCCCC " ,  userId);
        const header = {
             "userId" : userId,
             "catogary":de,
             "status" :fs 
    
        }
        console.log(header , "ggg ");
        const response = await httpGET(BASE_URL + GET_WORKKS_BY,header)
        console.log(response);
        if(response?.status === 200 ) {
                 //   console.log("response.data")
                 setRespDetails(response?.data?.employeClientData)
                   // setData(response)
        }else if (response?.status == 400){
                //  notify(notifyStatus.ERROR,response.message)
        }else if (response?.status >= 403){
            notify(notifyStatus.ERROR,"ddd")
        }
   }
  
   async function setAsRead(){

                    const header = {
                            "jobId" : workId,
                    }
                    const response = await httpGET(BASE_URL + MARK_AS_READ,header)
                    console.log(response);
                    if(response?.status === 200 ) {
                            notify(notifyStatus.INFO,"Submitted work read")
                            getAll("All","All")
                    }else if (response?.status == 400){
                              notify(notifyStatus.ERROR,response.message)
                    }else if (response?.status >= 403){
                        notify(notifyStatus.ERROR,"ddd")
                    }
                            
   }
   
    function getEmployees(){
        getEmployeesForClient().then((data)=>{
            const{allEmployees,onlyCatogaries,onlyEmployees} = data ;
   
                setAllEmployees(allEmployees)
                setCategorys(onlyCatogaries);
                setNames(onlyEmployees);
        
       }).catch((err)=>{
         console.log(err);
       })
    }


    useEffect(()=>{
      
        getEmployees();
   
     },[])


     function statusColor(status){
         switch(status){
            case "Pending" : return "#F89028";
            case "Accept"  : return  "#34F547";
            case "Submitted"  : return  "#34F547";
            case "Read"  : return  "blue";
            case "Cancel"  : return  "#F42725";
            default : return "#5037D0"
         }
     }

    return(

      <div style={{ width:'100%',height:'100%'}}>

                <div style={{width:'100%',height:"50px",marginTop:'10px'}}>
                        
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <select className='box-shadow-type-one' style={{borderRadius:'10px',width:  '15%',paddingLeft:'10px',height:"40px",margin:'10px'}} onChange={(e)=>{
                                
                                   setSelectedRole(e.target.value);

                                   if(e.target.value === "All"){
                                       getEmployees();
                                   }else{
                                        getEmployeesForClient().then((data)=>{
                                            const{allEmployees,onlyCatogaries,onlyEmployees} = data ;
                                
                                                setAllEmployees(allEmployees)
                                                setAllEmployees(getAvailaleEmployeesX(e?.target?.value,allEmployees))
                                        
                                    }).catch((err)=>{
                                        console.log(err);
                                    })
                                    

                                   }  

                             }} >
                                   <option style={{fontSize:'12px' , width:'20%' , paddingLeft:'20px'}} value={"All"} selected>All</option>
                                { 
                                     category.map((item, index) => (
                                         <option style={{fontSize:'12px' , width:'100%' , paddingLeft:'20px'}} value={item}  key={index}>{item}</option>
                                     ))      
                                }  
                            </select>

                        </div> 
                </div>
                <div className='box-shadow-type-two' style={{ width:'100%',height:"90%",marginTop:'10px',display:'flex',flexDirection:'row'}}>
                       <div style={{ width:'50%',height:"100%",marginTop:'10px',display:'flex',flexDirection:'column',overflowY:'scroll',alignItems:'center'}}>
                             
                            

                             {
                                allEmployees?.map((data,index)=>{
                                      console.log(data , " vvvvvv ");
                                    return(
                                        <div className='box-shadow-type-two' style={{ width:'300px',height:"90px",marginTop:'10px',display:'flex',flexDirection:'row',borderRadius:'10px',alignItems:'center'}} onClick={()=>{setDetails(data);setHideButton(data?.workStatus === "Submitted");setWorkId(data?.jobId)}}>
                                              <div style={{display:'flex',flexDirection:'column',width:"80%"}}>
                                                  <div style={{ width:'100%',height:"30px",marginTop:'10px',display:'flex',flexDirection:'column',paddingLeft:'20px'}}>
                                                    <label style={{fontSize:'20px',fontWeight:'500'}}>{data.name}</label>   
                                                  </div>
                                                <div style={{width:'100%',height:"30px",marginTop:'10px',display:'flex',flexDirection:'column',justifyContent:"space-between",alignItems:'center'}}>                                      
                                                         <label>{data.jobType}</label>  
                                                </div>

                                              </div>

                                                <div  style={{width:'50px',height:'50px',borderRadius:'100%',backgroundSize: 'cover',backgroundPosition: 'center', backgroundImage:`url(data:image/png;base64,${data?.profileImageUri})`}}  />  
                                         </div>
                                    )
                                })
                             }

                       </div>

                       <div  style={{ width:'600px',height:"100%",marginTop:'10px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                        <div className='box-shadow-type-one' style={{width:'80%',height:'80%',display:'flex',flexDirection:'column'}}>
                                                 <div style={{height:'50px',width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                           <label style={{fontSize:'20px',fontWeight:'500'}}>{details?.workInfo?.title}</label>
                                                 </div>
                                                 <div style={{height:'80%',display:'flex',flexDirection:'column',width:'100%',alignItems:'center'}}>
                                                       <div>
                                                           <label>{details?.workInfo?.description}</label>
                                                       </div>
                                                       <div style={{width:"70%",display:'flex',flexDirection:'row',columnGap:'100px'}}>
                                                               
                                                                     <div style={{width:'100px',display:"flex",alignItems:'center',flexDirection:'column'}}>
                                                                   
                                                                        <div style={{width:'100px',height:'100px',backgroundSize: 'cover',backgroundPosition: 'center', backgroundImage:`url(data:image/png;base64,${details?.workInfo?.docUrl})`}}/>

                                                                        
                                                                         {details?.workInfo?.docUrl != null ?  <label>Task</label> : ''}
                                                                     </div>
                                                                
                                                                      <div style={{width:'100px',display:"flex",alignItems:'center',flexDirection:'column'}}>
                                                                   
                                                                         <div style={{width:'100px',height:'100px',backgroundSize: 'cover',backgroundPosition: 'center', backgroundImage:`url(data:image/png;base64,${details?.workInfo?.docUrl2})`}}/>         
                                            
                                                                         {details?.workInfo?.docUrl2 != null ?  <label>submitted</label> : ''}
                                                                     </div>
                                                       </div>

                                                      {details?.employeeName != null && <div style={{display:'felx',flexDirection:'column',alignSelf:'flex-start',margin:'10px',width:"400px"}}>
                                                               
                                                                   <div style={{display:'flex',flexDirection:'row',columnGap:'10px',margin:'10px'}}>
                                                                     <lable>deadline : </lable>
                                                                     <lable>{details?.deadline}</lable>
                                                                   </div> 
                                                                
                                                               
                                                                   <div style={{display:'flex',flexDirection:'row',columnGap:'10px',margin:'10px'}}>
                                                                     <lable>submittedDate : </lable>
                                                                     <lable>{details?.submittedDate}</lable>
                                                                   </div> 

                                                                   <div style={{display:'flex',flexDirection:'row',columnGap:'10px',margin:'10px'}}>
                                                                     <lable>employeeName : </lable>
                                                                     <lable>{details?.employeeName}</lable>
                                                                   </div> 

                                                                   <div style={{display:'flex',flexDirection:'row',columnGap:'10px',margin:'10px'}}>
                                                                     <lable>jobId  : </lable>
                                                                     <lable>{details?.jobId}</lable>
                                                                   </div> 

                                                       </div>}

                                                 </div>
                                                <div style={{display:'flex',flexDirection:'column',alignSelf:'flex-end',position:'relative'}}>                 
                                                                <div style={{width:'150px',height:'40px',display:'flex',borderRadius:'10px',margin:"10px"}}>
                                                                        <div style={{backgroundColor:'#5037D0',width:'80%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',borderRightColor:'2px solid #FFFFFF',borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px',cursor:'pointer'}} onClick={()=>{
                                                                    
                                                                            if(hideButton){
                                                                                setAsRead()
                                                                            }else{
                                                                                notify(notifyStatus.ERROR,"This Work Not Submitted")
                                                                            }
                                                                        }}>
                                                                                    <label style={{fontSize:'12px',fontWeight:'500',color:'white'}}>Mark As Read</label>
                                                                        </div>
                                                                        <div style={{width:'20%',height:'100%',backgroundColor:'#6149D8',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',borderTopRightRadius:'10px',borderBottomRightRadius:'10px'}} onClick={()=>{setDropDownButtonStatus(prev=>!prev)}}>
                                                                            <Image src={"/images/common/arrowDown.png"} width={20} height={20}/>
                                                                        </div>
                                                    
                                                                </div>
                                                                    {
                                                                        dropDownStatus ?   
                                                                            <div style={{width:'200px',display:'flex',flexDirection:'column',backgroundColor:'#CCC4F0',bottom:'0'}}>
                                                                                {
                                                                                    status.map((data,index)=>{
                                                                                
                                                                                        return(
                                                                                            <div style={{border:'2px solid white',height:"20px",display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} onClick={()=>{ setSelectedStatus(data)  ;setDropDownButtonStatus(prev=>!prev)}}> 
                                                                                                <label>{data}</label>           
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }


                                                                            </div>
                                                                        : ""
                                                                    }

                                                 </div> 
                                                

                                         </div>
                          

                       </div>


                </div>



      </div>
    )
 
}