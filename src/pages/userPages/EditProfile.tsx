import React, { useEffect, useState } from "react";
import { IUser } from "../../models";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { saveUser, setUser } from "../../store/User.Slice";
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from "../../components/service/ErrorMessage";

type FormData = IUser & {
    pass1: string; 
    pass2: string; 
    pass3: string; 
  };

export function EditProfile(){

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const [userData, setUserData] = useState<IUser | null>(null);
    const [editingItem, setEditingItem] = useState<boolean>(false);
    const { register, formState: { errors, isDirty }, watch, handleSubmit } = useForm<FormData>({ mode: 'onChange' });
    const [data, setData] = useState<string | null>(null);
    const username = watch("username");
    const email = watch("email");
    const userPass1 = watch("pass1");
    const userPass2 = watch("pass2");
    const userPass3 = watch("pass3");

    const handleEdit: SubmitHandler<FormData> = async (data) => {
        if (user.user && user.user._id) {
        const formData = new FormData();
        if (data.address && data.address.geolocation) {
            formData.append('address.city', data.address.city || '');
            formData.append('address.street', data.address.street || '');
            formData.append('address.number', data.address.number?.toString() || '');
            formData.append('address.zipcode', data.address.zipcode || '');
        }
        formData.append('email', data.email || '');
        formData.append('username', data.username || '');
        formData.append('password', data.password || '');
        formData.append('avatar', data.avatar || '');
        formData.append('name.firstname', data.name?.firstname || '');
        formData.append('name.lastname', data.name?.lastname || '');
        formData.append('name.patronymic', data.name?.patronymic || '');
        formData.append('phone', data.phone || '');
        formData.append('birthdate', data.birthdate?.toString() || '');
      
      const userData: IUser = {
        address: {
          geolocation: {
            lat: formData.get('address.geolocation.lat') as string,
            long: formData.get('address.geolocation.long') as string
          },
          city: formData.get('address.city') as string,
          street: formData.get('address.street') as string,
          number: parseInt(formData.get('address.number') as string),
          zipcode: formData.get('address.zipcode') as string
        },
        _id: formData.get('_id') as string,
        email: formData.get('email') as string,
        username: formData.get('username') as string,
        password: formData.get('password') as string,
        avatar: formData.get('avatar') as string,
        name: {
          firstname: formData.get('name.firstname') as string,
          lastname: formData.get('name.lastname') as string,
          patronymic: formData.get('name.patronymic') as string
        },
        phone: formData.get('phone') as string,
        __v: parseInt(formData.get('__v') as string),
        role: formData.get('role') as string,
        birthdate: formData.get('birthdate') as string,
        fav: JSON.parse(formData.get('fav') as string)
      };
      console.log(userData)
      dispatch(saveUser(user.user._id, { ...userData, _id: user.user._id }));
      setEditingItem(false);
      setUserData(userData);
      window.location.reload()
    }
  };

    return(
        <>
        <form onSubmit={handleSubmit(handleEdit)}>
        <div className="profile-user-info">
              <input
                className={`input-text ${errors.username ? 'error' : ''} ${ !errors.username && isDirty ? 'valid' : ''}`}
                type="text"
                defaultValue={user.user?.username}
                placeholder="Придумайте имя пользователя"
                {...register('username', { required: true, minLength: 5, maxLength: 20, pattern: /^[a-zA-Z0-9]+$/ })}
              />
              {errors.username && errors.username.type === "required" && (
                <ErrorMessage error={"Введите имя пользователя"} />)}
              {errors.username && errors.username.type === "pattern" && (
                <ErrorMessage error={"Имя пользователя может содержать только латинские буквы и цифры"} />)}
              {errors.username && username && (username.length < 5 || username.length > 20) && (
                <ErrorMessage error={"Имя пользователя должно содержать не менее 5 и не более 20 символов"} />)}
              <input
                className={`input-text ${errors.email ? 'error' : ''}`}
                defaultValue={user.user?.email}
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
                placeholder="Введите старый пароль"
                {...register('pass1', { pattern: /^[0-9a-z_,*-]+$/})}
              />
              {errors.pass1 && errors.pass1.type === "required" && (
                <ErrorMessage error={"Введите пароль"} />)}
                <input
                className={`input-text ${errors.pass2 ? 'error' : ''}`}
                type="password"
                placeholder="Введите новый пароль"
                {...register('pass2', { pattern: /^[0-9a-z_,*-]+$/})}
              />
              {errors.pass2 && errors.pass2.type === "required" && (
                <ErrorMessage error={"Введите пароль"} />)}
              {errors.pass2 && errors.pass2.type === "pattern" && (
                <ErrorMessage error={'Пароль должен содержать только цифры и малые латинские буквы, а также один из символов "_", "-", "*" на Ваш выбор'} />)}
              <input
                className={`input-text ${userPass2 !== userPass3 ? 'error' : ''}`}
                placeholder="Подтвердите пароль"
                type="password"
                {...register('pass3', { })}
              />
              {errors.pass3 && <ErrorMessage error={"Подтвердите пароль"} />}
              {userPass2 && userPass3 && userPass2 !== userPass3 && (
                <ErrorMessage error={'Введенные пароли не совпадают'} />)}
            <button className="login-button" type="submit" disabled={!username || !email || !userPass2 || userPass2 !== userPass3}>
              Сохранить
            </button>
            </div>
        </form>
        </>
    )
}