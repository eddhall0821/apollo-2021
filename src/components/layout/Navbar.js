import { Layout, Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Block from "./Block";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavbarWrapper = styled.div`
  border-bottom: 1px solid #efefef;
`;
const Navbar = () => {
  return (
    <NavbarWrapper>
      <Block>
        <Menu mode="horizontal" style={{ border: 0 }}>
          <Menu.Item key="home" icon={<MailOutlined />}>
            <Link to="/">홈</Link>
          </Menu.Item>
          <Menu.Item key="upload" icon={<MailOutlined />}>
            <Link to="/upload">이미지 업로드</Link>
          </Menu.Item>
          <Menu.Item key="labeling" icon={<MailOutlined />}>
            <Link to="/labeling">이미지 라벨링</Link>
          </Menu.Item>
        </Menu>
      </Block>
    </NavbarWrapper>
  );
};

export default Navbar;
