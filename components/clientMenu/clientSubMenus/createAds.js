import JobTypeDropDrown from '@/components/jobTypeDropDrown'
import TextField from '@/components/textField'
import Button from '@/components/button';
import React,{useState} from 'react'

export default function CreateAds() {
    const [title, setTitle] = useState({value:'',bool:false});
    const [jobType, setJobType] = useState({value:'',bool:false});
    const [woekingType, setWorkingType] = useState({value:'',bool:false});
    const [period, setPeriod] = useState({value:'',bool:false});
    const [hoverlyRate, setHoverlyRate] = useState({value:'',bool:false});
    const [experienceLevel, setExperienceLevel] = useState({value:'',bool:false});
    const [description, setDescription] = useState({value:'',bool:false});
    const [date, setDate] = useState({value:'',bool:false});
  return (
    <div style={{width:'100vh',height:'80vh',position:'absolute',left:'0',right:'0',margin:'auto',top:'20px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <label style={{fontFamily:'Inter',fontSize:'20px'}}>Create New Advertiesment</label>
        <div style={{display:'flex',flexDirection:'column',rowGap:'10px',margin:'10px',justifyContent:'center',alignItems:'center'}}>
                <TextField 
                    width={"420px"}
                    height={"40px"}
                    placeholder={"Title"}
                    borderRadius={"10px"}
                    type={"text"}
                    value={title.value}
                    onChange={(e)=>{setTitle({value:e.value,bool:e.bool})}}/>

                <TextField 
                    width={"420px"}
                    height={"40px"}
                    placeholder={"period"}
                    borderRadius={"10px"}
                    type={"text"}
                    onChange={(e)=>{setPeriod({value:e.value,bool:e.bool})}}
                    value={period.value}
                    />

                <JobTypeDropDrown  onChange={(value)=>{setWorkingType({value:value,bool:false})}} width={"420px"} />

                <TextField 
                    width={"420px"}
                    height={"40px"}
                    placeholder={"hourlyRate"}
                    borderRadius={"10px"}
                    type={"text"}
                    onChange={(e)=>{setHoverlyRate({value:e.value,bool:e.bool})}}
                    value = {hoverlyRate.value}

                    />

                

                <TextField 
                    width={"420px"}
                    height={"40px"}
                    placeholder={"experienceLevel"}
                    borderRadius={"10px"}
                    type={"text"}
                    onChange={(e)=>{setExperienceLevel({value:e.value,bool:e.bool})}}
                    value = {experienceLevel.value}    
                    />

                <TextField 
                    width={"420px"}
                    height={"40px"}
                    placeholder={"description"}
                    borderRadius={"10px"}
                    type={"text"}
                    onChange={(e)=>{setDescription({value:e.value,bool:e.bool})}}
                    value = {description.value}    
                    />


                {/* <TextField 
                    width={"420px"}
                    height={"40px"}
                    placeholder={"description"}
                    borderRadius={"10px"}
                    type={"text"}
                    onChange={(e)=>{({value:e.value,bool:e.bool})}}

                    /> */}

                <input type='date' style={{width:'420px',borderRadius:'10px',height:'45px'}} className='box-shadow-type-one' placeholder='date of birth' value={date.value}  onChange={(e)=>{setDate({value:e.value,bool:e.bool})}} />
                <Button title={"Create new Ad"} width={"40%"} height={"35px"} color={"white"} backgroundColor={"#6149D8"} onClick={(e)=>{}} />
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