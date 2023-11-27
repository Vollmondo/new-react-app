import React, { MouseEventHandler, useState } from "react";
import { IUser } from "../../models";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { saveUser, setUser } from "../../store/User.Slice";
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from "../../components/service/ErrorMessage";
import { ChangePassword } from "./ChangePassword";

export function EditProfile(){

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const [userData, setUserData] = useState<IUser | null>(null);
    const [editingItem, setEditingItem] = useState<boolean>(false);
    const { register, formState: { errors, isDirty }, watch, handleSubmit } = useForm<IUser>({ mode: 'onChange' });
    const username = watch("username");
    const email = watch("email");
    const worker = new Worker(new URL("../../workers/logger.worker.js", import.meta.url));

    const handleEdit: SubmitHandler<IUser> = async (data) => {
        if (user.user && user.user._id) {
        const formData = new FormData();
        formData.append('address.city', data.address?.city || '');
        formData.append('address.street', data.address?.street || '');
        formData.append('address.number', data.address?.number?.toString() || '');
        formData.append('address.zipcode', data.address?.zipcode || '');
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
        birthdate: formData.get('birthdate') as string,
      };
      worker.postMessage({ type: 'editProfile', data: { action: 'editProfile', message:'Профиль успешно изменен', user} });

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
                placeholder="Придумайте логин"
                {...register('username', { required: true, minLength: 5, maxLength: 20, pattern: /^[a-zA-Z0-9]+$/ })}
            />
            {errors.username && errors.username.type === "required" && (
                <ErrorMessage error={"Введите имя пользователя"} />)}
            {errors.username && errors.username.type === "pattern" && (
                <ErrorMessage error={"Имя пользователя может содержать только латинские буквы и цифры"} />)}
            {errors.username && username && (username.length < 5 || username.length > 20) && (
                <ErrorMessage error={"Имя пользователя должно содержать не менее 5 и не более 20 символов"} />)}
            <input
                className={`input-text ${errors.email ? 'error' : ''} ${ !errors.email && isDirty ? 'valid' : ''}`}
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
                className={`input-text ${errors.name?.firstname ? 'error' : ''} ${ !errors.name?.firstname && isDirty ? 'valid' : ''}`}
                type="text"
                defaultValue={user.user?.name?.firstname}
                placeholder="Укажите фамилию"
                {...register('name.firstname', { })}
            />
            <input
                className={`input-text ${errors.name?.lastname ? 'error' : ''} ${ !errors.name?.lastname && isDirty ? 'valid' : ''}`}
                type="text"
                defaultValue={user.user?.name?.lastname}
                placeholder="Укажите имя"
                {...register('name.lastname', { })}
            />
            <input
                className={`input-text ${errors.name?.patronymic ? 'error' : ''} ${ !errors.name?.patronymic && isDirty ? 'valid' : ''}`}
                type="text"
                defaultValue={user.user?.name?.patronymic}
                placeholder="Укажите отчество"
                {...register('name.patronymic', { })}
            />
            <input
                className={`input-text ${errors.birthdate ? 'error' : ''} ${ !errors.birthdate && isDirty ? 'valid' : ''}`}
                type="text"
                defaultValue={user.user?.birthdate}
                placeholder="Укажите дату рождения"
                {...register('birthdate', { })}
            />
            <input
                className={`input-text ${errors.phone ? 'error' : ''} ${ !errors.phone && isDirty ? 'valid' : ''}`}
                type="text"
                defaultValue={user.user?.phone}
                placeholder="Укажите телефон"
                {...register('phone', { })}
            />
            <div className="profile-user-info-row">Адрес: </div>
            <input
                className={`input-text ${errors.address?.zipcode ? 'error' : ''} ${ !errors.address?.zipcode && isDirty ? 'valid' : ''}`}
                type="text"
                defaultValue={user.user?.address?.zipcode}
                placeholder="Укажите почтовый индекс"
                {...register('address.zipcode', { })}
            />
            <input
                className={`input-text ${errors.address?.city ? 'error' : ''} ${ !errors.address?.city && isDirty ? 'valid' : ''}`}
                type="text"
                defaultValue={user.user?.address?.city}
                placeholder="Укажите город"
                {...register('address.city', { })}
            />
            <input
                className={`input-text ${errors.address?.street ? 'error' : ''} ${ !errors.address?.street && isDirty ? 'valid' : ''}`}
                type="text"
                defaultValue={user.user?.address?.street}
                placeholder="Укажите улицу"
                {...register('address.street', { })}
            />
            <input
                className={`input-text ${errors.address?.number ? 'error' : ''} ${ !errors.address?.number && isDirty ? 'valid' : ''}`}
                type="text"
                defaultValue={user.user?.address?.number}
                placeholder="Укажите номер дома"
                {...register('address.number', { })}
            />    
            <button className="login-button" type="submit" disabled={!username || !email }>
              Сохранить
            </button>
            </div>
        </form>
        

        </>
    )
}