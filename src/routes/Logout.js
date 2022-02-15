import { Button } from "antd";
import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const LOGOUT = gql`
  mutation {
    logout
  }
`;
const Logout = () => {
  const [logout, args] = useMutation(LOGOUT);
  console.log(args);
  
  return (
    <>
      <Button onClick={() => logout()}>LOGOUT</Button>
    </>
  );
};

export default Logout;
