import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button, Card, Form, Input, Space, Image as ImageTag } from "antd";
import styled from "styled-components";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { filesQuery } from "../Files";

const LABEL_SUBMIT = gql`
  mutation LabelSubmit($_id: String!, $id: Int!, $data: [labeledDataInput]) {
    labelSubmit(_id: $_id, id: $id, data: $data)
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ScrollerContainer = styled.div`
  display: block;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
`;

const Labeler = ({ data, id, _id, filename, original_width, original_height }) => {
  //refetchQueries 테스트
  const [labelSubmit, args] = useMutation(LABEL_SUBMIT, {
    refetchQueries: [{ query: filesQuery }],
  });
  // const [uploadFile, { data }] = useMutation(uploadFileMutation, {
  //   refetchQueries: [{ query: filesQuery }],
  // });

  const cropperRef = useRef(null);
  const [cropForm] = Form.useForm();
  const [croppedData, setCroppedData] = useState([]);
  const [croppedURL, setCroppedURL] = useState([]);
  const [ready, setReady] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  useEffect(() => {
    const loadData = () => {
      let url = [];
      const cropper = cropperInit();

      for (let item of data) {
        cropper.setData(item);
        url.push(cropper.getCroppedCanvas()?.toDataURL());
      }

      setCroppedData(data);
      setCroppedURL(url);
    };

    console.log(ready, data, _id);
    if (ready && data.length !== 0) {
      loadData();
    }
  }, [ready, data]);

  const onSubmit = () => {
    const labeledDataArray = croppedData.map((data) => {
      let c = {
        ...data,
        x: Math.round(data.x),
        y: Math.round(data.y),
        height: Math.round(data.height),
        width: Math.round(data.width),
      };
      return c;
    });
    const data = {
      id,
      labeledDataArray,
    };
    labelSubmit({ variables: { _id, id, data: labeledDataArray } });
    console.log(args);
  };

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

  const updateText = (index) => (e) => {
    setCroppedData(
      croppedData.map((item, i) =>
        i === index ? { ...item, text: e.target.value } : item
      )
    );
  };

  const deleteText = (index) => {
    let newArr = [...croppedData];
    let URLArr = [...croppedURL];

    URLArr.splice(index, 1);
    newArr.splice(index, 1);

    setCroppedURL(URLArr);
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

    let resultData = cropper.getData();
    const resultURL = cropper.getCroppedCanvas().toDataURL();
    let editData = [...croppedData];
    let editURL = [...croppedURL];

    editData[editIndex] = Object.assign({}, editData[editIndex], resultData);
    editURL[editIndex] = resultURL;

    cropForm.resetFields();
    setCroppedData(editData);
    setCroppedURL(editURL);
    setIsEdit(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const Canvas = ({ id, filename }) => {
    const canvas = React.useRef();
    React.useEffect(() => {
      const context = canvas.current.getContext('2d');
      const image = new Image();
      image.src = `http://localhost:4000/images/${id}/${filename}`;
      image.onload = () => {
        console.log("draw")
        context.drawImage(image, 0, 0);
      };

    });
    return (
      <canvas ref={canvas} width={original_width} height={original_height} />
    );
  };

  return (
    <>
      <Container>
        <Space style={{ marginBottom: 8 }}>
          <div>
            <Cropper
              src={`http://localhost:4000/images/${id}/${filename}`}
              // src="https://static-clova.pstatic.net/static/public/font_event/pc_hangeul_1008/format_pc_han_001@2x.jpg"
              style={{ height: 500, width: 600 }}
              initialAspectRatio={1}
              guides={false}
              preview=".preview"
              ref={cropperRef}
              // checkCrossOrigin={false}
              // crossOrigin="anonymous"
              ready={() => setReady(true)}
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
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" block type="primary" size="large">
                      CROP
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </Space>
          </div>
          {
            id && filename && <Canvas id={id} filename={filename} />
          }

        </Space>
      </Container>
      <ScrollerContainer>
        <ScrollMenu>
          <Space>
            {croppedData.map((result, i) => (
              <Card
                onClick={() => editText(i)}
                key={i}
                hoverable
                style={{ width: 240 }}
              >
                <ImageContainer>
                  <ImageTag
                    style={{ maxHeight: 180, maxWidth: 200 }}
                    src={croppedURL[i]}
                  />
                </ImageContainer>

                <Space direction="vertical">
                  <Input value={result.text} onChange={updateText(i)} />
                  <Button block danger onClick={() => deleteText(i)}>
                    삭제
                  </Button>
                </Space>
              </Card>
            ))}
          </Space>
        </ScrollMenu>
        <Button size="large" onClick={() => onSubmit()} type="primary">
          작업 완료
        </Button>
      </ScrollerContainer>
    </>
  );
};

export default Labeler;
