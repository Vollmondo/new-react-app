import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BasePage } from "../basePage/BasePage";
import { Loader } from "../../components/service/Loader";
import { ErrorMessage } from "../../components/service/ErrorMessage";
import './ProfilePage.css';
import { IUser } from "../../models";
import { UserContext } from "../../context/UserContext";

export const ProfilePageWrapper: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserJSON = localStorage.getItem("userJSON");
    if (storedUserJSON) {
      const user = JSON.parse(storedUserJSON);
      const id = user._id;  
      const LoadProfile = async () => {
        try {
          const response = await axios.get<IUser>(`http://localhost:5000/userProfile/${id}`);
          const userProfileData = response.data;
          console.log(userProfileData);
          if (userProfileData.avatar === "") {
            userProfileData.avatar = "https://cdn-icons-png.flaticon.com/512/149/149452.png";
          }
          setUserData(userProfileData);
          setUser(userProfileData);  
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
          <div className="profile-main-block">
            <div className="profile-photo-container">
              <img className="profile-photo" src={userData.avatar} alt="avatar" />
            </div>
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
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </BasePage>
  );
};