import { Form, Input, Button } from "antd";
import React, { useState } from "react";
import CommonPageLayout from "../components/layout/CommonPageLayout";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

export const LOGIN = gql`
  mutation Login($userId: String!, $password: String!) {
    login(userId: $userId, password: $password) {
      userId
      nickname
      role
    }
  }
`;

const Login = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN);
  if (loading) {
    console.log(loading);
  }

  if (data) {
    console.log(data);
  }

  if (error) {
    alert("ERROR");
  }

  const onFinish = ({ userId, password }) => {
    login({ variables: { userId, password } });
  };
  return (
    <CommonPageLayout>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="userId"
          name="userId"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </CommonPageLayout>
  );
};

export default Login;
