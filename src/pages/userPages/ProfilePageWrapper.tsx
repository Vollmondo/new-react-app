import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BasePage } from "../basePage/BasePage";
import { Loader } from "../../components/service/Loader";
import { ErrorMessage } from "../../components/service/ErrorMessage";
import './ProfilePage.css';
import { IUser } from "../../models";
import { UserContext } from "../../context/UserContext";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUser } from "../../store/User.Slice";

export const ProfilePageWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  return (
    <BasePage>
      {userData ? (
        <div className="profile-container">
          <h1>Профиль пользователя</h1>
          <div className="profile-main-block">
            <div className="profile-photo-container">
              <img className="profile-photo" src={userData.avatar} alt="avatar" />
            </div>
            <div className="profile-user-info">
              <div className="profile-user-info-row">
                <p>Потльзователь: {userData.username}</p>
                <img className="profile-user-info-edit" src="../img/icons8-edit-64.png" alt="edit"/>
              </div>
              <div className="profile-user-info-row">
                <p>ФИО: {userData.name?.lastname} {userData.name?.firstname} {userData.name?.patronymic}</p>
                <img className="profile-user-info-edit" src="../img/icons8-edit-64.png" alt="edit"/>
              </div>
              <div className="profile-user-info-row">
                <p>Дата рождения: {userData.birthdate}</p>
                <img className="profile-user-info-edit" src="../img/icons8-edit-64.png" alt="edit"/>
              </div>
              <div className="profile-user-info-row">
                <p>E-mail: {userData.email}</p>
                <img className="profile-user-info-edit" src="../img/icons8-edit-64.png" alt="edit"/>
              </div>
              <div className="profile-user-info-row">
                <p>Тел.: {userData.phone}</p>
                <img className="profile-user-info-edit" src="../img/icons8-edit-64.png" alt="edit"/>
              </div>
              <div className="profile-user-info-row">
                <p>Адрес: {userData.address?.zipcode}, г.{userData.address?.city}, ул.{userData.address?.street}, д.{userData.address?.number}</p>
                <img className="profile-user-info-edit" src="../img/icons8-edit-64.png" alt="edit"/>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </BasePage>
  );
};