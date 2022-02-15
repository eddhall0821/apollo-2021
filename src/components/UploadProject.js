import React from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { Uploader } from "../Uploader";

const UploadProject = ({ handleOk }) => {
  const onFinish = (values) => {
    const data = {
      ...values,
      start_date: values.project_date[0].format("YYYY-MM-DD"),
      end_date: values.project_date[1].format("YYYY-MM-DD"),
    };
    delete data.project_date;

    console.log(data);
    handleOk();
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
            <Select.Option value="labeling">이미지 업로드</Select.Option>
            <Select.Option value="upload">이미지 라벨링</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="파일 업로드">
          <Uploader />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" block>
            프로젝트 업로드
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UploadProject;
