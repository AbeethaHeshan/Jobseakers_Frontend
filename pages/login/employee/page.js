import React,{useRef,useState} from 'react'
import checkAuthentication from '@/components/HOC/WithAuth'
import Image from 'next/image';
import TextGroupContainer from '@/components/textGroupContainer';
import MenuButton from '@/components/MenuButton';
 function Main() {

  const[visible,setVisible]= useState({visible:false,item:''})
  const fileInputRefXT = useRef(null);
  const [profileUrl, setProfileUrl] = useState('')
  const handleClickProfile = () => {
    fileInputRefXT.current.click();
};

  function onChangeItems(){
    switch(visible.item){
      case "viewAll" : return "view all employees of the client have";
      case "viewTeam" : return "view all employees of the client have as a teams ex- according to Hotel hotel has waiters,managers,cheff";
      default : "dsd";
    }
  }

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
    <div style={{display:'flex',flexDirection:'column',width:'100vw',height:'100vh',alignItems:'center'}}>
        <div className='box-shadow-type-one' style={{width:'100%',height:'45px',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
          <div style={{width:'90%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{height:'40px',display:'flex',flexDirection:'row',alignItems:'center',width:'100px',justifyContent:'space-between',columnGap:'15px'}}>
                        <Image src={"/images/logo.png"}  width={200}  height={8} style={{width:'100px',height:'13px'}} onClick={()=>router.push('/landing/page')}/>
                        <ul style={{display:'flex',flexDirection:'row',columnGap:'15px',fontSize:'14px'}}>
                          <li>Reposts</li>
                          <li>Messages</li>
                        </ul>

                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',columnGap:'10px'}}>

                       <ul style={{display:'flex',flexDirection:'row',columnGap:'15px',fontSize:'14px',paddingRight:'40px',cursor:'pointer'}}>
                          <li>Profile</li>
                          <li>Tasks</li>
                          <li>Earns</li>
                        </ul>
                    <label>{"user name"}</label>
          
                    <div style={{width:'35px',height:'35px',borderRadius:'100%',border:'2px solid gray',marginRight:'30px',backgroundImage:`uri(${"clientDetails?.profileImageUri"})`,backgroundRepeat:'no-repeat'}}/>
                </div>
          </div>
        </div>

          
        <div style={{width:'100vw',height:'95vh',display:'flex',flexDirection:'row'}}>
                <div style={{width:'15vw',borderTopRightRadius:'12px',borderBottomRightRadius:'12px',borderRight:'2px solid #DFD7FF',display:'flex',justifyContent:'center',alignItems:'center'}}>
                             
                            <div style={{width:'230px',height:'90vh',display:'flex',flexDirection:'column',rowGap:'20px',alignItems:'center'}}>
                               <div style={{width:'100%',display:'flex',justifyContent:'center',position:'relative'}}>
                                 <div style={{backgroundImage:`url(${"profileUrl"})`,width:'80px',height:'80px',borderRadius:"100%",border:'2px solid gray', backgroundSize: 'cover',backgroundPosition: 'center'}}/>
                                 <div style={{ backgroundImage:`url('/images/common/uploadImage.png')`,width:'25px',height:'25px',backgroundRepeat:'no-repeat',cursor:'pointer',position:'absolute',bottom:'-5px',right:'0',left:'50px',margin:'auto', backgroundSize: 'cover', backgroundPosition: 'center',}} onClick={()=>handleClickProfile()} />
                                    <input
                                        id="fileInputProfile"
                                        ref={fileInputRefXT}
                                        type="file"
                                        onChange={onChangeProfileImg}
                                        accept="image/jpeg, image/png"
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <TextGroupContainer topic={"Name"} subTopic={"Kamal"} width={"200px"}/>
                                <TextGroupContainer topic={"Eddress"} subTopic={"Kamal"} width={"200px"}/>
                                <TextGroupContainer topic={"Email"} subTopic={"asd@gmail.com"} width={"200px"}/>
                                <TextGroupContainer topic={"Tel"} subTopic={"+94123456"} width={"200px"}/>
                                <TextGroupContainer topic={"Working Type"} subTopic={"online"} width={"200px"} />
                                <TextGroupContainer topic={"Job Type"} subTopic={"Tnformation Technology"} width={"200px"}/>
                                <TextGroupContainer topic={"Catogary Type"} subTopic={"Grapgic designer"} width={"200px"}/>
                            </div>
                </div>
                <div style={{width:'89vw',borderRadius:'10px',margin:'5px'}}>
                     <div style={{height:'100px',display:'flex',flexDirection:'row',columnGap:'10px'}}> 
                          <MenuButton  title={"All Tasks"} imageUrl={"/images/common/People.png"} backgroundColor={"#F2EFFE"} onClick={()=>{setVisible({visible:true,item:'Tasks'}) }} />
                          <MenuButton  title={"Completed Tesks"} imageUrl={"/images/common/People.png"} backgroundColor={"#F2EFFE"} onClick={()=>{setVisible({visible:true,item:'Completed'}) }} />
                          <MenuButton  title={"Submit Task"} imageUrl={"/images/common/People.png"} backgroundColor={"#F2EFFE"} onClick={()=>{setVisible({visible:true,item:'Completed'}) }} />
                     </div>

                </div>
        </div>

    </div>
  )
}
export default checkAuthentication (Main);