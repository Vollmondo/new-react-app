import React, { MouseEventHandler, useEffect, useState } from "react";
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
import { ChangePassword } from "./ChangePassword";

export const ProfilePageWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [editingProfile, setEditingProfile] = useState<boolean>(false);
  const [editingPwd, setEditingPwd] = useState<boolean>(false);


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
    setEditingProfile(!editingProfile);
  };

  const handleChangePassword: MouseEventHandler<HTMLParagraphElement> = async (data) => {
    setEditingPwd(!editingPwd) 
 };

  return (
    <BasePage>
      {userData ? (
        <div className="profile-container">
          <div className="profile-container-header">
            <h1>Профиль пользователя</h1> 
          </div>
          <div className="profile-main-block">
            <div>
              <div className="profile-photo-container">
                <img className="profile-photo" src={userData.avatar} alt="avatar" />
              </div>
              <div className="profile-user-infoBlock">
                {editingPwd ? (
                  <ChangePassword/>
                ):(
                  <div className="profile-user-text" onClick={handleChangePassword}><p>Сменить пароль</p></div>
                )}
                <img className="profile-user-info-edit" src="../img/icons8-edit-64.png" alt="edit" onClick={handleChangePassword} />
              </div>
            </div>
            <div className="profile-user-infoBlock">
              {editingProfile ? (<EditProfile/>):(
                <div className="profile-user-info">
                  <div>
                    <div className="profile-user-info-row">Логин: {userData.username}</div>
                    <div className="profile-user-info-row">E-mail: {userData.email}</div>
                  </div>
                  <div>
                    <div className="profile-user-info-row">Фамилия: {userData.name?.lastname}</div>  
                    <div className="profile-user-info-row">Имя: {userData.name?.firstname}</div>  
                    <div className="profile-user-info-row">Отчетсво: {userData.name?.patronymic}</div>
                    <div className="profile-user-info-row">Дата рождения: {userData.birthdate}</div>
                  </div>
                  <div>
                    <div className="profile-user-info-row">Тел.: {userData.phone}</div>
                    <div className="profile-user-info-row">Адрес: {userData.address?.zipcode}, г.{userData.address?.city}, ул.{userData.address?.street}, д.{userData.address?.number}
                    </div>
                  </div>
                </div>
              )}
              <img className="profile-user-info-edit" src="../img/icons8-edit-64.png" alt="edit" onClick={handleEditProfile} />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </BasePage>
  );
};