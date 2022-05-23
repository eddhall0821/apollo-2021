import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { SERVER } from "./apollo";

export const filesQuery = gql`
  {
    files {
      id
      filename
    }
  }
`;

export const Files = () => {
  const { data, loading } = useQuery(filesQuery);
  if (loading) {
    return <div>loading...</div>;
  }

  if (data) {
    console.log(data);
  }
  return (
    <div>
      {data?.files?.map((file, index) => (
        <img
          style={{ width: 200 }}
          key={index}
          src={`${SERVER}${file.id}/${file.filename}`}
          alt={file.filename}
        />
      ))}
    </div>
  );
};
