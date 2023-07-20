import React,{useEffect,useState} from "react";
import { useRouter } from 'next/navigation';
import {getUserCredentialsFromLocalStorage} from '../../util/storage'
import Loarder from '../Loarder';
import jwt_decode from "jwt-decode";

const checkAuthentication = (WrappedComponent) => {


  const WithAuthentication = (props) => {
    
        const router = useRouter();
        const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

            //!userRole || !userId || !refresh_token || !access_token
            if (!getUserCredentialsFromLocalStorage()?.userRole || !getUserCredentialsFromLocalStorage()?.userId || !getUserCredentialsFromLocalStorage()?.refresh_token || !getUserCredentialsFromLocalStorage()?.access_token) {   
                // Redirect to the login page if  not found
                localStorage.clear();
                router.replace('/login/page');
            } else if(getUserCredentialsFromLocalStorage()?.access_token){
                 const decoded_access_token = jwt_decode(getUserCredentialsFromLocalStorage()?.access_token);
                 const decoded_refresh_token = jwt_decode(getUserCredentialsFromLocalStorage()?.refresh_token);
                  if (decoded_refresh_token.exp * 1000 < Date.now()  ) {
                    localStorage.clear();
                    router.replace('/login/page');
                  }else{
                    setIsLoading(false);
                  }
                
            } else{
                 setIsLoading(false);
            }
     
    }, []);

        if (isLoading) {
            // Render a loading screen
            return  <Loarder visible={isLoading}/>;
        }

    return <WrappedComponent {...props} />
  
  };

  return WithAuthentication;
};

export default checkAuthentication;