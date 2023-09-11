import React, { useContext, useState } from "react";
import { UserContext } from '../../context/UserContext'
import axios from "axios";
import './LoginForm.css'
import { IUser } from "../../models";
import { InputText } from "../../components/service/InputForm";

interface LoginFormProps {
  onTogglePanel: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onTogglePanel }) => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await axios.post<IUser>("http://localhost:5000/users/login", {
        username,
        password,
      });
      const user = response.data;
      console.log(user);
      setUser(user);
      localStorage.setItem("userJSON", JSON.stringify(user));
      window.location.reload();

    } catch (error) {
      setError("Неверное имя пользователя или пароль");
    }
  };

  return (
    <>
      <form className="login-form" action="#">
        <h1>Войти</h1>
        <InputText
          type="text"
          placeholder="Введите имя пользователя"
          value={username}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUsername(e.target.value)}
        />
        <InputText
          type="text"
          placeholder="Введите пароль"
          value={password}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleSignIn}>
          Войти
        </button>
      </form>
    </>
  );
};

