import TextField from '@/components/textField'
import React from 'react'

export default function CreateAds() {
  return (
    <div style={{width:'100vh',height:'80vh',border:'2px solid red',position:'absolute',left:'0',right:'0',margin:'auto',top:'20px',display:'flex',justifyContent:'center'}}>
        <label>Create New Advertiesment</label>
        <div>
        <TextField 
           width={"420px"}
           height={"40px"}
           placeholder={"Title"}
           borderRadius={"10px"}
        //    borderColor={"red"}
        //    warnText={TEXT}
        //    value={name.value}
        //    RegXtype={"text"}
           type={"text"}
           onChange={(e)=>{setName({value:e.value,bool:e.bool})}}/>
        </div>
    </div>
  )
}


// String title;
// String period;
// String workingType;
// double hourlyRate;
// String experienceLevel;
// String clarification;
// String description;
// LocalDate startDate;