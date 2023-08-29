import React from "react";
import './Loader.css';
import { ClipLoader } from "react-spinners";

export function Loader(){
    return (
        <div className="loader-x">
            <div className="loader-y">
                <ClipLoader speedMultiplier={0.8} size={100} color='#c9c9c9'/>
            </div>
        </div>
    )
}

                