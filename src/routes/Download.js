import CommonPageLayout from "../components/layout/CommonPageLayout";
import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import { CSVLink } from "react-csv";

export const PROJECT = gql`
  query Project($id: Int!) {
    project(id: $id) {
      id
      filename
      worker_data {
        x
        y
        width
        height
        rotate
        text
      }
    }
  }
`;

const Download = () => {
  const { id } = useParams();
  const [convertedData, setConvertedData] = useState([]);
  const { data, loading } = useQuery(PROJECT, {
    variables: { id: parseInt(id) },
    onCompleted: () => setConvertedData(convertdata(data)),
  });

  if (loading) {
    console.log(loading);
  }
  const convertdata = (data) => {
    const convert = data?.project?.map((data) => {
      return {
        ...data,
        worker_data: JSON.stringify(data.worker_data).replace(/['"]+/g, ""),
      };
    });
    console.log(convert);

    return convert;
  };

  return (
    <>
      <CommonPageLayout>
        {convertedData && (
          <CSVLink
            data={convertedData}
            headers={[
              { label: "filename", key: "filename" },
              { label: "worker_data", key: "worker_data" },
            ]}
          >
            download me.
          </CSVLink>
        )}
      </CommonPageLayout>
    </>
  );
};

export default Download;
