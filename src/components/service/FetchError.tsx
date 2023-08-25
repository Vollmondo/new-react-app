import React from "react";
import './FetchError.css'

export function FetchError(){
    return(
        <div className="fetch-error">
            <h2>Ошибка при загрузке данных</h2>
            <p>Повторите пожалуйста попытку</p>
        </div>
    )
}

