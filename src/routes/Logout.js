import { Button } from "antd";
import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { isLoggedInVar } from "../apollo";

const LOGOUT = gql`
  mutation {
    logout
  }
`;

const Logout = () => {
  const [logout, { data }] = useMutation(LOGOUT);
  const onLogout = () => {
    logout();
  };
  if (data?.logout) {
    localStorage.removeItem("token");
    isLoggedInVar(false);
  }

  return (
    <>
      <Button onClick={() => onLogout()}>LOGOUT</Button>
    </>
  );
};

export default Logout;
