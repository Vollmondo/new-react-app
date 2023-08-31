import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../../models";
import axios from "axios";
import { Loader } from "../../components/service/Loader";
import { ProfilePage } from "./ProfilePage";
import { BasePage } from "../basePage/BasePage";
import { UserContext } from "../../context/UserContext";

export const ProfilePageWrapper: React.FC = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState<IUser | null>(null); // Изменено имя переменной на userData

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${user}`);
        setUserData(response.data);
      } catch (error) {
        // Обработка ошибки
      }
    };
    if (user) {
      fetchUser();
    }
  }, [user]);

  if (!user) {
    return <p>Пожалуйста, выполните вход, чтобы просмотреть информацию о пользователе</p>;
  }

  if (!user) {
    return <p>Загрузка...</p>;
  }
  return (
    <BasePage>
      <ProfilePage user={user} />
    </BasePage>
  );
};