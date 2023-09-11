import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { UserContext } from '../../context/UserContext'
import axios from "axios";
import './LoginForm.css'
import { IUser } from "../../models";
import { InputText } from "../../components/service/InputForm";
import { ErrorMessage } from "../../components/service/ErrorMessage";

interface RegistrationFormProps {
  onTogglePanel: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onTogglePanel }) => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [mail, setUserMail] = useState("");
  const [userPass1, setUserPass1] = useState("");
  const [userPass2, setUserPass2] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [mailError, setMailError] = useState("");
  const [pass1Error, setPass1Error] = useState("");
  const [pass2Error, setPass2Error] = useState("");
  
  const validateUsername = (value: string) => {
    const usernameRegEx = /^[a-zA-Z0-9]+$/;
    if (!usernameRegEx.test(value)) {
      setUsernameError("Имя пользователя может содержать только латинские буквы и цифры");
    } else {
      setUsernameError("");
    }
  };
  
  const validateEmail = (value: string) => {
    const mailRegEx = /@/;
    if (!mailRegEx.test(value)) {
      setMailError('Указан неверный формат e-mail. Отсутствует символ "@"')
    } else {
      setMailError("");
    }
  };
  
  const validatePassword1 = (value: string) => {
    const pass1RegEx = /^[a-z]+$/;
    if (!pass1RegEx.test(value)) {
      setPass1Error("Пароль должен содержать только латинские буквы в нижнем регистре");
    } else {
      setPass1Error("");
    }
  };
  
  useEffect(() => {
    if (userPass1 !== userPass2) {
      setPass2Error("Пароли не совпадают");
    } else {
      setPass2Error("");
    }
  }, [userPass1, userPass2]);
  
  const handleSignUp = async () => {
    setUsernameError("");
    setMailError("");
    setPass1Error("");
    setPass2Error("");
    setError("");
    
    if (username && userPass1 && userPass1 === userPass2) {
      const usernameRegEx = /^[a-zA-Z0-9]+$/;
      const mailRegEx = /@/;
      const pass1RegEx = /^[a-z]+$/;
      
      if (!usernameRegEx.test(username)) {
        setUsernameError("Имя пользователя может содержать только латинские буквы и цифры");
        return;
      }
      
      if (!mailRegEx.test(mail)) {
        setMailError('Указан неверный формат e-mail');
        return;
      }
      
      if (!pass1RegEx.test(userPass1)) {
        setPass1Error("Пароль должен содержать хотя бы одну заглавную букву");
        return;
      }
      
      if (userPass1 !== userPass2) {
        setPass2Error("Пароли не совпадают");
        return;
      }
      
      try {
      let coordinates: any[] = []
      if (localStorage.getItem('Coordinates') !=null) {
        const coord = localStorage.getItem('Coordinates')
        console.log(coord)
        if (coord !== null) {
          coordinates = coord.split(',');
        }
      }
  
      const newUser = {
        lat: coordinates[0].toString(),
        long: coordinates[1].toString(),
        email: '',
        username: '',
        password: '',
      };
  
      newUser.username = username;
      newUser.email = mail
      newUser.password = userPass1;
      localStorage.setItem("newUser", JSON.stringify(newUser));
      
      const response = await axios.post("http://localhost:5000/users/register", newUser);
      const user = response.data;
      console.log(user);
      setUser(user);
      localStorage.setItem("userJSON", JSON.stringify(user));
    } catch (error) {
      setError("Ошибка при регистрации пользователя");
    }
  } else {
    if (!username) {
      setUsernameError("Введите имя пользователя");
    }
    if (!userPass1) {
      setPass1Error("Введите пароль");
    }
    if (userPass1 !== userPass2) {
      setPass2Error("Пароли не совпадают");
    }
      setError("Некорректные данные для регистрации");
  }
};

return (
  <>
    <form className="login-form" action="#">
    <h1>Создайте пользователя</h1>
    <InputText
    type="text"
    placeholder="Придумайте имя пользователя"
    value={username}
    onChange={(e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    validateUsername(e.target.value);
    }}
    />
    {usernameError && <ErrorMessage error={usernameError} />}
    <InputText
    type="email"
    placeholder="Введите адрес электронной почты"
    value={mail}
    onChange={(e: ChangeEvent<HTMLInputElement>) => {
    setUserMail(e.target.value);
    validateEmail(e.target.value);
    }}
    />
    {mailError && <ErrorMessage error={mailError} />}
    <InputText
    type="password"
    placeholder="Придумайте пароль"
    value={userPass1}
    onChange={(e: ChangeEvent<HTMLInputElement>) => {
    setUserPass1(e.target.value);
    validatePassword1(e.target.value);
    }}
    />
    {pass1Error && <ErrorMessage error={pass1Error} />}
    <InputText
    type="password"
    placeholder="Подтвердите пароль"
    value={userPass2}
    onChange={(e: ChangeEvent<HTMLInputElement>) => {
    setUserPass2(e.target.value);
    }}
    />
    {pass2Error && <ErrorMessage error={pass2Error} />}
    <button className="login-button" onClick={handleSignUp} type="submit" disabled={!username || !userPass1 || userPass1 !== userPass2}>
    Зарегистрироваться
    </button>
    {error && <ErrorMessage error={error} />}
    </form>
    </>
    );
    };