import React,{useRef,useState,useEffect} from 'react'
import TextGroupContainer from '../textGroupContainer';

export default function ProfileInfo(props) {
    const fileInputRefX = useRef(null);
    const [profileUrl, setProfileUrl] = useState('')

    
    // let newAddress = street + "," +  city + "," + state +'\n'+ zipCode
    

      function address(){
            console.log("DDDDDDDDDDD");
        if (props.props && props.props.address) {
            let { street, city, state, zipCode } = props.props.address;
          
            return street + "," +  city + "," + state +'\n'+ zipCode;
             
          } else {
            return "street" + "," +  "city" + "," + "state" +'\n'+ "zipCode";
          }
      }

    const handleClickProfile = () => {
        fileInputRefX.current.click();
    };

    
    const onChangeProfileImg = (event) => {
  
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

  return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',rowGap:'30px'}}>
        <div style={{display:'flex',flexDirection:'column',height:'44vh',rowGap:'50px',borderRadius:'20px'}} className='box-shadow-type-one'>
            <div style={{height:'70px',borderTopLeftRadius:'20px',backgroundColor:'#F3F3F3',borderTopRightRadius:'20px',display:'flex',alignItems:'center'}}>
                 <label style={{fontSize:'30px',fontWeight:'500',color:'#808080',marginLeft:"50px",fontFamily:'Inter'}}>Account</label>
            </div>
            <div style={{display:'flex',flexDirection:'column',rowGap:'30px',alignItems:'start'}}>
                 <div style={{width:'100%',display:'flex',justifyContent:'center',position:'relative'}}>
                        <div style={{width:'80px',height:'80px',borderRadius:"100%",border:'2px solid gray', backgroundSize: 'cover',backgroundPosition: 'center', backgroundImage:`url(data:image/png;base64,${props.props.profileImageUri})`}}/>
                        <div style={{width:'25px',height:'25px',backgroundRepeat:'no-repeat',cursor:'pointer',position:'absolute',bottom:'-5px',right:'0',left:'50px',margin:'auto', backgroundSize: 'cover', backgroundPosition: 'center', }} onClick={()=>handleClickProfile()} />
                        <input
                            id="fileInputProfile"
                            ref={fileInputRefX}
                            type="file"
                            onChange={onChangeProfileImg}
                            accept="image/jpeg, image/png"
                            style={{ display: 'none' }}
                        />
                 </div>
        
                 <div style={{width:'50%',display:'flex',flexDirection:'column',rowGap:'15px',marginLeft:'50px'}}>
                          <div  style={{height:'50px',display:'flex',flexDirection:'row'}}>
                                <TextGroupContainer topic={props.props.owner} subTopic={props.props.businessName} />
                          </div>
                      

                          <div  style={{height:'50px',display:'flex',flexDirection:'row'}}>
                                <TextGroupContainer topic={"Email"} subTopic={props.props.email} />
                          </div> 

                          <div  style={{height:'50px',display:'flex',flexDirection:'row'}}>
                                <TextGroupContainer topic={"Tel"} subTopic={props.props.tel} />
                          </div> 
                 </div>
            </div>
        </div>


        <div style={{display:'flex',flexDirection:'column',height:'32vh',rowGap:'30px',borderRadius:'20px'}} className='box-shadow-type-one'>
            <div style={{height:'70px',borderTopLeftRadius:'20px',backgroundColor:'#F3F3F3',borderTopRightRadius:'20px',display:'flex',alignItems:'center'}}>
                 <label style={{fontSize:'30px',fontWeight:'500',color:'#808080',marginLeft:"50px",fontFamily:'Inter'}}>Business Details</label>
            </div>
            <div style={{display:'flex',flexDirection:'column',rowGap:'30px',alignItems:'start'}}>
                 <div style={{width:'50%',display:'flex',flexDirection:'column',rowGap:'15px',marginLeft:'50px'}}>
                          <div  style={{height:'50px',display:'flex',flexDirection:'row'}}>
                                <TextGroupContainer topic={"BusnessType"} subTopic={props.props.businessType} />
                          </div>
                      

                          <div  style={{height:'50px',display:'flex',flexDirection:'row'}}>
                                <TextGroupContainer topic={"Approval Status"} subTopic={props.props.approvalStatus} />
                          </div> 

                          <div  style={{height:'50px',display:'flex',flexDirection:'row'}}>
                                <TextGroupContainer topic={"Address"} subTopic={address()} />
                          </div> 
                 </div>
            </div>
        </div>
    </div>
  )
}
