import React, { useState } from "react";
import axios from "axios";
import './LoginForm.css'
import { IUser } from "../../models";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../components/service/ErrorMessage";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/User.Slice";


interface LoginFormProps {
  onTogglePanel: () => void;
}

type FormData = {
  username: string;
  password: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onTogglePanel }) => {
  const dispatch = useAppDispatch()
  const { register, handleSubmit, formState: { errors, isDirty }, watch } = useForm<FormData>({ mode: 'onChange' });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const username = watch("username");
  const password = watch("password");

  const handleSignIn: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post<IUser>("http://localhost:5000/users/login", {
        username,
        password,
      });
      const user = response.data;
      dispatch(setUser(user));
      navigate("/home");
    } catch (error) {
      setError("Неверное имя пользователя или пароль");
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit(handleSignIn)}>
        <h1>Войти</h1>
        <input
          className={`input-text ${errors.username ? 'error' : ''} ${!errors.username && isDirty ? 'valid' : ''}`}
          type="text"
          placeholder="Введите имя пользователя"
          {...register('username', { required: true, minLength: 5, maxLength: 20, pattern: /^[a-zA-Z0-9]+$/ })}
        />
        {errors.username && errors.username.type === "required" && (
          <ErrorMessage error={"Вы не ввели имя пользователя"} />)}
        {errors.username && errors.username.type === "pattern" && (
          <ErrorMessage error={"Вероятно вы ошиблись во время ввода. \n Имя пользователя может содержать только латинские буквы и цифры"} />)}
        {errors.username && (username?.length < 5 || username?.length > 20) && (
          <ErrorMessage error={"Вероятно вы ошиблись во время ввода. \n Имя пользователя должно содержать не менее 5 и не более 20 символов"} />)}
        <input
          className={`input-text ${errors.password ? 'error' : ''}`}
          type="password"
          placeholder="Введите пароль"
          {...register('password', { required: true, pattern: /^[0-9a-z_,*-]+$/ })}
        />
        {errors.password && errors.password.type === "required" && (
          <ErrorMessage error={"Введите пароль"} />)}
        {errors.password && errors.password.type === "pattern" && (
          <ErrorMessage error={'Вероятно вы ошиблись во время ввода. \n Пароль должен содержать только цифры и малые латинские буквы, а также один из символов "_", "-", "*"'} />)}
        <button id="loginbutton" className="login-button" type="submit" disabled={(!username && errors.username && errors.username.type === "required") && (!password && errors.password && errors.password.type === "required")}>
          Войти
        </button>
        {error && <ErrorMessage error={error} />}
      </form>
    </>
  );
};