import CommonPageLayout from "../components/layout/CommonPageLayout";
import React from "react";
import Labeler from "../components/Labeler";
import { useParams } from "react-router-dom";
import { Typography } from "antd";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const WORKER_FILE = gql`
  query WorkerFile($userId: String!) {
    workerFile(userId: $userId) {
      _id
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
  const { data } = useQuery(WORKER_FILE, {
    variables: { userId: "test@test.com" },
  });

  console.log(data);
  return (
    <>
      <CommonPageLayout>
        <Typography.Title level={3}>
          글자 영역에 드래그 해주세요.
        </Typography.Title>
        {data && (
          <Labeler
            _id={data?.workerFile?._id}
            data={data?.workerFile?.ai_data}
            filename={data?.workerFile?.filename}
            id={parseInt(id)}
          />
        )}
      </CommonPageLayout>
    </>
  );
};

export default Labeling;
