import CommonPageLayout from "../components/layout/CommonPageLayout";
import React, { useState } from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import UploadProject from "../components/UploadProject";
const { Title } = Typography;

const ProjectList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    if (window.confirm("cancel?")) {
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
        >
          <UploadProject />
        </Modal>
        <Title level={3}>진행 중인 프로젝트</Title>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </CommonPageLayout>
    </>
  );
};

export default ProjectList;
