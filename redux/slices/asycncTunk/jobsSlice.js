"use-client"
import {httpGET} from "@/service/network-configs/http/service";
import { GET_ALL_JOB_TYPES } from '@/service/api-endpoints/jobs';
import { BASE_URL } from '@/service/network-configs/http/basicConfig';
import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { actionTypes } from '@/redux/actionTypes/allActionTypes';

export const resetAll = createAction(actionTypes.RESET_ALL)

const initialState = {
    data: {},
    status: actionTypes.IDLE_ACTION,
    section:'',
    error: null
}


export const allJobTypes= createAsyncThunk(
    'jobs/jobTypes',
    async () =>  {
        console.log("CCCCCCCCCCCCCCCCCCCCC")
        const response = await httpGET(BASE_URL + GET_ALL_JOB_TYPES,'application/json')
        console.log(response , "  >>>>>>> ok ");
        return {...response,section:"GET_JOBS"}
    }
);


export const getAllJobTypesSlice = createSlice({
    name: 'getAllJobTypes',
    initialState,
    reducers: {},
    extraReducers:builder => {
        builder
        .addCase(allJobTypes.pending,(state,action)=>{
                  console.log("pending")
                  state.status = actionTypes.REQUEST_ACTION
        })
        .addCase(allJobTypes.fulfilled,(state, action) => {
                  console.log("response")
            if(action.payload.actionType === actionTypes.SUCCESS_ACTION){

            }else if (action.payload.actionType === actionTypes.FAILED_ACTION){

            }
        }).addCase(allJobTypes.rejected,(state,action) => {
            console.log("Rejected")
        })
        // .addCase(resetAll, () => initialState)
    },

});

export default getAllJobTypesSlice.reducer
