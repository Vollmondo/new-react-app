import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../../context/UserContext'
import axios from "axios";
import './LoginForm.css'
import { ErrorMessage } from "../../components/service/ErrorMessage";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface RegistrationFormProps {
  onTogglePanel: () => void;
}

type FormData = {
  username: string;
  email: string;
  pass1: string;
  pass2: string;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onTogglePanel }) => {
  const { setUser } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors, isDirty }, reset, watch } = useForm<FormData>({ mode: 'onChange' });
  const [error, setError] = useState("");
  const [coordinates, setCoordinates] = useState<number[]>([]);
  const username = watch("username");
  const email = watch("email");
  const userPass1 = watch("pass1");
  const userPass2 = watch("pass2");
  const navigate = useNavigate();


  useEffect(() => {
    const coord = localStorage.getItem('Coordinates');
    if (coord !== null) {
      const parsedCoordinates = coord.split(',').map(parseFloat);
      setCoordinates(parsedCoordinates);
    }
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const newUser = {
        lat: coordinates[0].toString(),
        long: coordinates[1].toString(),
        email: data.email,
        username: data.username,
        password: data.pass1,
      };

      localStorage.setItem("newUser", JSON.stringify(newUser));

      const response = await axios.post("http://localhost:5000/users/register", newUser);
      const user = response.data;
      console.log(user);
      setUser(user);
      localStorage.setItem("userJSON", JSON.stringify(user));
      reset();
      navigate("/home");
    } catch (error) {
      setError("Ошибка при регистрации пользователя");
    }
  }

  return (
    <>
      <form className="login-form" action="#" onSubmit={handleSubmit(onSubmit)}>
        <h1>Создайте пользователя</h1>
        <input
          className={`input-text ${errors.username ? 'error' : ''} ${ !errors.username && isDirty ? 'valid' : ''}`}
          type="text"
          placeholder="Придумайте имя пользователя"
          {...register('username', { required: true, minLength: 5, maxLength: 20, pattern: /^[a-zA-Z0-9]+$/ })}
        />
        {errors.username && errors.username.type === "required" && (
          <ErrorMessage error={"Введите имя пользователя"} />)}
        {errors.username && errors.username.type === "pattern" && (
          <ErrorMessage error={"Имя пользователя может содержать только латинские буквы и цифры"} />)}
        {errors.username && (username.length < 5 || username.length > 20) && (
          <ErrorMessage error={"Имя пользователя должно содержать не менее 5 и не более 20 символов"} />)}
        <input
          className={`input-text ${errors.email ? 'error' : ''}`}
          type="email"
          placeholder="Введите адрес электронной почты"
          {...register('email', { required: true, pattern: /@/ })}
        />
        {errors.email && errors.email.type === "required" && (
          <ErrorMessage error={"Введите email"} />)}
        {errors.email && errors.email.type === "pattern" && (
          <ErrorMessage error={'Указан неверный формат e-mail'} />)}
        <input
          className={`input-text ${errors.pass1 ? 'error' : ''}`}
          type="password"
          placeholder="Придумайте пароль"
          {...register('pass1', { required: true, pattern: /^[0-9a-z_,*-]+$/})}
        />
        {errors.pass1 && errors.pass1.type === "required" && (
          <ErrorMessage error={"Введите пароль"} />)}
        {errors.pass1 && errors.pass1.type === "pattern" && (
          <ErrorMessage error={'Пароль должен содержать только цифры и малые латинские буквы, а также один из символов "_", "-", "*" на Ваш выбор'} />)}
        <input
          className={`input-text ${userPass1 !== userPass2 ? 'error' : ''}`}
          placeholder="Подтвердите пароль"
          type="password"
          {...register('pass2', { required: true })}
        />
        {errors.pass2 && <ErrorMessage error={"Подтвердите пароль"} />}
        {userPass1 && userPass2 && userPass1 !== userPass2 && (
          <ErrorMessage error={'Введенные пароли не совпадают'} />)}
        <button className="login-button" type="submit" disabled={!username || !email || !userPass1 || userPass1 !== userPass2}>
          Зарегистрироваться
        </button>
        {error && <ErrorMessage error={error} />}
      </form>
    </>
  );
};
