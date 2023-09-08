import React, { useEffect, useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegistrationForm } from "./RegistrationForm";
import './LoginForm.css'
import { useNavigate } from "react-router-dom";


export const AuthForm: React.FC = () => {
    const [isSign, setSign] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleTogglePanel = () => {
      setSign(!isSign);
    };
  
    const containerClass = isSign ? "container right-panel-active" : "container";

    useEffect(() => {
        const user = localStorage.getItem("userJSON") || ''
        if (user){
            return (navigate('/home'))
        }
    }, [])
  
    return (
      <div className="login-page">
        <div className={containerClass} id="login-container">
          <div className="form-container sign-up-container">
            <RegistrationForm onTogglePanel={handleTogglePanel} />
          </div>
          <div className="form-container sign-in-container">
            <LoginForm onTogglePanel={handleTogglePanel} />
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Уже зарегистрирован?</h1>
                <button className="login-button ghost" onClick={handleTogglePanel}>
                  Заходи!
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Нет аккаунта?</h1>
                <p>Не беда!</p>
                <button className="login-button ghost" onClick={handleTogglePanel}>
                  Регистрируйся!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };