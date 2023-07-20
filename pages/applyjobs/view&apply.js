import Button from "@/components/button";
import React,{useState,useRef} from "react";
import Image from "next/image";
import { getUserCredentialsFromLocalStorage } from "@/util/storage";
import { BASE_URL } from "@/service/network-configs/http/basicConfig";
import { CREATE_NEW_APPLICATION } from "@/service/api-endpoints/application";
import { httpPOST } from "@/service/network-configs/http/service";
import { useRouter } from 'next/navigation';

export default function ViewAndApply() {
     
      const[cvUri,setCvUri] = useState("");
      const fileInputRef3 = useRef(null);
      const router = useRouter();

      async function convertBlobURLToBlob(blobURL) {
            const response = await fetch(blobURL);
            const blob = await response.blob();
            return blob;
      }

      const handleFileChangeCvUri = (event) => {
            
            try {
              const file = event.target.files[0];
              const fileUri = URL.createObjectURL(file);
              console.log('File URI:', fileUri);
    
              const fileUrl = URL.createObjectURL(file);
              setCvUri(file);
              console.log("URL: ", fileUrl);
            } catch (err) {
              console.log(err);
            }

      };

      const handleClickCvUri = () => {
            fileInputRef3.current.click();
      };

      async function submit(){

        const { access_token, refresh_token, userRole, userId } = getUserCredentialsFromLocalStorage();
       
        const data = {
                  "applicationId":"",
                  "name": "John Doe",
                  "address": "123 Main Street, City, State",
                  "dateOfBirth": "1990-01-01",
                  "email": "johndoe@example.com",
                  "telOne": "1234567890",
                  "telTwo": "9876543210",
                  "workingType": "Full-time",
                  "cvUri": "",
                  "additionalQualifications": "Lorem dfdf ipsum dolor sit amet, consectetur adipiscing elit.",
                  "userId": "",
                  "jobCatogary": "Software Development"
         }

         const url = BASE_URL + CREATE_NEW_APPLICATION;
  
         const headers = {
            "employeeUserId":'00012',
            "clientUserId" : '1421'   
         };

         const cvUriBlob = await convertBlobURLToBlob(cvUri)

         let bodyFormData = new FormData();
         bodyFormData.append("application",JSON.stringify(data));
         bodyFormData.append("cv" , cvUriBlob  , ".png");

         const response = await httpPOST(url,bodyFormData,'multipart/form-data',headers)    

         if(response?.status === 200){
                 setLoading(false);
                 setEmptyAllField();
                 notify(notifyStatus.SUCCESS,"New  Client Save ")
               setTimeout(function() {
                   router.replace("/login/page")
               }, 2500);
       
         }else if(response?.status >= 400){
            notify(notifyStatus.ERROR,"Failed to submit application")
         }else{
            notify(notifyStatus.ERROR,"Failed to submit application")
         } 
           
         
     }

      return(
           <div style={{height:'100vh',display:'flex',alignItems:"center",justifyContent:'center'}}>
               <div className='box-shadow-type-two' style={{width:'500px',height:'500px',display:'flex',flexDirection:'column',alignItems:'center',borderRadius:''}}>
                     <label>Adsd</label>
                     <div style={{width:'90%',height:'90%'}}>
                           <div className='box-shadow-type-two'  style={{height:'70px',width:'100%',borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                                     

                                     <div style={{width:'90%',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                                          <Button title={"Upload CV"} width={"80%"} height={"35px"} color={"white"} backgroundColor={"#8B7AE0"} onClick={()=>{handleClickCvUri()}} />
                                          <Image  width={10} height={10} src={cvUri != '' ? "/images/signup/client/correct.gif" : "/images/signup/client/1.png"} style={{width:'20px',position:'absolute',right:'50px',margin:'auto'}} className='border'/>
                                     </div>
                        

                                     <input
                                        id="fileInput"
                                        ref={fileInputRef3}
                                        type="file"
                                        onChange={handleFileChangeCvUri}
                                        accept="application/pdf"
                                        style={{ display: 'none' }}
                                      />
                                   

                            </div>     
                     </div>
                     <div>
                        <Button title={"Submit"} width={"105px"} height={"28px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>{router.push('/signup/page')}} />
                     </div>
                    
               </div>

           </div>
      )
}
