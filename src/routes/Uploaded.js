import CommonPageLayout from "../components/layout/CommonPageLayout";
import React from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Typography, Card, Avatar, Row, Col } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { gql } from "apollo-boost";
import { SERVER } from "../apollo";

export const UPLOAED_FILE = gql`
  query Project($id: Int!) {
    project(id: $id) {
      _id
      id
      filename
      ai_worked
      worked
    }
  }
`;
export const DELETE_FILE = gql`
  mutation DeleteFile($_id: String!, $id: Int!, $filename: String!) {
    deleteFile(_id: $_id, id: $id, filename: $filename)
  }
`;

const { Meta } = Card;
const Uploaded = () => {
  const { id } = useParams();
  const { data } = useQuery(UPLOAED_FILE, {
    variables: { id: parseInt(id) },
  });
  const [deleteFile, args] = useMutation(DELETE_FILE);
  console.log(args);
  return (
    <CommonPageLayout>
      <Typography.Title level={3}>업로드된 이미지</Typography.Title>
      {console.log(data?.project)}
      <Row gutter={[8, 8]}>
        {data?.project?.map((file) => (
          <Col span={8} key={file.filename}>
            <Card
              cover={
                <img
                  alt={file.filename}
                  src={`${SERVER}/images/${file.id}/${file.filename}`}
                />
              }
              actions={[
                <SettingOutlined
                  key="setting"
                  onClick={() => {
                    deleteFile({
                      variables: {
                        _id: file._id,
                        id: parseInt(file.id),
                        filename: file.filename,
                      },
                    });
                  }}
                />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={file.filename}
                description="This is the description"
              />
            </Card>
          </Col>
        ))}
      </Row>
    </CommonPageLayout>
  );
};

export default Uploaded;
