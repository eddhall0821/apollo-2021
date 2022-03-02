import { Form, Input, Button, Modal } from "antd";
import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Register from "./Register";
import { isLoggedInVar } from "../apollo";

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

export const LoginForm = ({ handleOk }) => {
  const [login, { data, loading, error }] = useMutation(LOGIN);
  if (loading) {
    console.log(loading);
  }

  if (data) {
    if (data.login) {
      localStorage.setItem("token", data.login.token);
      isLoggedInVar(true);
    } else {
      alert("계정 정보가 올바르지 않습니다.");
    }
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
          로그인
        </Button>
      </Form.Item>
      <Form.Item>
        <Button block onClick={handleOk}>
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
        <LoginForm handleOk={handleOk} />
      </Modal>
    </>
  );
};

export default Login;
