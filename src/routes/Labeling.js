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
      original_width
      original_height
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
  const userId = localStorage.getItem("userId");
  const { data } = useQuery(WORKER_FILE, {
    variables: { userId: userId },
  });

  console.log(data);
  return (
    <>
      <CommonPageLayout>
        <Typography.Title level={3}>
          더블 클릭 시 이동모드, 라벨모드
        </Typography.Title>
        {data && (
          <Labeler
            _id={data?.workerFile?._id}
            data={data?.workerFile?.ai_data}
            filename={data?.workerFile?.filename}
            original_width={data?.workerFile?.original_width}
            original_height={data?.workerFile?.original_height}
            id={parseInt(id)}
          />
        )}
      </CommonPageLayout>
    </>
  );
};

export default Labeling;
