
export const GenerateTemperaryLinkForFile =  (localPath) =>{
    const file = new File([localPath], 'filename');
  return  URL.createObjectURL(file);
}