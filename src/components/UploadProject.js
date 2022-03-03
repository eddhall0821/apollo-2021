import React from "react";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import {Uploader} from "../Uploader"

// mutation AddMovie($title: String!) {
//   addMovie(data: { title: $title }) {
//     id
//     title
//   }
// }

export const ADD_PROJECT = gql`
  mutation AddProject($data: projectInput!) {
    addProject(data: $data)
  }
`;

const UploadProject = ({ handleOk }) => {
  const [addProject, { data, loading, error }] = useMutation(ADD_PROJECT);

  const onFinish = (values) => {
    const project = {
      ...values,
      start_date: values.project_date[0].format("YYYY-MM-DD"),
      end_date: values.project_date[1].format("YYYY-MM-DD"),
    };
    delete project.project_date;
    addProject({
      variables: {data: project},
    });
    // handleOk();
  };

  const onFinishFailed = (e) => {
    console.log(e);
  };

  return (
    <>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={"optiodnal"}
      >
        <Form.Item
          label="프로젝트 명"
          name="project_name"
          rules={[{ required: true, message: " 프로젝트 명을 입력해주세요." }]}
        >
          <Input showCount maxLength={20} />
        </Form.Item>
        <Form.Item
          label="프로젝트 설명"
          name="project_content"
          rules={[{ required: true, message: "프로젝트 설명을 입력해주세요." }]}
        >
          <Input showCount maxLength={20} />
        </Form.Item>
        <Form.Item
          label="프로젝트 기간"
          name="project_date"
          rules={[{ required: true, message: "프로젝트 기간을 입력해주세요." }]}
        >
          <DatePicker.RangePicker
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
          />
        </Form.Item>
        <Form.Item
          label="프로젝트 타입"
          name="project_type"
          rules={[{ required: true, message: "프로젝트 타입을 입력해주세요." }]}
        >
          <Select style={{ width: "100%" }}>
            <Select.Option value="labeling">이미지 라벨링</Select.Option>
            <Select.Option value="upload">이미지 업로드</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="목표량"
          name="amount"
          rules={[{ required: true, message: "목표량을 입력해주세요." }]}
        >
          <InputNumber style={{ width: "100%" }} min={1} max={500} />
        </Form.Item>
        <Form.Item label="파일 업로드">
          <Uploader />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" block>
            프로젝트 등록
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UploadProject;
