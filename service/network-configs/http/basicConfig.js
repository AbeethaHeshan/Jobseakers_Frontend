export const REQUEST_TIMEOUT = 6000;
export const REQUEST_UNAUTHORIZED = 401;
export const REQUEST_FORBIDDON = 403;
export const REQUEST_SUCCESS = 200;
export const REQUEST_SUCCESS_OTHER = 201;
export const SERVER_ERROR = 500


export const BASE_URL = "http://localhost:8080/api/v1/"

export const requestConfig = (headers)=> {

    return {
        headers:{...headers,
            'Accept': 'application/json',
        }

    }
}

export const postRequestConfig = (headers,contentType)=> {
    
    console.log(headers ,"      ", contentType);
    
    return {
        headers:{...headers,
            'Accept': 'application/json',
            'Content-Type': contentType,
        }

    }
}