import JobTypeDropDrown from '@/components/jobTypeDropDrown'
import TextField from '@/components/textField'
import Button from '@/components/button';
import React, {useState} from 'react'
import JobRoleType from '@/components/jobRoleType';
import BtnDropDown from '@/components/btnDropDown';
import {BASE_URL} from "@/service/network-configs/http/basicConfig";
import {NEW_EMPLOYEE} from "@/service/api-endpoints/employee";
import {httpPOST} from "@/service/network-configs/http/service";
import {notify, notifyStatus} from "@/util/notify";
import {CREATE_ADVERTIESMENT} from "@/service/api-endpoints/advertiesment";
import {getUserCredentialsFromLocalStorage} from "@/util/storage";
import {CONFIRM_PASSWORD} from "@/util/regXConstents";

export default function CreateAds() {
    const [title, setTitle] = useState({value: '', bool: false});
    const [jobType, setJobType] = useState('');
    const [woekingType, setWorkingType] = useState('');
    const [period, setPeriod] = useState({value: '', bool: false});
    const [hoverlyRate, setHoverlyRate] = useState({value: '', bool: false});
    const [experienceLevel, setExperienceLevel] = useState({value: '', bool: false});
    const [description, setDescription] = useState({value: '', bool: false});
    const [date, setDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [jobRoleType, setJobRoleType] = useState('');
    const [isLoading,setLoading] = useState(false);

    async function  postAd(){

        setLoading(prev => !prev)

        const adDetails = JSON.stringify({

            "title": title.value,
            "period": period.value,
            "workingType":woekingType ,
            "hourlyRate": hoverlyRate.value,
            "experienceLevel": experienceLevel.value ,
            "clarification": jobRoleType ,
            "jobType":jobType,
            "description": description.value,
            "startDate": date,
            "endDate":toDate
            
        });


        const url = BASE_URL + CREATE_ADVERTIESMENT;

        const { access_token, refresh_token, userRole, userId }  = getUserCredentialsFromLocalStorage();

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
            'userId': userId
        };

        const response = await httpPOST(url,adDetails,'application/json',headers)

        if(response?.status === 200){
            setLoading(false)
            notify(notifyStatus.SUCCESS,"post new Ad success")

        }else if(response?.status === 400){
            setLoading(false)
            notify(notifyStatus.ERROR,"Failed  please try again")
        }else{
            setLoading(false)
            notify(notifyStatus.ERROR,"Failed  please try again")
        }

    }



    return (
        <div style={{
            width: '100vh',
            height: '80vh',
            position: 'absolute',
            left: '0',
            right: '0',
            margin: 'auto',
            top: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <label style={{fontFamily: 'Inter', fontSize: '20px'}}>Create New Advertiesment</label>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    rowGap: '10px',
                    margin: '10px',
                    justifyContent: 'center'
                }}>
                    <div style={{display: 'flex', flexDirection: 'column', rowGap: '10px', margin: '10px'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>Title</label>
                            <TextField
                                width={"420px"}
                                height={"40px"}
                                placeholder={""}
                                borderRadius={"10px"}
                                type={"text"}
                                value={title.value}
                                onChange={(e) => {
                                    setTitle({value: e.value, bool: e.bool})
                                }}/>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>Period </label>
                            <TextField
                                width={"420px"}
                                height={"40px"}
                                placeholder={"period ex - 3 months , permenent"}
                                borderRadius={"10px"}
                                type={"text"}
                                onChange={(e) => {
                                    setPeriod({value: e.value, bool: e.bool})
                                }}
                                value={period.value}
                            />
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>WorkingType </label>
                            <JobTypeDropDrown onChange={(value) => {
                                setWorkingType(value)
                            }} width={"420px"}/>
                        </div>


                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>HourlyRate </label>
                            <TextField
                                warnText={"only double or int"}
                                primaryValue={hoverlyRate.value}
                                RegXtype={"intDouble"}
                                width={"420px"}
                                height={"40px"}
                                placeholder={""}
                                borderRadius={"10px"}
                                type={"text"}
                                onChange={(e) => {
                                    setHoverlyRate({value: e.value, bool: e.bool})
                                }}
                                value={hoverlyRate.value}

                            />
                        </div>


                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>ExperienceLevel </label>
                            <TextField
                                width={"420px"}
                                height={"40px"}
                                placeholder={""}
                                borderRadius={"10px"}
                                type={"text"}
                                onChange={(e) => {
                                    setExperienceLevel({value: e.value, bool: e.bool})
                                }}
                                value={experienceLevel.value}
                            />
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', rowGap: '10px', margin: '10px'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>Description </label>
                            <TextField
                                width={"420px"}
                                height={"40px"}
                                placeholder={""}
                                borderRadius={"10px"}
                                type={"text"}
                                onChange={(e) => {
                                    setDescription({value: e.value, bool: e.bool})
                                }}
                                value={description.value}
                            />
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>Create Date </label>
                            <input type='date' style={{width: '420px', borderRadius: '10px', height: '45px'}}
                                   className='box-shadow-type-one' placeholder='date of birth' value={date}
                                   onChange={(e) => {
                                       setDate(e.target.value)
                                   }}/>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>Expired Date</label>
                            <input type='date' style={{width: '420px', borderRadius: '10px', height: '45px'}}
                                   className='box-shadow-type-one' placeholder='date of birth' value={toDate}
                                   onChange={(e) => {
                                       console.log(e)
                                       setToDate(e.target.value)
                                   }}/>
                        </div>


                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>Catogary</label>
                            <BtnDropDown onChange={(value) => {
                                setJobType(value)
                            }} width={"420px"}/>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label style={{fontFamily: 'inter', fontSize: '13px'}}>Job Type</label>
                            <JobRoleType onChange={(value) => {
                                setJobRoleType(value)
                            }} catogary={jobType} width={"420px"}/>
                        </div>
                    </div>
                </div>
                <Button title={"Create new Ad"} width={"40%"} height={"35px"} color={"white"}
                        backgroundColor={"#6149D8"} onClick={(e) => { postAd();
                }}/>


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
