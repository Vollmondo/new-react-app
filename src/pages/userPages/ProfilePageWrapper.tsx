import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../models";
import axios from "axios";
import { ProfilePage } from "./ProfilePage";
import { BasePage } from "../basePage/BasePage";
import { UserContext } from "../../context/UserContext";
import { Loader } from "../../components/service/Loader";
import { ErrorMessage } from "../../components/service/ErrorMessage";

export const ProfilePageWrapper: React.FC = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${user}`);
        setUserData(response.data);
      } catch (error) {
        setError("Ошибка загрузки данных пользователя");
        console.error(error);
      }
    };
    if (user) {
      fetchUser();
    }
  }, []);
  
  useEffect(() => {
    if (!user){
      navigate('/login');
    }
  }, [user, navigate]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!userData) {
    return <Loader />;
  }

  return (
    <BasePage>
      <ProfilePage user={userData} />
    </BasePage>
  );
};