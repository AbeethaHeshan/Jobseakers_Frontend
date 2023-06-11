"use client"
import React,{useState,useRef, useEffect} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from '../../../components/button';
import TextField from '../../../components/textField';
import AuthField from '../../../components/authField';
import BtnDropDown from '../../../components/btnDropDown';
import { notify, notifyStatus } from '@/util/notify';
import { BASE_URL } from '@/service/network-configs/http/basicConfig';
import { NEW_CLIENT } from '@/service/api-endpoints/client';
import { httpPOST } from '@/service/network-configs/http/service';
import Toaster from '@/components/Toaster';
import { Oval } from  'react-loader-spinner'
import { NEW_EMPLOYEE } from '@/service/api-endpoints/employee';
import Loarder from '@/components/Loarder';
import JobTypeDropDrown from '@/components/jobTypeDropDrown';


const sliderMaxindex = 2;
const sliderMinindex = 0;

export default function SignUp() {
    const router = useRouter();
    const [slideIndex, setSlideIndex] = useState(0);
    const [buinessRegPdf, setBuinessRegPdf] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    const fileInputRef = useRef(null);
    const fileInputRef2 = useRef(null);

    const [name, setName] = useState('');
    const [jobType, setJobType] = useState('');
    const [woekingType, setWorkingType] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [tel, setTell] = useState('');
    const [date, setDate] = useState('');
    const [isLoding, setLoading] = useState(false);
    

 
    const handleFileChangeProfile = (event) => {
  
      try {

        const file = event.target.files[0];
        const fileUri = URL.createObjectURL(file);
        console.log('File URI:', fileUri);

        const fileUrl = URL.createObjectURL(file);
        setProfileUrl(fileUrl);
        console.log("URL: ", fileUrl);
      } catch (err) {
        console.log(err);
      }
    };

    const handleClickProfile = () => {
        fileInputRef2.current.click();
   };


    const handleNextSlide = () => {
         if(slideIndex >= sliderMaxindex){
              setSlideIndex(sliderMaxindex);
         }else{
              setSlideIndex(prevIndex => prevIndex + 1);
         }

      };

    const handlePrevioustSlide = () => {

        if(slideIndex <= sliderMinindex){
            setSlideIndex(sliderMinindex);
        }else{
            setSlideIndex(prevIndex => prevIndex - 1);
        }
    
    };

     async function  saveDetails(){
        console.log(date ,"  ",jobType);
        setLoading(prev => !prev)
       
        const employeeDetails = JSON.stringify({
            "name": name,
            "address": {
              "street": street,
              "city": city,
              "state": state,
              "zipCode": zip
            },
            "dateOfBirth": date,
            "jobType": jobType,
            "workingType": woekingType,
            "profileImageUri": profileUrl,
            "email": email,
            "tel": tel,
            "userName": userName,
            "password": password
          });
          
          const url = BASE_URL + NEW_EMPLOYEE;
          
          const headers = {
            'Role': 'EMPLOYEE',
            'Content-Type': 'application/json', 
            'crossorigin': true,    
            'mode': 'no-cors',       
          };
           
          const response = await httpPOST(url,employeeDetails,'application/json',headers)
        
          if(response?.data?.code === 200){
                  setLoading(false)
                  notify(notifyStatus.SUCCESS,"New  Employee Save ")
          }else if(response?.data?.code === 400){
                  setLoading(false)
                  notify(notifyStatus.ERROR,"Failed save employee please try again")
          }else{  
                  setLoading(false)
                  notify(notifyStatus.ERROR,"Failed save employee please try again")
          }
            
      }
   
    
      const changeSlider = () =>{
           if(slideIndex === 0){
                 return  <Button title={"Create A New Account"} width={"50%"} height={"35px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>handleNextSlide()} />
           }else {
                return(
                    <div style={{width:'80%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <Button title={"Previous"} width={"25%"} height={"25px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>handlePrevioustSlide()} />
                      <Button title={"Submit"} width={"25%"} height={"25px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>{handleNextSlide();saveDetails()}} />
                   </div>
                )
           }
      }

  return (
    <div>
          <div  style={{width:'100%',height:'50px',display:'flex',alignItems:'center',backgroundColor:'white'}}>
             <div style={{width:'100%',height:'40px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:'10px',paddingRight:'10px'}}>
                  <div style={{display:'flex',flexDirection:'row',height:'20px',alignItems:'center'}}>               
                         <Image src={"/images/logo.png"}  width={108}  height={8} style={{marginRight:'20px',position:'relative',top:'-1px'}} onClick={()=>router.push('/landing/page')}/>
                  </div>
             </div>
        </div>
        <div  style={{height:'92vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div className='  box-shadow-type-one' style={{height:'500px',width:'700px',borderRadius:'15px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around'}}>
                     <span style={{fontSize:'30px',fontFamily:'initial',fontWeight:'700',color:'#464755'}} >Sign up as a employee</span>
                <div style={{width:'80%',height:'260px'}}>        
                    <Carousel width={"620px"}   selectedItem={slideIndex} autoPlay={false} showStatus={false} showIndicators={false} >
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'90%',alignItems:'center',height:"280px",padding:'20px'}}>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start',height:'100%'}}>
                                   
                                    <TextField width={"420px"} height={"40px"} placeholder={"Name"} borderRadius={"10px"} borderColor={"red"}  onChange={(e)=>{setName(e.target.value)}}/>
                                    <TextField width={"420px"} height={"40px"} placeholder={"Email"}  borderRadius={"10px"} onChange={(e)=>{setEmail(e.target.value)}}/>
                                    <AuthField width={"420px"} height={"40px"} placeholder={"Username"} borderRadius={"10px"} type={"text"} onChange={(e)=>{setUserName(e.target.value)}}/>
                                    <AuthField width={"420px"} height={"40px"} placeholder={"Password"} borderRadius={"10px"} type={"password"} onChange={(e)=>{setPassword(e.target.value)}}/>
                                    <AuthField width={"420px"} height={"40px"} placeholder={"Confirm Password"} borderRadius={"10px"} type={"password"} onChange={(e)=>{}}/>
                            </div>   
                        </div>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'90%',alignItems:'center',height:"300px",padding:'20px'}}>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start',height:'100%'}}>
                                    <div style={{display:'flex', flexDirection : 'row',justifyContent:"space-between",columnGap:'20px'}}>
                                      
                                        {/* <TextField width={"200px"} height={"40px"} placeholder={"BusinessType"}  borderRadius={"10px"}  /> */}
                                        
                                        <BtnDropDown onChange={(e)=>{setJobType(e)}} width={"200px"}/>
                                        <input type='date' style={{width:'200px',borderRadius:'10px'}} className='box-shadow-type-one' placeholder='date of birth' value={date}  onChange={(e)=>{setDate(e.target.value)}} />
                                    </div>

                                    <div style={{display:'flex', flexDirection : 'row',justifyContent:"space-between",columnGap:'20px'}}>
                                            <TextField width={"200px"} height={"40px"} placeholder={"Street"}  borderRadius={"10px"} onChange={(e)=>{setStreet(e.target.value)}}/>
                                            <TextField width={"200px"} height={"40px"} placeholder={"City"}  borderRadius={"10px"} onChange={(e)=>{setCity(e.target.value)}}/>
                                    </div>

                                    <div style={{display:'flex', flexDirection : 'row',justifyContent:"space-between",columnGap:'20px'}} >
                                            <TextField width={"200px"} height={"40px"} placeholder={"State"}  borderRadius={"10px"} onChange={(e)=>{setState(e.target.value)}}/>
                                            <TextField width={"200px"} height={"40px"} placeholder={"ZipCode"}  borderRadius={"10px"} onChange={(e)=>{setZip(e.target.value)}} />
                                    </div>

                                    <div style={{display:'flex', flexDirection : 'row',justifyContent:"space-between",columnGap:'20px'}} >
                                            <TextField width={"200px"} height={"40px"} placeholder={"Tel"}  borderRadius={"10px"} onChange={(e)=>{setTell(e.target.value)}}/>
                                            <JobTypeDropDrown onChange={(value)=>{setWorkingType(value)}} width={"200px"}/>
                                    </div>
                                     
                                    <div className='box-shadow-type-two'  style={{height:'70px',width:'100%',borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>

                                             <div style={{width:'90%',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',columnGap:'5px'}}>
                                                  <div style={{width:'50px',
                                                               height:'50px',
                                                               borderRadius:'100%',
                                                               borderWidth:'2px',
                                                               backgroundImage:`url(${profileUrl})`,
                                                               backgroundSize: 'cover',
                                                               backgroundPosition: 'center'}}/>
                                                  <Button title={"Upload Profile Image"} width={"50%"} height={"35px"} color={"white"} backgroundColor={"#8B7AE0"} onClick={()=>handleClickProfile()} type={'submit'} />
                                              </div>
    
                                            <input
                                                id="fileInputProfile"
                                                ref={fileInputRef2}
                                                type="file"
                                                onChange={handleFileChangeProfile}
                                                accept="image/jpeg, image/png"
                                                style={{ display: 'none' }}
                                            />
                                           
                                    </div>
                                   
                                    
                            </div>   
                        </div>
                        
                    </Carousel>
                </div>
                <div style={{height:'50px' ,width:'100%',display:'flex',justifyContent:'center'}}>
                    {
                        changeSlider()   
                    }
                </div>
                
            </div>
        </div>
        
        <Loarder visible={isLoding}/>
        <Toaster/>
    </div>
  )
}
