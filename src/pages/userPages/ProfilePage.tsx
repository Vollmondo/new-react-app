import React from "react";
import './ProfilePage.css';
import { IUser } from "../../models";

interface ProfilePageProps {
  userProfile: IUser;
}

export function ProfilePage({ userProfile }: ProfilePageProps) {
  return (
    <div className="profile-container">
        <div className="profile-main-block">
            <div className="profile-photo">
                <img src={userProfile.avatar} alt="avatar" />
                </div>
            <div className="profile-user-info">
                <div className="profile-user-info-row">
                    <p>Имя:</p>
                    <input defaultValue={userProfile.name.firstname} ></input>
                </div>
                <div className="profile-user-info-row">
                    <p>Фамилия:</p>
                    <input defaultValue={userProfile.name.lastname}></input>
                </div>
                <div className="profile-user-info-row">
                    <p>Отчество:</p>
                    <input defaultValue={userProfile.name.patronymic}></input>
                </div>
                <div className="profile-user-info-row">
                    <p>E-mail:</p>
                    <input defaultValue={userProfile.email}></input>
                </div>
                <div className="profile-user-info-row">
                    <p>Телефон:</p>
                    <input defaultValue={userProfile.phone}></input>
                </div>
            </div>
        </div>
        <div className="profile-main-block">

        </div>
    </div>
  );
}