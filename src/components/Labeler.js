import React, { useRef, useState, useContext } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button, Card, Form, Image, Input, Space, Typography } from "antd";
import styled from "styled-components";
import ScrollArea from "react-scrollbar";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Arrow = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScrollerContainer = styled.div`
  display: block;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
`;

const LeftArrow = ({ scrollPrev }) => {
  return <Arrow onClick={() => console.log(scrollPrev)}>{"<-"}</Arrow>;
};
const RightArrow = () => {
  return <Arrow>{"->"}</Arrow>;
};

const LOADED_DATA = [
  {
    x: 158.33890909090906,
    y: 16.927999999999937,
    width: 33.088000000000044,
    height: 45.408000000000044,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    text: "글",
  },
  {
    x: 328.79999999999995,
    y: 19.439999999999973,
    width: 55.84000000000003,
    height: 42.400000000000034,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    text: "쓰",
  },
  {
    x: 231.35999999999996,
    y: 100.07999999999997,
    width: 55.84000000000003,
    height: 42.400000000000034,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    text: "무",
  },
  {
    x: 244.79999999999998,
    y: 22.799999999999972,
    width: 55.84000000000003,
    height: 42.400000000000034,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    text: "많",
  },
];

const Labeler = () => {
  const cropperRef = useRef(null);
  const [cropForm] = Form.useForm();
  const [croppedData, setCroppedData] = useState([]);
  const [croppedURL, setCroppedURL] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  const cropperInit = () => {
    return cropperRef?.current?.cropper;
  };

  const onCrop = (values) => {
    const cropper = cropperInit();
    const resultData = cropper.getData();
    const resultURL = cropper.getCroppedCanvas().toDataURL();
    resultData.text = values.currentText;

    cropForm.resetFields();
    setCroppedData([resultData, ...croppedData]);
    setCroppedURL([resultURL, ...croppedURL]);
  };

  const loadData = (loadedData) => {
    const cropper = cropperInit();
    let url = [];

    loadedData?.map((data) => {
      console.log(data);
      cropper.setData(data);
      url.push(cropper.getCroppedCanvas().toDataURL());
    });

    setCroppedData(loadedData);
    setCroppedURL(url);
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const updateText = (index) => (e) => {
    let newArr = [...croppedData];
    newArr[index].text = e.target.value;

    setCroppedData(newArr);
  };

  const deleteText = (index) => {
    let newArr = [...croppedData];
    newArr.splice(index, 1);

    setCroppedData(newArr);
  };

  const editText = (index) => {
    const cropper = cropperInit();
    setIsEdit(true);
    setEditIndex(index);
    cropper.setData(croppedData[index]);
  };

  const onEditFinish = () => {
    const cropper = cropperInit();
    cropper.getData();

    const resultData = cropper.getData();
    const resultURL = cropper.getCroppedCanvas().toDataURL();

    let editData = [...croppedData];
    let editURL = [...croppedURL];

    editData[editIndex] = Object.assign(editData[editIndex], resultData);
    editURL[editIndex] = resultURL;

    cropForm.resetFields();
    setCroppedData(editData);
    setCroppedURL(editURL);
    setIsEdit(false);
  };

  return (
    <>
      <Container>
        <Typography.Title level={3}>글자 영역에 드래그 해주세요.</Typography.Title>

        <Space style={{ marginBottom: 8 }}>
          <div>
            <Cropper
              src="https://static-clova.pstatic.net/static/public/font_event/pc_intro_1008/format_pc_intro_003@2x.jpg"
              style={{ height: 500, width: 600 }}
              initialAspectRatio={1}
              guides={false}
              // crop={onCrop}
              preview=".preview"
              ref={cropperRef}
            />
          </div>

          <div style={{ width: 300 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div style={{ height: 300 }}>
                <div
                  className="preview"
                  style={{
                    width: "100%",
                    height: 300,
                    maxHeight: 300,
                    overflow: "hidden",
                  }}
                />
              </div>
              {isEdit && (
                <Form
                  form={cropForm}
                  onFinish={onEditFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                >
                  <Form.Item>
                    <Button block danger onClick={() => setIsEdit(false)}>
                      수정 취소
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" block type="primary">
                      수정 완료
                    </Button>
                  </Form.Item>
                </Form>
              )}

              {!isEdit && (
                <Form
                  form={cropForm}
                  onFinish={onCrop}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                >
                  <Form.Item
                    label="글자"
                    name="currentText"
                    rules={[
                      {
                        required: true,
                        message: "Please input text!",
                      },
                    ]}
                  >
                    <Input maxLength={1} size="large" />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" block type="primary" size="large">
                      CROP
                    </Button>
                  </Form.Item>
                </Form>
              )}
              <Button block onClick={() => loadData(LOADED_DATA)}>
                setData
              </Button>
            </Space>
          </div>
        </Space>
      </Container>
      <ScrollerContainer>
        <ScrollMenu>
          <Space>
            {croppedData.map((result, i) => (
              <Card key={i} hoverable style={{ width: 240 }}>
                <ImageContainer>
                  <Image
                    style={{ maxHeight: 180, maxWidth: 200 }}
                    src={croppedURL[i]}
                  />
                </ImageContainer>

                <Space direction="vertical">
                  <Input
                    maxLength={1}
                    value={result.text}
                    onChange={updateText(i)}
                  />
                  <Button onClick={() => editText(i)} block>
                    수정
                  </Button>
                  <Button block danger onClick={() => deleteText(i)}>
                    삭제
                  </Button>
                </Space>
              </Card>
            ))}
          </Space>
        </ScrollMenu>
        <Button
          size="large"
          onClick={() => console.log(croppedData)}
          type="primary"
        >
          작업 완료
        </Button>
      </ScrollerContainer>
    </>
  );
};

export default Labeler;
