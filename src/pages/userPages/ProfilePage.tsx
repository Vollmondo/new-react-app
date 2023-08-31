import React from "react";
import './ProfilePage.css';
import { IUser } from "../../models";

interface ProfilePageProps {
  user: IUser;
}

export function ProfilePage({ user }: ProfilePageProps) {
  return (
    <div className="profile-container">
        <div className="profile-main-block">
            <div className="profile-photo">
                <img src={user.avatar} alt="avatar" />
                </div>
            <div className="profile-user-info">
                <div className="profile-user-info-row">
                    <p>ID пользователя: {user.id}</p>
                </div>
                <div className="profile-user-info-row">
                    <p>Имя: {user.name.firstname} {user.name.lastname}</p>
                    {user.name.patronymic && <p>Отчество: {user.name.patronymic}</p>}
                </div>
                <div className="profile-user-info-row">
                    <p>Дата рождения: {user.birthdate}</p>
                </div>
                <div className="profile-user-info-row">
                    <p>Email: {user.email}</p>
                </div>
                <div className="profile-user-info-row">
                    <p>Телефон: {user.phone}</p>
                </div>
                <div className="profile-user-info-row">
                    <p>Адрес: {user.address.street} {user.address.number}, {user.address.zipcode} {user.address.city}</p>
                </div>
            </div>
        </div>
        <div className="profile-main-block">

        </div>
    </div>
  );
}