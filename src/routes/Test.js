import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const GET_TESTS = gql`
  query GetTests {
    tests @client
  }
`;

export default () => {
  const { loading, error, data } = useQuery(GET_TESTS);
  console.log(loading, error, data);

  return (
    <div>
      {data?.tests?.map((data, i) => (
        <div key={i}>
          <p1>test</p1>
          <button>del</button>
        </div>
      ))}
    </div>
  );
};
