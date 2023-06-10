import { configureStore } from '@reduxjs/toolkit'

import getAllJobTypesSlice from "@/redux/slices/asycncTunk/jobsSlice";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const store = configureStore({
    reducer : {
        getAllJobs:getAllJobTypesSlice
    },
    devTools: process.env.NODE_ENV !== 'production',

})
export default store
