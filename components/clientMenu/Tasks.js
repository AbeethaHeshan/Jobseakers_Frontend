import React,{useState} from 'react'
import Image from 'next/image'
import MenuButton from '../MenuButton'
import TransparentScreen from '../TransparentScreen'
import CreateAds from './clientSubMenus/createAds'
import CreateWorks from './clientSubMenus/createWorkForEmployee'
import AllTasks from './clientSubMenus/allTasks'

export default function Tasks() {
  const[visible,setVisible]= useState({visible:false,item:''})

  function onChangeItems(){
    switch(visible.item){
      case "newTask" : return <CreateWorks />;
      case "all" : return <AllTasks/>;
      case "deadlines" : return "view dead lines of the tasks with each employees";
      case "assigned" : return "view  the employee completed tasks it inclds strt date,end date,employee details , task per rate (rs) ,  ";
      default : "dsd";
    }
  }

  

  return (
    <div style={{height:'60vh',padding:'5px'}}>
         <div style={{height:'100px',display:'flex',flexDirection:'row',columnGap:'10px'}}>
             <MenuButton  title={"Create New Task"} imageUrl={"/images/common/new.png"}       backgroundColor={"#F2EFFE"} onClick={()=>{setVisible({visible:true,item:'newTask'}) }} />
             <MenuButton  title={"All Tasks"}       imageUrl={"/images/common/tasks.png"}     backgroundColor={"#F2EFFE"} onClick={()=>{setVisible({visible:true,item:'all'}) }} />
             {/* <MenuButton  title={"DeadLines"}       imageUrl={"/images/common/deadlines.png"} backgroundColor={"#F2EFFE"} onClick={()=>{setVisible({visible:true,item:'deadlines'}) }}/>
             <MenuButton  title={"Assigned"}        imageUrl={"/images/common/completed.png"} backgroundColor={"#F2EFFE"} onClick={()=>{setVisible({visible:true,item:'assigned'}) }}/> */}
          
         </div>
         <TransparentScreen onClick={()=>{setVisible({visible:false,item:''})}}  visible={visible.visible}>
              {onChangeItems()}
         </TransparentScreen>
    </div>
  )
}
