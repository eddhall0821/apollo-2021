import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import CommonPageLayout from "../components/layout/CommonPageLayout";
import { Button } from "antd";

const TESSERACT = gql`
  mutation {
    tesseract
  }
`;

const Tesseract = () => {
  const [tesseract, { data }] = useMutation(TESSERACT);

  return (
    <CommonPageLayout>
      <Button onClick={() => tesseract()}>TESSER</Button>
    </CommonPageLayout>
  );
};

export default Tesseract;
