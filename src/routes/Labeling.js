import CommonPageLayout from "../components/layout/CommonPageLayout";
import React, { useEffect, useState } from "react";
import Labeler from "../components/Labeler";
import { useParams } from "react-router-dom";
import { TEST_DATA } from "../static/test_data";

const Labeling = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setData(TEST_DATA);
      }, 1000);
    };

    fetchData();
  }, []);

  console.log(id);
  return (
    <>
      <CommonPageLayout>
        <Labeler data={data} />
      </CommonPageLayout>
    </>
  );
};

export default Labeling;
