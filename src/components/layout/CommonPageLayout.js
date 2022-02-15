import { Layout } from "antd";
import styled from "styled-components";
import Block from "./Block";
import Navbar from "./Navbar";
const GrayBackground = styled.div`
  background: #efefef;
`;

const CommonPageLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <GrayBackground>
        <Block>
          <Layout.Content style={{ height: "100%" }}>{children}</Layout.Content>
        </Block>
      </GrayBackground>
      <Layout.Footer>
        <Block>FOOTER</Block>
      </Layout.Footer>
    </>
  );
};

export default CommonPageLayout;
