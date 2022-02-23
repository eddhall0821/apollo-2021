import CommonPageLayout from "../components/layout/CommonPageLayout";
import React, { useCallback, useState } from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import UploadProject from "../components/UploadProject";
import { useHistory } from "react-router-dom";
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
    if (window.confirm("프로젝트 등록을 취소합니다.")) {
      setIsModalVisible(false);
    }
  };
  const [test, setTest] = useState(0);

  const kkk = useCallback(() => {
    console.log(test);
  }, [test]);
  const history = useHistory();
  return (
    <>
      <CommonPageLayout>
        <Button onClick={() => kkk}>test</Button>
        <Button onClick={() => setTest(1)}>test</Button>
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
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8} onClick={() => history.push(`/labeling/${1}`)}>
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
