import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BasePage } from "../basePage/BasePage";
import { Loader } from "../../components/service/Loader";
import { ErrorMessage } from "../../components/service/ErrorMessage";
import './ProfilePage.css';
import { IUser } from "../../models";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUser } from "../../store/User.Slice";
import { EditProfile } from "./EditProfile";

export const ProfilePageWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const id = user.user?._id;
      const LoadProfile = async () => {
        try {
          const response = await axios.get<IUser>(`http://localhost:5000/userProfile/${id}`);
          const userProfileData = response.data;
          if (userProfileData.avatar === "") {
            userProfileData.avatar = "../img/149452.png";
          }
          setUserData(userProfileData);
          dispatch(setUser(userProfileData)); 
        } catch (error) {
          setError("Ошибка загрузки профиля пользователя");
        }
      };
      LoadProfile();
    } else {
      setError("Пользователь не найден");
      navigate('/login');
    }
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const handleEditProfile = () => {
    setEditingItem(true);
  };

  return (
    <BasePage>
      {userData ? (
        <div className="profile-container">
          <h1>Профиль пользователя</h1> 
          <img className="profile-user-info-edit" src="../img/icons8-edit-64.png" alt="edit" onClick={handleEditProfile} />
          <div className="profile-main-block">
            <div className="profile-photo-container">
              <img className="profile-photo" src={userData.avatar} alt="avatar" />
            </div>
            {editingItem ? (<EditProfile/>):(
                <div className="profile-user-info">
                <div className="profile-user-info-row">
                  <p>Потльзователь: {userData.username}</p>
                </div>
                <div className="profile-user-info-row">
                  <p>ФИО: {userData.name?.lastname} {userData.name?.firstname} {userData.name?.patronymic}</p>  
                </div>
                <div className="profile-user-info-row">
                  <p>Дата рождения: {userData.birthdate}</p>
                </div>
                <div className="profile-user-info-row">
                  <p>E-mail: {userData.email}</p>
                </div>
                <div className="profile-user-info-row">
                  <p>Тел.: {userData.phone}</p>
                </div>
                <div className="profile-user-info-row">
                  <p>Адрес: {userData.address?.zipcode}, г.{userData.address?.city}, ул.{userData.address?.street}, д.{userData.address?.number}</p>
                </div>
              </div>
              )
            }
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </BasePage>
  );
};