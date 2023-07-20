import React,{useState} from 'react'
import Image from 'next/image'
import MenuButton from '../MenuButton'
import TransparentScreen from '../TransparentScreen'
import CreateAds from './clientSubMenus/createAds'
import ViewAds from './clientSubMenus/viewAds'
import RegisterAsEmployee from './clientSubMenus/registerEmployees'
export default function Advertiesment() {
  const[visible,setVisible]= useState({visible:false,item:''})

  function onChangeItems(){
    switch(visible.item){
      case "createAds" : return <CreateAds/>;
      case "EmployeeRequests" : return <RegisterAsEmployee/>;
      case "LiveAds" : return <ViewAds/>;
      default : "dsd";
    }
  }

  
  return (
    <div style={{height:'60vh',padding:'5px'}}>
         <div style={{height:'100px',display:'flex',flexDirection:'row',columnGap:'10px'}}>
             <MenuButton  title={"Cerate Ads"} imageUrl={"/images/common/new.png"} backgroundColor={"#F2EFFE"} onClick={()=>{setVisible({visible:true,item:'createAds'}) }} />
             <MenuButton  title={"Job Requests"}   imageUrl={"/images/common/request.png"} backgroundColor={"#F2EFFE"} onClick={()=>{setVisible({visible:true,item:'EmployeeRequests'}) }}/>
             <MenuButton  title={"Live Ads"}   imageUrl={"/images/common/live.png"} backgroundColor={"#F2EFFE"} onClick={()=>{setVisible({visible:true,item:'LiveAds'}) }}/>
         </div>
         <TransparentScreen onClick={()=>{setVisible({visible:false,item:''})}}  visible={visible.visible}>
              {onChangeItems()}
         </TransparentScreen>
    </div>
  )
}
