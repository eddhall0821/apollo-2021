import CommonPageLayout from "../components/layout/CommonPageLayout";
import { Uploader } from "../Uploader";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { PROJECT_VALIDATION } from "../query/valid";
import { Typography } from "antd";

const Upload = () => {
  const { id } = useParams();
  const { data } = useQuery(PROJECT_VALIDATION, {
    variables: { id: parseInt(id), project_type: "upload" },
  });

  return (
    <CommonPageLayout>
      <Typography.Title level={3}>이미지를 업로드해주세요.</Typography.Title>
      {data?.projectValidation && <Uploader id={parseInt(id)} />}
      {!data?.projectValidation && <>wrong id</>}
    </CommonPageLayout>
  );
};

export default Upload;
