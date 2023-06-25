import Cookies from "js-cookie";

// export const getUserCredentialsFromCookies = () => {
//     const credentials = Cookies.getJSON('user');
//     if (credentials) {
//       const { access_token, refresh_token , userRole ,userId } = credentials;
//       return {access_token, refresh_token , userRole ,userId };
//     }
//     return null;
// };

export const getUserCredentialsFromLocalStorage = () => {
    const credentials = localStorage.getItem('user');
    if (credentials) {

        const data = JSON.parse(credentials);
        const refresh_token = data?.refresh_token;
        const access_token = data?.access_token;
        const userId = data?.userId;
        const userRole = data?.userRole;
        return { access_token, refresh_token, userRole, userId };
    }
    return null;
  };

export const  userCredentialsIsExists = () =>{
     if(getUserCredentialsFromLocalStorage() != null){
          return true;
     }else{
         return false
     }
}
