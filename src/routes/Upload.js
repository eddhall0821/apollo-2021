import CommonPageLayout from "../components/layout/CommonPageLayout";
import { Uploader } from "../Uploader";
import React, { useState } from "react";

const Upload = () => {
  return (
    <CommonPageLayout>
      <Uploader />
    </CommonPageLayout>
  );
};

export default Upload;
