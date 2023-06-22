import React,{useState} from 'react'
import Image from 'next/image'
import MenuButton from '../MenuButton'
import TransparentScreen from '../TransparentScreen'
import CreateAds from './clientSubMenus/createAds'
export default function Employees() {
  const[visible,setVisible]= useState({visible:false,item:''})

  function onChangeItems(){
    switch(visible.item){
      case "viewAll" : return "view all employees of the client have";
      case "viewTeam" : return "view all employees of the client have as a teams ex- according to Hotel hotel has waiters,managers,cheff";
      default : "dsd";
    }
  }

  

  return (
    <div style={{height:'60vh',padding:'5px'}}>
         <div style={{height:'100px',display:'flex',flexDirection:'row',columnGap:'10px'}}>
             <MenuButton  title={"All Employees"} imageUrl={"/images/common/People.png"} backgroundColor={"#F2EFFE"} onClick={()=>{setVisible({visible:true,item:'viewAll'}) }} />
             <MenuButton  title={"Team wise"}   imageUrl={"/images/common/team.png"} backgroundColor={"#F2EFFE"} onClick={()=>{setVisible({visible:true,item:'viewTeam'}) }}/>
         </div>
         <TransparentScreen onClick={()=>{setVisible({visible:false,item:''})}}  visible={visible.visible}>
              {onChangeItems()}
         </TransparentScreen>
    </div>
  )
}
