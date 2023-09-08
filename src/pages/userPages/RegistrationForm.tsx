import React, { useContext, useState } from "react";
import { UserContext } from '../../context/UserContext'
import axios from "axios";
import './LoginForm.css'
import { IUser } from "../../models";
import { InputText } from "../../components/service/InputForm";

interface RegistrationFormProps {
  onTogglePanel: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onTogglePanel }) => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [userPass1, setUserPass1] = useState("");
  const [userPass2, setUserPass2] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (username && userPass1 && userPass1 === userPass2) {
      try {
        const newUser: IUser = {
          address: { geolocation: { lat: '', long: '' }, city: '', street: '', number: 0, zipcode: '' },
          email: '',
          username: '',
          password: '',
          avatar: '',
          name: { firstname: '', lastname: '', },
          phone: '',
          __v: 0,
          role: 'user',
        };

        newUser.username = username;
        newUser.password = userPass1;

        const response = await axios.post<IUser>("http://localhost:5000/users/register", newUser);
        const user = response.data;
        console.log(user);
        setUser(user);
        localStorage.setItem("userJSON", JSON.stringify(user));
      } catch (error) {
        setError("Error registering user");
      }
    } else {
      setError("Invalid registration details");
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
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUsername(e.target.value)}
        />
        <InputText
          type="password"
          placeholder="Придумайте пароль"
          value={userPass1}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUserPass1(e.target.value)}
        />
        <InputText
          type="password"
          placeholder="Подтвердите пароль"
          value={userPass2}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUserPass2(e.target.value)}
        />
        <button className="login-button" onClick={handleSignUp}>
          Зарегистрироваться
        </button>
      </form>
    </>
  );
};