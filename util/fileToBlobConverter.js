var b64toBlob = require('b64-to-blob');


export const getBlob = async (blobURL) => {
        const response = await fetch(blobURL);
        const blob = await response.blob();
        return blob;
      
}


export const Base64ToImage =  (base64String) =>{
      
              var contentType = 'image/png';
              var blob = b64toBlob(base64String, contentType);
              return blob;
}

export const downloadImage = (base64Data, fileName) =>{
       
                const blob = Base64ToImage(base64Data);
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                link.click();
}