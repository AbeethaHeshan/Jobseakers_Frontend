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
import { loading, notify, notifyStatus } from '@/util/notify';
import { BASE_URL } from '@/service/network-configs/http/basicConfig';
import { NEW_CLIENT } from '@/service/api-endpoints/client';
import { httpPOST } from '@/service/network-configs/http/service';
import Toaster from '@/components/Toaster';
import { Oval } from 'react-loader-spinner';
import Loarder from '@/components/Loarder';
import { CONFIRM_PASSWORD, EMAIL, PASSWORD, TEXT, TEXT_NUMBER, USER_NAME } from '@/util/regXConstents';
import { get_array_lendth_and_value_ok } from '@/util/arrayCheck';


const sliderMaxindex = 2;
const sliderMinindex = 0;

export default function SignUp() {
    const router = useRouter();
    const [slideIndex, setSlideIndex] = useState(0);
    const [buinessRegPdf, setBuinessRegPdf] = useState({value:'',bool:true});
    const [profileUrl, setProfileUrl] = useState('');
    const fileInputRef = useRef(null);
    const fileInputRef2 = useRef(null);
   
   
    const [firstname, setSetFirstName] = useState({value:'',bool:false});
    const [lastname, setLastName] = useState({value:'',bool:false});
    const [buisnessType, setBuisnessType] = useState({value:'',bool:false});
    const [email, setEmail] = useState({value:'',bool:false});
    const [userName, setUserName] = useState({value:'',bool:false});
    const [password, setPassword] = useState({value:'',bool:false});
    const [businessName, setBusinessName] = useState({value:'',bool:false});
    const [registrationName, setRegistrationName] = useState({value:'',bool:false});
    const [street, setStreet] = useState({value:'',bool:false});
    const [city, setCity] = useState({value:'',bool:false});
    const [state, setState] = useState({value:'',bool:false});
    const [zip, setZip] = useState({value:'',bool:false});
    const [buinessRegPdfUri, setBuinessRegPdfUri] = useState({value:'',bool:true});
    const [profileUri, setProfileUri] = useState({value:'',bool:true});
    const [confirmPassword, setConfirmPassword] = useState({value:'',bool:false});
    const [isLoding, setLoading] = useState(false);
    const [isEmapty, setEmpty] = useState(false);
    


    const booleanValues = [
      buisnessType.bool,
      firstname.bool,
      lastname.bool,
      email.bool,
      userName.bool,
      password.bool,
      businessName.bool,
      registrationName.bool,
      street.bool,
      city.bool,
      state.bool,
      zip.bool,
      buinessRegPdfUri.bool,
      profileUri.bool,
      buinessRegPdf.bool,
    ];


    const handleFileChange = (event) => {
       
          try{

            const file = event.target.files[0];
            const fileUri = URL.createObjectURL(file);
            URL.revokeObjectURL(fileUri);

            setBuinessRegPdfUri({value:fileUri,bool:false});
            console.log('File URI:', fileUri);
            const fileUrl = URL.createObjectURL(file);
            setBuinessRegPdf({value:fileUrl,bool:false});
          }catch(err){
              console.log(err)
          }

      };
      const handleFileChangeProfile = (event) => {
        try {

          const file = event.target.files[0];
          const fileUri = URL.createObjectURL(file);
          console.log('File URI:', fileUri);

          setProfileUri({value:fileUri,bool:false});
          const fileUrl = URL.createObjectURL(file);
          setProfileUrl({value:fileUrl,bool:false});
          console.log("URL: ", fileUrl);
        } catch (err) {
          console.log(err);
        }
      };

    const handleClick = () => {
         fileInputRef.current.click();
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

      
     function setEmptyAllField(){
        setSetFirstName({...firstname, value: '', bool: false});
        setLastName({...lastname,value: '', bool: false });
        setBuisnessType({...buisnessType,value:'',bool: false});
        setEmail({...email, value: '', bool: false });
        setUserName({...userName,value: '', bool: false });
        setPassword({...password , value: '', bool: false});
        setBusinessName({...businessName,value: '', bool: false });
        setRegistrationName({...registrationName, value: '', bool: false });
        setStreet({...street, value: '', bool: false });
        setCity({...city ,value: '', bool: false });
        setState({...state, value: '', bool: false });
        setZip({...zip,value: '', bool: false });
        setBuinessRegPdfUri({...buinessRegPdfUri, value: '', bool: true });
        setProfileUri({...profileUri,value: '', bool: true });
        setBuinessRegPdf({...buinessRegPdf,value: '', bool: true });
     
     }

     async function  saveDetails(){

        setLoading(prev => !prev);
        const clientDetails = JSON.stringify({
            "owner": firstname.value + " " + lastname.value,
            "address": {
              "street": street.value,
              "city": city.value,
              "state": state.value,
              "zipCode": zip.value
            },
            "businessName": businessName.value,
            "businessType": buisnessType.value,
            "businessRegistrationDocUri": buinessRegPdfUri.value,
            "businessRegistrationNo": registrationName.value,
            "email": email.value,
            "tel": "null",
            "profileImageUri": profileUri.value,
            "userName": userName.value,
            "password": password.value
          });
          
          const url = BASE_URL + NEW_CLIENT;
          
          const headers = {
            'Role': 'CLIENT',
            'Content-Type': 'application/json', 
            'crossorigin': true,    
            'mode': 'no-cors',       
          };
           
          const response = await httpPOST(url,clientDetails,'application/json',headers)    
          if(response?.status === 200){
                  setLoading(false);
                  setEmptyAllField();
                  notify(notifyStatus.SUCCESS,"New  Client Save ")
                  setTimeout(function() {
                    router.replace("/login/page")
                }, 2500);
                
          }else if(response?.status >= 400){
                  setLoading(false);
                  notify(notifyStatus.ERROR,"Failed save client please try again")
          }else{
                  setLoading(false);
                  notify(notifyStatus.ERROR,"Failed save client please try again")
                  setEmptyAllField();
          } 
             
      }
   
     //disable = {get_array_lendth_and_value_ok(booleanValues)} 
      const changeSlider = () =>{
           if(slideIndex === 0){
                 return  <Button title={"Create A New Account"} width={"50%"} height={"35px"} color={"white"}   backgroundColor={"#6149D8"}  onClick={()=>handleNextSlide()} />
           }else if (slideIndex >= sliderMaxindex){
                return(
                    <div style={{width:'80%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Button title={"Previous"} width={"25%"} height={"25px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>handlePrevioustSlide()} />
                        <Button title={"Register"} width={"25%"} height={"25px"} color={"white"} backgroundColor={"#6149D8"} onClick={(e)=>{handleNextSlide();  saveDetails() }} />  
                   </div>
                )
           }else{
              return(
                <div style={{width:'80%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Button title={"Previous"} width={"25%"} height={"25px"} color={"white"} backgroundColor={"#6149D8"}  onClick={()=>handlePrevioustSlide()} />
                    <Button title={"Next"} width={"25%"} height={"25px"} color={"white"} backgroundColor={"#6149D8"}   onClick={()=>handleNextSlide()} />
               </div>
              )
           }
      }

      useEffect(()=>{
         

      },[])

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
                     <span style={{fontSize:'30px',fontFamily:'initial',fontWeight:'700',color:'#464755'}} >Sign up as a client</span>
                <div style={{width:'80%',height:'350px'}}>        
                    <Carousel width={"620px"}   selectedItem={slideIndex} autoPlay={false} showStatus={false} showIndicators={false} >
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'90%',alignItems:'center',height:"350px",padding:'20px'}}>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start',height:'100%'}}>
                                    <div style={{display:'flex', flexDirection : 'row',justifyContent:"space-between",columnGap:'20px'}}>
                                        <TextField width={"200px"} height={"40px"} placeholder={"FirstName"} borderRadius={"10px"} borderColor={"red"} warnText={TEXT} value={firstname.value}  RegXtype={"text"}   onChange={(e)=>{setSetFirstName({value:e.value,bool:e.bool});}}/>
                                        <TextField width={"200px"} height={"40px"} placeholder={"LastName"}  borderRadius={"10px"} warnText={TEXT} value={lastname.value} RegXtype={"text"}    onChange={(e)=>{setLastName({value:e.value,bool:e.bool}); }}/>
                                    </div>
                                    <TextField width={"420px"} height={"40px"} placeholder={"Email"}  borderRadius={"10px"}   warnText={EMAIL} value={email.value} RegXtype={"email"}   onChange={(e)=>{setEmail({...email,value:e.value,bool:e.bool}); }}/>
                                    <AuthField width={"420px"} height={"40px"} placeholder={"Username"} borderRadius={"10px"} warnText={USER_NAME} value={userName.value} RegXtype={"userName"}  type={"text"} onChange={(e)=>{setUserName({value:e.value,bool:e.bool}); console.log(userName)}}/>
                                    <AuthField width={"420px"} height={"40px"} placeholder={"Password"} borderRadius={"10px"} warnText={PASSWORD} value={password.value} RegXtype={"password"}  type={"password"} onChange={(e)=>{setPassword({value:e.value,bool:e.bool})}}/>
                                    <AuthField width={"420px"} height={"40px"} placeholder={"Confirm Password"} borderRadius={"10px"} warnText={CONFIRM_PASSWORD} value={confirmPassword.value} primaryValue={password.value} RegXtype={"confirmPassword"}   type={"password"} onChange={(e)=>{setConfirmPassword({value:e.value,bool:e.bool})}}/>
                            </div>   
                        </div>  
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'90%',alignItems:'center',height:"350px",padding:'20px'}}>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start',height:'100%'}}>
                                    <div style={{display:'flex', flexDirection : 'row',justifyContent:"space-between",columnGap:'20px'}}>
                                        <TextField width={"200px"} height={"40px"} placeholder={"BusinessName"} borderRadius={"10px"} borderColor={"red"}  warnText={TEXT} value={businessName.value} RegXtype={"text"} onChange={(e)=>{setBusinessName({value:e.value,bool:e.bool}); }}/>
                                        {/* <TextField width={"200px"} height={"40px"} placeholder={"BusinessType"}  borderRadius={"10px"} /> */}
                                        <BtnDropDown onChange={(e)=>{setBuisnessType({value:e,bool:false})}}/>
                                    </div>

                                            <TextField width={"420px"} height={"40px"} placeholder={"Business Registration Number"}  borderRadius={"10px"}  warnText={TEXT} value={registrationName.value} RegXtype={"text"}  onChange={(e)=>{setRegistrationName({value:e.value,bool:e.bool}); }}/> 
                                    <div style={{display:'flex', flexDirection : 'row',justifyContent:"space-between",columnGap:'20px'}}>
                                            <TextField width={"200px"} height={"40px"} placeholder={"Street"}  borderRadius={"10px"}  warnText={TEXT_NUMBER} value={street.value} RegXtype={"textAndnum"} onChange={(e)=>{setStreet({value:e.value,bool:e.bool});}}/>
                                            <TextField width={"200px"} height={"40px"} placeholder={"City"}  borderRadius={"10px"}  warnText={TEXT} value={city.value} RegXtype={"text"}  onChange={(e)=>{setCity({value:e.value,bool:e.bool}); }}/>
                                    </div>

                                    <div style={{display:'flex', flexDirection : 'row',justifyContent:"space-between",columnGap:'20px'}} >
                                            <TextField width={"200px"} height={"40px"} placeholder={"State"}  borderRadius={"10px"}  warnText={TEXT} value={state.value} RegXtype={"text"} onChange={(e)=>{setState({value:e.value,bool:e.bool}); }}/>
                                            <TextField width={"200px"} height={"40px"} placeholder={"ZipCode"}  borderRadius={"10px"}  warnText={TEXT_NUMBER} value={zip.value} RegXtype={"textAndNum"} onChange={(e)=>{setZip({value:e.value,bool:e.bool});}} />
                                    </div>
                                     
                                    <div className='box-shadow-type-two'  style={{height:'70px',width:'100%',borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                                     
                                             <div style={{width:'90%',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                                                  <Button title={"Upload Business Registration PDF"} width={"80%"} height={"35px"} color={"white"} backgroundColor={"#8B7AE0"} onClick={()=>{handleClick()}} />
                                                  <Image  width={10} height={10} src={buinessRegPdf.value != '' ? "/images/signup/client/correct.gif" : "/images/signup/client/1.png"} style={{width:'20px',position:'absolute',right:'50px',margin:'auto'}} className='border'/>
                                             </div>
                                     
                                             <input
                                                id="fileInput"
                                                ref={fileInputRef}
                                                type="file"
                                                onChange={handleFileChange}
                                                accept="application/pdf"
                                                style={{ display: 'none' }}
                                              />
                                           
                                    </div>
                                  
                            </div>   
                        </div>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'90%',alignItems:'center',height:"350px",padding:'20px'}}>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'flex-start',height:'100%'}}>
                                   
                                    <div className='box-shadow-type-two'  style={{height:'70px',width:'400px',borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                                            
                                             <div style={{width:'50px',height:'50px',borderRadius:'100%',borderWidth:'2px',backgroundImage:`url(${profileUri.value})`, backgroundSize: 'cover',
                                                          backgroundPosition: 'center',}}/>
                                             <div style={{width:'50%',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                                                   <Button title={"Upload Profile Image"} width={"80%"} height={"35px"} color={"white"} backgroundColor={"#8B7AE0"} onClick={()=>handleClickProfile()} />
                                             </div>
    
                                             <input
                                                id="fileInputProfile"
                                                ref={fileInputRef2}
                                                type="file"
                                                onChange={handleFileChangeProfile}
                                                accept="image/png, image/jpeg"
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
