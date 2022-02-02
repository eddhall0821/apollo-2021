import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";

export const filesQuery = gql`
  {
    files {
      filename
    }
  }
`;

export const Files = () => {
  const { data, loading } = useQuery(filesQuery);
  console.log(data);
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      {data.files.map((file, index) => (
        <img
          style={{ width: 200 }}
          key={index}
          src={`http://localhost:4000/images/${file.filename}`}
          alt={file.filename}
        />
      ))}
    </div>
  );
};
