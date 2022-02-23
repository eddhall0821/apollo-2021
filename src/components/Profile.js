import { useQuery } from "@apollo/react-hooks";
import { Menu } from "antd";
import { gql } from "apollo-boost";
import React from "react";
import Logout from "../routes/Logout";
import Login from "./Login";
const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const Profile = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Logout /> : <Login />;
};

export default Profile;
