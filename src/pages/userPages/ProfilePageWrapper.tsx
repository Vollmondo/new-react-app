import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../../models";
import axios from "axios";
import { Loader } from "../../components/service/Loader";
import { ProfilePage } from "./ProfilePage";
import { BasePage } from "../basePage/BasePage";

export function ProfilePageWrapper() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState<IUser | null>(null);

  useEffect(() => {
    axios.get<IUser>(`https://fakestoreapi.com/users/${id}`)
      .then(response => {
        setUserProfile(response.data);
      })
      .catch(error => {
      });
  }, [id]);

  if (!userProfile) {
    return <Loader />;
  }
  return (
    <BasePage>
      <ProfilePage userProfile={userProfile} />
    </BasePage>
  )
}