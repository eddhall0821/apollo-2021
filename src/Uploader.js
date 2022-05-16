import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { filesQuery } from "./Files";

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!, $id: Int!) {
    uploadFile(file: $file, id: $id)
  }
`;

export const Uploader = ({ id }) => {
  const [uploadFile, { data }] = useMutation(uploadFileMutation, {
    refetchQueries: [{ query: filesQuery }],
  });

  const onDrop = useCallback(
    (file) => {
      uploadFile({ variables: { file, id } });
    },
    [uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (data?.uploadFile) {
      alert("업로드가 완료되었습니다.");
    }
  }, [data]);
  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </>
  );
};
