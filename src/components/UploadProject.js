import CommonPageLayout from "../components/layout/CommonPageLayout";
import React, { useState } from "react";
import { DatePicker, Form, Input } from "antd";
import { Uploader } from "../Uploader";

const UploadProject = () => {
  return (
    <>
      <Form layout="vertical">
        <Form.Item label="프로젝트 명">
          <Input showCount maxLength={20} onChange={() => console.log("e")} />
        </Form.Item>
        <Form.Item label="프로젝트 설명">
          <Input showCount maxLength={20} onChange={() => console.log("e")} />
        </Form.Item>
        <Form.Item label="프로젝트 기간">
          <DatePicker.RangePicker picker="month" />
        </Form.Item>
        <Form.Item label="파일 업로드">
          <Uploader />
        </Form.Item>
      </Form>
    </>
  );
};

export default UploadProject;
