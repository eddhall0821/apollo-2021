import CommonPageLayout from "../components/layout/CommonPageLayout";
import React, { useState } from "react";
import Labeler from "../components/Labeler";

const Labeling = () => {
  return (
    <>
      <CommonPageLayout>
        <Labeler />
      </CommonPageLayout>
    </>
  );
};

export default Labeling;
