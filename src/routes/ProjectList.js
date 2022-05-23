import CommonPageLayout from "../components/layout/CommonPageLayout";
import React, { useState } from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import UploadProject from "../components/UploadProject";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

const { Title } = Typography;
export const GET_PROJECTLIST = gql`
  {
    projects {
      id
      project_name
      project_content
      project_type
    }
  }
`;

export const GET_CSV = gql`
  {
    projects {
      id
    }
  }
`;

const ProjectList = () => {
  const { data, loading } = useQuery(GET_PROJECTLIST);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    if (window.confirm("프로젝트 등록을 취소합니다.")) {
      setIsModalVisible(false);
    }
  };

  return (
    <>
      <CommonPageLayout>
        <Button onClick={showModal}>새 프로젝트 등록</Button>
        <Modal
          title="프로젝트 등록"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <UploadProject handleOk={handleOk} />
        </Modal>
        <Title level={3}>진행 중인 프로젝트</Title>
        {loading && <>loading...</>}
        <Row gutter={16}>
          {!loading &&
            data?.projects?.map((project) => (
              <Col span={8} key={project.id}>
                <Card title={project.project_name} bordered={false}>
                  <Card.Meta
                    title={project.project_content}
                    description={project.description}
                  />
                  <Link to={`upload/${project.id}`}>
                    <Button style={{ marginBottom: 8, marginTop: 8 }} block>
                      이미지 업로드
                    </Button>
                  </Link>
                  <Link to={`labeling/${project.id}`}>
                    <Button style={{ marginBottom: 8 }} block type="primary">
                      이미지 라벨링
                    </Button>
                  </Link>
                  <Link to={`uploaded/${project.id}`}>
                    <Button style={{ marginBottom: 8 }} block>
                      업로드된 이미지
                    </Button>
                  </Link>{" "}
                  <Link to={`download/${project.id}`}>
                    <Button block type="danger">
                      export CSV
                    </Button>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </CommonPageLayout>
    </>
  );
};

export default ProjectList;
