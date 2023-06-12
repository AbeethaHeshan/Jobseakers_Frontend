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

        const { access_token, refresh_token, userRole, userId } = JSON.parse(credentials);

        return { access_token, refresh_token, userRole, userId };
    }
    return null;
  };
