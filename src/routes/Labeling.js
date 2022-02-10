import CommonPageLayout from "../components/layout/CommonPageLayout";
import React, { useState } from "react";
import Labeler from "../components/Labeler";
import { useParams } from "react-router-dom";

const Labeling = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <CommonPageLayout>
        <Labeler />
      </CommonPageLayout>
    </>
  );
};

export default Labeling;
