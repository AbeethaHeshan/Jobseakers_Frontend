import React,{useState} from 'react'
import Image from 'next/image'
import MenuButton from '../MenuButton'
import TransparentScreen from '../TransparentScreen'
import CreateAds from './clientSubMenus/createAds'
export default function Teams() {
  const[visible,setVisible]= useState({visible:false,item:''})

  function onChangeItems(){
    switch(visible.item){
      case "TeamWis" : return "view all teams of client have and employees";
      default : "dsd";
    }
  }

  return (

    <div style={{height:'60vh',padding:'5px'}}>
         <div style={{height:'100px',display:'flex',flexDirection:'row',columnGap:'10px'}}>
             <MenuButton  title={"Teams"} imageUrl={"/images/common/team.png"} backgroundColor={"#F2EFFE"} onClick={()=>{setVisible({visible:true,item:'TeamWis'}) }} />
           
         </div>
         <TransparentScreen onClick={()=>{setVisible({visible:false,item:''})}}  visible={visible.visible}>
              {onChangeItems()}
         </TransparentScreen>
    </div>
    
  )
}