"use client"
import React,{useState} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from '@/components/button';
import TextField from '@/components/textField';
import AuthField from '@/components/authField';

const sliderMaxindex = 2;
const sliderMinindex = 0;

export default function SignUp() {
    const router = useRouter();
    const [slideIndex, setSlideIndex] = useState(0);

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
   

      const changeSlider = () =>{
           if(slideIndex === 0){
                 return  <Button title={"Create A New Account"} width={"50%"} height={"35px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>handleNextSlide()} />
           }else if (slideIndex >= sliderMaxindex){
                return(
                    <div style={{width:'80%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Button title={"Previous"} width={"25%"} height={"25px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>handlePrevioustSlide()} />
                        <Button title={"Register"} width={"25%"} height={"25px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>handleNextSlide()} />
                   </div>
                )
           }else{
              return(
                <div style={{width:'80%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Button title={"Previous"} width={"25%"} height={"25px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>handlePrevioustSlide()} />
                    <Button title={"Next"} width={"25%"} height={"25px"} color={"white"} backgroundColor={"#6149D8"} onClick={()=>handleNextSlide()} />
               </div>
              )
           }
      }

  return (
    <div>
          <div  style={{width:'100%',height:'50px',display:'flex',alignItems:'center',backgroundColor:'white'}}>
             <div style={{width:'100%',height:'40px',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:'10px',paddingRight:'10px'}}>
                  <div style={{display:'flex',flexDirection:'row',height:'20px',alignItems:'center'}}>               
                         <Image src={"/images/logo.png"}  width={108}  height={8} style={{marginRight:'20px',position:'relative',top:'-1px'}} onClick={()=>router.push('/landing')}/>
                  </div>
             </div>
        </div>
        <div  style={{height:'92vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div className='  box-shadow-type-one' style={{height:'500px',width:'700px',borderRadius:'15px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around'}}>
                     <span style={{fontSize:'30px'}} >Sign up as a client</span>
                <div style={{width:'80%',height:'260px'}}>        
                    <Carousel width={"620px"}   selectedItem={slideIndex} autoPlay={false} showStatus={false} showIndicators={false} >
                        <div   style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'90%',alignItems:'flex-start',height:"280px",padding:'20px' ,}}>
                                <div style={{display:'flex', flexDirection : 'row',justifyContent:"space-between",columnGap:'20px'}}>
                                    <TextField width={"200px"} height={"40px"} placeholder={"FirstName"} borderRadius={"10px"} borderColor={"red"}/>
                                    <TextField width={"200px"} height={"40px"} placeholder={"LastName"}  borderRadius={"10px"} />
                                </div>
                                <TextField width={"300px"} height={"40px"} placeholder={"Email"}  borderRadius={"10px"} />
                                <AuthField width={"300px"} height={"40px"} placeholder={"Username"} borderRadius={"10px"} type={"text"}/>
                                <AuthField width={"300px"} height={"40px"} placeholder={"Password"} borderRadius={"10px"} type={"password"}/>
                                <AuthField width={"300px"} height={"40px"} placeholder={"Confirm Password"} borderRadius={"10px"} type={"password"}/>
                        </div>
                        <div>
                        
                        </div>
                        <div>
                        
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
    </div>
  )
}
