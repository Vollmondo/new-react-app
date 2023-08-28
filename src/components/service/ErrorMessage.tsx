import React from "react";
import './ErrorMessage.css'

interface Error{
    error: string
}

export function ErrorMessage({error}: Error){
    return(
        <div className="error-message">
            <h2>Ошибка при загрузке данных</h2>
            <p>{ error }</p>
            <p>Повторите пожалуйста попытку</p>
        </div>
    )
}

