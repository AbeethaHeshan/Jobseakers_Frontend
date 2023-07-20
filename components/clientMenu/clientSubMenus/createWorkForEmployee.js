import JobTypeDropDrown from '@/components/jobTypeDropDrown'
import TextField from '@/components/textField'
import Button from '@/components/button';
import React, {useState,useEffect,useRef} from 'react'
import JobRoleType from '@/components/jobRoleType';
import BtnDropDown from '@/components/btnDropDown';
import {BASE_URL} from "@/service/network-configs/http/basicConfig";
import {NEW_EMPLOYEE} from "@/service/api-endpoints/employee";
import {httpGET, httpPOST} from "@/service/network-configs/http/service";
import {notify, notifyStatus} from "@/util/notify";
import {CREATE_ADVERTIESMENT} from "@/service/api-endpoints/advertiesment";
import {getUserCredentialsFromLocalStorage} from "@/util/storage";
import {CONFIRM_PASSWORD} from "@/util/regXConstents";
import { CREATE_NEW_WORKS } from '@/service/api-endpoints/works';
import { GET_EMPLOYES_FOR_CLIENT } from '@/service/api-endpoints/client';
import { getAvailaleEmployees, getEmployeesForClient } from '@/service/common/getAllRegisteredEmployees';

export default function CreateWorks() {
    const [clientId, setClientId] = useState({value: '', bool: false});
    const [employeeId, setEmployeeId] = useState('');
    const [jobId, setJobId] = useState('');
    const [title, setTitle] = useState({value: '', bool: false});
    const [category, setCategory] = useState('');
    const [categoryType, setCategoryType] = useState('');
    const [description, setDescription] = useState({value: '', bool: false});
    const [docUrl, setDcUrl] = useState({value: '', bool: false});
    const [givenDate, setGivenDate] = useState('');
    const [deadline, setDeadline] = useState('');
    const [workStatus, setworkStatus] = useState('');
    const [isLoading,setLoading] = useState(false);
    const [catogaries,setCategorys] = useState([]);
    const [names,setNames] = useState([]);
    const [avaliableEmployees,setAvailableEmployees] = useState([]);
    const [allEmployees,setAllEmployees] = useState([]);
    const [all,setAll] = useState();
    const [selectedUser,setSelectedUser] = useState('');

    const fileInputRef3 = useRef(null);


    const handleFileChangeDoc = (event) => {
  
        try {
  
          const file = event.target.files[0];
          const fileUri = URL.createObjectURL(file);
          console.log('File URI:', fileUri);
  
          const fileUrl = URL.createObjectURL(file);
          setDcUrl({value:fileUri,bool:false});
          console.log("URL: ", fileUrl);
        } catch (err) {
          console.log(err);
        }
      };
  
      const handleClickDocUri = () => {
          fileInputRef3.current.click();
     };

     async function convertBlobURLToBlob(blobURL) {
        const response = await fetch(blobURL);
        const blob = await response.blob();
        return blob;
      }

    async function  postWork(){

        setLoading(prev => !prev)
        const { access_token, refresh_token, userRole, userId }  = getUserCredentialsFromLocalStorage();
        const adDetails = {

            "clientId": userId,
            "employeeId": selectedUser,
            "jobId":"",
            "workInfo":{
                 "title":title.value,
                 "category" : category,
                 "description":description.value,
                 "docUrl":"",
                 "docUrl":""
            },
            "givenDate": givenDate,
            "deadline": deadline,
            "workStatus": "Pending" ,

        };

        console.log(adDetails);

        const url = BASE_URL + CREATE_NEW_WORKS;

        const headers = {
         
        };
          
        const doc = await convertBlobURLToBlob(docUrl?.value)

        let bodyFormData = new FormData();
        bodyFormData.append("details", JSON.stringify(adDetails));
        bodyFormData.append("doc" , doc  , ".png");

        const response = await httpPOST(url,bodyFormData,'multipart/form-data',headers)

        if(response?.status === 200){
            setLoading(false)
              console.log(response.data);
            notify(notifyStatus.SUCCESS,"give new work to "+ selectedUser)

        }else if(response?.status === 400){
            setLoading(false)
            notify(notifyStatus.ERROR,"Failed  please try again XXXXXXXXXXX")
        }else{
            setLoading(false)
            notify(notifyStatus.ERROR,"Failed  please try again XXXXXXXXX")
        }

    }

    
  useEffect(()=>{
     
     //setAll(getEmployeesForClient())
     getEmployeesForClient().then((data)=>{
             console.log(data , "gggggggggggg");
             const{allEmployees,onlyCatogaries,onlyEmployees} = data ;
    
                 setAllEmployees(allEmployees)
                 setCategorys(onlyCatogaries);
                 setNames(onlyEmployees);

           // const{allEmployees,}
     }).catch((err)=>{
          console.log(err);
     })
    
   //  setCategorys(getEmployeesForClient().)

  },[])


    return (
        <div style={{
            width: '100vh',
            height: '80vh',
            position: 'absolute',
            left: '0',
            right: '0',
            margin: 'auto',
            top: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <label style={{fontFamily: 'Inter', fontSize: '20px'}}>Create New Work</label>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    rowGap: '10px',
                    margin: '10px',
                    justifyContent: 'center'
                }}>

                    <div style={{display: 'flex', flexDirection: 'column', rowGap: '10px', margin: '10px'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>Title</label>
                            <TextField
                                width={"420px"}
                                height={"40px"}
                                placeholder={""}
                                borderRadius={"10px"}
                                type={"text"}
                                value={title.value}
                                onChange={(e) => {
                                    setTitle({value: e.value, bool: e.bool})
                                }}/>
                        </div>
                        
            
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>Work Type</label>
                            <select className='box-shadow-type-one' style={{borderRadius:'10px',width:  '100%',paddingLeft:'10px',height:"40px"}} onChange={(e)=>{setAvailableEmployees(getAvailaleEmployees(e.target.value,allEmployees)); setCategory(e.target.value)}} >
                            <option style={{fontSize:'12px' , width:'100%' , paddingLeft:'20px'}} disabled selected >select type</option>
                                { 
                                    catogaries.map((item, index) => (
                                    
                                            <option style={{fontSize:'12px' , width:'100%' , paddingLeft:'20px'}} value={item}  key={index}>{item}</option>
                            
                                    ))      
                                }
                        </select>
                        </div> 




                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>AvailableUsers</label>
                            <select className='box-shadow-type-one' style={{borderRadius:'10px',width:  '100%',paddingLeft:'10px',height:"40px"}} onChange={(e)=>{ setSelectedUser(e.target.value)}} >
                                <option style={{fontSize:'12px' , width:'100%' , paddingLeft:'20px'}} disabled selected >select type</option>
                                { 
                                     avaliableEmployees.map((item, index) => (
                                         <option style={{fontSize:'12px' , width:'100%' , paddingLeft:'20px'}} value={item.userId}  key={index}>{item.name}</option>
                                     ))      
                                }  
                            </select>
                        </div> 
                        

                        

                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', rowGap: '10px', margin: '10px'}}>
                         <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}> Description </label>
                            <TextField
                                width={"420px"}
                                height={"40px"}
                                placeholder={""}
                                borderRadius={"10px"}
                                type={"text"}
                                onChange={(e) => {
                                    setDescription({value: e.value, bool: e.bool})
                                }}
                                value={description.value}
                            />
                         </div>

                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>Given Date </label>
                            <input type='date' style={{width: '420px', borderRadius: '10px', height: '45px'}}
                                className='box-shadow-type-one' placeholder='date of birth' value={givenDate}
                                onChange={(e) => {
                                    setGivenDate(e.target.value)
                                }}/>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>Deadline</label>
                            <input type='date' style={{width: '420px', borderRadius: '10px', height: '45px'}}
                                className='box-shadow-type-one' placeholder='date of birth' value={deadline}
                                onChange={(e) => {
                                    console.log(e)
                                    setDeadline(e.target.value)
                                }}/>
                        </div>
                    </div>


             
                
                </div>

                <div className='box-shadow-type-two'  style={{height:'70px',width:'80%',borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>

                            <div style={{width:'90%',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',columnGap:'5px'}}>
                                    <div style={{width:'50px',
                                                height:'50px',
                                                borderRadius:'100%',
                                                borderWidth:'2px',
                                                backgroundImage:`url(${docUrl.value})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'}}/>
                                    <Button title={"Upload Document"} width={"50%"} height={"35px"} color={"white"} backgroundColor={"#8B7AE0"} onClick={()=>handleClickDocUri()} type={'submit'} />
                                </div>

                                <input
                                    id="fileInputDoc"
                                    ref={fileInputRef3}
                                    type="file"
                                    onChange={handleFileChangeDoc}
                                    accept="image/png, image/jpeg"
                                    style={{ display: 'none' }}
                                />

               </div>
                <div style={{margin:'10px'}}/>

                <Button title={"Create Work"} width={"40%"} height={"35px"} color={"white"}
                        backgroundColor={"#6149D8"} onClick={()=>{
                            postWork();
                        }}
                />

            </div>
        </div>
    )
}


// String title;
// String period;
// String workingType;
// double hourlyRate;
// String experienceLevel;
// String clarification;
// String description;
// LocalDate startDate;
