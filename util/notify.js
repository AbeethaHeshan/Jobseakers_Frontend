import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export  const notify = (type,message) => {

        switch(type){
            case "success" : return( toast.success(message, {
                position: toast.POSITION.TOP_CENTER
                }));

            case "error" : return(toast.error(message, {
                position: toast.POSITION.TOP_CENTER
                }));

            case "warn" :  return(toast.warn(message, {
                position: toast.POSITION.TOP_CENTER
                }));

            case "info" :   return(toast.info(message, {
                position: toast.POSITION.TOP_CENTER
                }));
        }
};


export const loading = new Promise(resolve => setTimeout(resolve, 3000));


export const notifyStatus = {SUCCESS:'success',ERROR:'error',WARN:'warn',INFO:'info'}

