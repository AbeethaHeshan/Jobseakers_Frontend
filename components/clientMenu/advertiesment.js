import React,{useState} from 'react'
import Image from 'next/image'
import MenuButton from '../MenuButton'
import TransparentScreen from '../TransparentScreen'
import CreateAds from './clientSubMenus/createAds'
export default function Advertiesment() {
  const[visible,setVisible]= useState({visible:false,item:''})

  function onChangeItems(){
    switch(visible.item){
      case "createAds" : return <CreateAds/>;
      case "EmployeeRequests" : return "ddd";
      case "LiveAds" : return "dsdsddd";
      default : "dsd";
    }
  }

  

  return (
    <div style={{height:'60vh',padding:'5px'}}>
         <div style={{height:'100px',display:'flex',flexDirection:'row',columnGap:'10px'}}>
             <MenuButton  title={"Cerate Ads"} imageUrl={"/images/common/uploadImage.png"} backgroundColor={"#F2EFFE"} onClick={()=>{setVisible({visible:true,item:'createAds'}) }} />
             <MenuButton  title={"Employee Requests"}   imageUrl={"/images/common/request.png"} backgroundColor={"#F2EFFE"} onClick={()=>{setVisible({visible:true,item:'EmployeeRequests'}) }}/>
             <MenuButton  title={"Live Ads"}   imageUrl={"/images/common/live.png"} backgroundColor={"#F2EFFE"} onClick={()=>{setVisible({visible:true,item:'LiveAds'}) }}/>
         </div>
         <TransparentScreen onClick={()=>{setVisible({visible:false,item:''})}}  visible={visible.visible}>
              {onChangeItems()}
         </TransparentScreen>
    </div>
  )
}
