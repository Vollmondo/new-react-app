import { Children, createContext, useState } from "react";

interface IModalWindowContext {
    modalWindow: boolean
    open: () => void
    close: () => void
}

export const ModalWindowContext = createContext<IModalWindowContext>({
    modalWindow: false,
    open: () => {},
    close: () => {}
})

export const ModalWindowState = ({ children }: {children:React.ReactNode}) =>{
    const [modalWindow, setModalWindow] = useState(false)

    const open = () => setModalWindow(true)

    const close = () => setModalWindow(false)


    return(
        <ModalWindowContext.Provider value={{modalWindow, open, close}}>
            { children }
        </ModalWindowContext.Provider>
    )
}