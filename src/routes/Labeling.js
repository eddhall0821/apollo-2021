import CommonPageLayout from "../components/layout/CommonPageLayout";
import React, { useEffect } from "react";
import Labeler from "../components/Labeler";
import { useParams } from "react-router-dom";
import { Typography } from "antd";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
const WORKER_FILE = gql`
  mutation WorkerFile($userId: String!) {
    workerFile(userId: $userId) {
      id
      filename
      ai_data {
        x
        y
        width
        height
        rotate
        scaleX
        scaleY
        text
      }
    }
  }
`;

const Labeling = () => {
  const { id } = useParams();
  const [workerFile, { data }] = useMutation(WORKER_FILE);
  useEffect(() => {
    workerFile({ variables: { userId: "test@test.com" } });
  }, []);

  return (
    <>
      <CommonPageLayout>
        <Typography.Title level={3}>
          글자 영역에 드래그 해주세요.
        </Typography.Title>
        {data && <Labeler data={data?.workerFile?.ai_data} id={parseInt(id)} />}
      </CommonPageLayout>
    </>
  );
};

export default Labeling;
