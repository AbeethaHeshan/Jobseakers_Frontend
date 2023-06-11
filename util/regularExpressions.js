
export const TEXT_ONLY = (value) =>{
     if(value.length === 0){
          false
     }
    else if(value.match(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/) ){
        return true;
    }else{
        return false;
    }
}


export const USER_NAME = (value) => {
    if(value.length == 0){
        false
    }
    else if (value.match(/^[/^[A-Za-z]{3,7}[A-Za-z0-9!@#$%^&*()\-+=<>?]*$/) && value.length >= 6) {
          return true
      } else {
          return false
      }
}


export const PASSWORD = (value) => {
      console.log(value , " cccccccccccc ");
    if (value.match(/^[A-Za-z0-9!@#$%^&*()\-+=<>?]{5,10}$/) && value.length >= 5) {
        return true
    } else {
        return false
    }
}


export const TEL = (value) => {
    //not include  +94  ex - 769140711 
    if(value.length == 0){
        false
    }
    else if (value.match(/^\d{8}$/) && value.length > 0) {
         return true
    } else {
         return false
    }
}


export const EMAIL = (value) => {
    
    if(value.length == 0){
        false
    }
    else if (value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ) {
        return true
    } else {
        return false
    }
}


export const TEXT_NUMBER = (value) => {
    if(value.length == 0){
        false
    }
    else if (value.match(/^[A-Za-z0-9]+$/) ) {
        return true
    } else {
        return false
    }
}

let obj = {
      text : '',
      bool : false
}

export const checker = (method,value,text) =>{
    if(method(value)){
        obj.bool = false;
        return  obj 
   }else{
        obj.bool = true;
        obj.text = text;
        return  obj 
   }
}