import React from 'react'
import './InputForm.css'; 


export const InputText = ({type = 'text', placeholder, onChange, value}: 
{type: string, placeholder?: string, onChange?: any, value?: string}) => {


    return(
        <input 
            onChange={onChange} 
            className="input-text" 
            type={type} 
            placeholder={placeholder}
            value={value}
       
        />
    )
}