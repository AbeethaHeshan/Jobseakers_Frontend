import React from 'react'
import Image from 'next/image';
import { PASSWORD, USER_NAME, checker } from '@/util/regularExpressions';
export default function AuthField(props) {

    
       let data = null;
      const validator  =  () => {

        if(props.RegXtype === "userName"){
            
          data  =  checker(USER_NAME,props.value,props.warnText)
          return data;
           
        }else if (props.RegXtype === "password"){

          data  =  checker(PASSWORD,props.value,props.warnText)
          return data;

        }else if (props.RegXtype === "confirmPassword"){
             if(props.value === props.primaryValue){
                 return {text:props.warnText,bool:false}    
             }
          return {text:props.warnText,bool:true}
        }
      }
      
       
      const inputStyle = {
        border: '1px solid #999',
        borderRadius:props.borderRadius!= null ? props.borderRadius : '100px',
        padding: '5px',
        width: props.width,
        height: props.height,
        border: validator()?.bool  && props.value.length != 0  ? '1px solid red' : props?.value?.length == 0    ? '' : props.warnText == null ?  'none' : '1px solid green',
        paddingLeft:  props.icon == null ? "18px" : '30px',
        paddingRight: props.icon == null ? "18px" :'10px',
        margin:props.margin!=null ? props.margin : '0px'
      };

  
  return (
    <div style={{position:'relative'}}>
     

       {
        props.icon != null  ? <Image src={props.icon} width={20} height={5}  style={{position:'absolute',top:'0',left:"15px",bottom:'0',margin:'auto'}}/> : ""
       }
       <div>
          <input
            className='box-shadow-type-one'
            type ={ props.type == "text"  ? "text" : "password"}
            style={inputStyle}
            placeholder={props.placeholder}
            onChange={(e)=> props?.onChange({value:e.target.value,bool: validator()?.bool})}
          />

          {
            validator()?.bool && props?.value?.length != 0 && <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',position:'relative',left:'10px',columnGap:'20px'}}>
              <Image src={'/images/signup/regx/warn.png'} width={2} height={2} style={{width:'15px',height:'15px'}}  />
              <p style={{fontSize:'14px',color:'red',position:'relative',bottom:'1px',fontWeight:'350'}}>{validator()?.text}</p>
            </div>
          }

       </div>
     


    </div>
    
  
  )
}
