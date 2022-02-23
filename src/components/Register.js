import { useMutation } from "@apollo/react-hooks";
import { Button, Form, Input, Modal } from "antd";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import styled from "styled-components";
import Login from "./Login";
const RegisterButton = styled.div``;
export const REGISTER = gql`
  mutation Login($userId: String!, $nickname: String!, $password: String!) {
    signUp(userId: $userId, nickname: $nickname, password: $password)
  }
`;

const RegisterForm = ({ login }) => {
  const [register, { data }] = useMutation(REGISTER);

  const onFinish = ({ userId, nickname, password }) => {
    register({ variables: { userId, nickname, password } });
  };

  const onFinishFailed = () => {
    console.log("FAILED");
  };

  if (data) {
    console.log(data);
    if (data.signUp) {
      console.log("성공");
    } else {
      console.log("실패");
    }
  }

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      autoComplete="off"
      requiredMark={"optional"}
    >
      <Form.Item
        label="ID"
        name="userId"
        rules={[
          {
            required: true,
            type: "email",
            message: "이메일 형식에 맞지 않습니다.",
          },
          { required: true, message: "이메일을 입력해주세요." },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Nickname"
        name="nickname"
        rules={[{ required: true, message: "유저명을 입력해주세요." }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="password"
        hasFeedback
        rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="비밀번호 확인"
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "비밀번호를 확인해주세요." },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("비밀번호가 일치하지 않습니다."));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          회원가입 완료
        </Button>
      </Form.Item>
      <Form.Item>
        <Button block onClick={login}>
          <Login />
        </Button>
      </Form.Item>
    </Form>
  );
};

const Register = (on) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <RegisterButton onClick={showModal}>회원가입</RegisterButton>
      <Modal
        style={{ width: 300 }}
        title="회원가입"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <RegisterForm login={handleCancel} />
      </Modal>
    </>
  );
};

export default Register;
