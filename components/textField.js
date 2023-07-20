import {EMAIL, TEL, TEXT_NUMBER, TEXT_ONLY, checker, DOUBLE_INT} from '@/util/regularExpressions';
import Image from 'next/image';
import React from 'react'

export default function TextField(props) {



     let data = null


     const validator  =  () => {

          if(props.RegXtype === "text"){

            data  = checker(TEXT_ONLY,props.value,props.warnText)
            return data;

          }else if (props.RegXtype === "email"){

            data  =  checker(EMAIL,props.value,props.warnText)
            return data;

          }else if(props.RegXtype === "tel"){

            data  =     checker(TEL,props.value,props.warnText)
            return data;

          }else if (props.RegXtype === "textAndNum"){
            data  =     checker(TEXT_NUMBER,props.value,props.warnText)
            return data;
          }else if (props.RegXtype === "intDouble"){
              data  =     checker(DOUBLE_INT,props.value,props.warnText)
              return data;
          }

     }


    const inputStyle = {
      borderRadius:props?.borderRadius!= null ? props.borderRadius : '100px',
      padding: '5px',
      width: props.width,
      height: props.height,
      border: validator()?.bool  && props.value.length != 0  ? '1px solid red' : props?.value?.length === 0   ? '' : '1px solid green',
      paddingLeft:'18px',
      paddingRight:'10px',
    };

      // ok / error

  return (
    <div style={{display:'flex',flexDirection:'column',rowGap:'2px',margin:'3px'}}>
         <input
            className='box-shadow-type-one'
            type="text"
            style={inputStyle}
            placeholder={props.placeholder}
            onChange={(e)=> props?.onChange({value:e.target.value,bool: validator()?.bool})}
            required
          />

         {validator()?.bool && props?.value?.length != 0 && <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',position:'relative',left:'10px',columnGap:'20px'}}>
              <Image src={'/images/signup/regx/warn.png'} width={2} height={2} style={{width:'15px',height:'15px'}}  />
              <p style={{fontSize:'14px',color:'red',position:'relative',bottom:'1px',fontWeight:'350'}}>{validator()?.text}</p>
          </div>}
    </div>

  )
}
