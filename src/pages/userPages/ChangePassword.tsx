import React, { useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from "../../components/service/ErrorMessage";
import { changePassword } from "../../store/ChangePassword.Slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IUser } from "../../models";

type NewPwd = {
  oldPwd: string;
  newPwd: string;
};

export function ChangePassword() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [editingItem, setEditingItem] = useState<boolean>(false);
  const { register, formState: { errors }, watch, handleSubmit } = useForm<NewPwd>();
  const handleChangePassword: SubmitHandler<NewPwd> = (data) => {
    const oldPwd = data.oldPwd;
    const newPwd = data.newPwd;
    if (user.user?._id) {
      dispatch(changePassword(user.user._id, { oldPwd, newPwd }));
      setUserData(userData);
    }
    setEditingItem(false);

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleChangePassword)}>
      <input
        className={`input-text ${errors.oldPwd ? 'error' : ''}`}
        type="password"
        placeholder="Введите старый пароль"
        {...register('oldPwd', { required: true, pattern: /^[0-9a-z_,*-]+$/ })}
      />
      {errors.oldPwd && errors.oldPwd.type === "required" && (
        <ErrorMessage error={"Введите пароль"} />)}
      {errors.oldPwd && errors.oldPwd.type === "pattern" && (
        <ErrorMessage error={'Пароль должен содержать только цифры и малые латинские буквы, а также один из символов "_", "-", "*" на Ваш выбор'} />)}

      <input
        className={`input-text ${errors.newPwd ? 'error' : ''}`}
        type="password"
        placeholder="Введите новый пароль"
        {...register('newPwd', { required: true, pattern: /^[0-9a-z_,*-]+$/ })}
      />
      {errors.newPwd && errors.newPwd.type === "required" && (
        <ErrorMessage error={"Введите пароль"} />)}
      {errors.newPwd && errors.newPwd.type === "pattern" && (
        <ErrorMessage error={'Пароль должен содержать только цифры и малые латинские буквы, а также один из символов "_", "-", "*" на Ваш выбор'} />)}

      <button
        className="login-button"
        type="submit"
        disabled={!watch('newPwd') || watch('newPwd') === watch('oldPwd')}
      >Изменить пароль</button>
    </form>
  );
}