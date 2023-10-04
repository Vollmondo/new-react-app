import React from "react";
import './ModalWindow.css';

interface ModalWindowProps{
    children: React.ReactNode
    title: string
    onClose: () => void
}

export function ModalWindow({ children, title, onClose }: ModalWindowProps) {
    return(
        <>
            <div className="modal-window" onClick={onClose}></div>
            <div className="modal-window-container">
            <h2 className="modal-window-header">{ title }</h2>
                { children }
            </div>
        </>
    )
}