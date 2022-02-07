import { Button } from "antd";
import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { currentUserVar } from "../apollo";

const LOGOUT = gql`
  mutation {
    logout
  }
`;
const Logout = () => {
  const [logout, args] = useMutation(LOGOUT);

  return (
    <>
      <Button onClick={() => console.log(currentUserVar())}>dfdf</Button>
      <Button onClick={() => logout()}>LOGOUT</Button>
    </>
  );
};

export default Logout;
