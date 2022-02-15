import { Form, Input, Button, Modal } from "antd";
import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { currentUserVar } from "../apollo";
import styled from "styled-components";
import Register from "./Register";

const LoginButton = styled.div``;

export const LOGIN = gql`
  mutation Login($userId: String!, $password: String!) {
    login(userId: $userId, password: $password) {
      userId
      nickname
      role
      token
    }
  }
`;

export const LoginForm = ({ register }) => {
  const [login, { data, loading, error }] = useMutation(LOGIN);
  if (loading) {
    console.log(loading);
  }

  if (data) {
    console.log(data);
    currentUserVar(data.login);
  }

  if (error) {
    alert("ERROR");
  }

  const onFinish = ({ userId, password }) => {
    login({ variables: { userId, password } });
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      layout="vertical"
      autoComplete="off"
      requiredMark={"optional"}
    >
      <Form.Item
        label="ID"
        name="userId"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
      <Form.Item>
        <Button block onClick={register}>
          <Register />
        </Button>
      </Form.Item>
    </Form>
  );
};

const Login = () => {
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
      <LoginButton onClick={showModal}>로그인</LoginButton>
      <Modal
        style={{ width: 300 }}
        title="로그인"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <LoginForm register={handleCancel} />
      </Modal>
    </>
  );
};

export default Login;
