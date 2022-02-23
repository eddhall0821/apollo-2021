import React from "react";
import Block from "./Block";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Profile from "../Profile";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";

const NavbarWrapper = styled.div`
  border-bottom: 1px solid #efefef;
`;

const MenuPc = styled.div`
  justify-content: space-between;
  font-size: 17px;
  font-weight: bold;
  display: none;

  @media only screen and (min-width: 768px) {
    display: flex;
  }
`;

const MenuMobile = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  font-weight: bold;

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.div`
  margin: 0 24px;
  color: black;
  display: flex;
  align-items: center;
`;

const MenuLogo = styled.div`
  display: flex;
  align-items: center;
`;
const MenuContent = styled.div`
  display: flex;
  align-items: center;
`;
const MenuProfile = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const menu_item = [
  {
    id: "about-team",
    link: "/",
    title: "about team",
  },
  {
    id: "project-list",
    link: "project_list",
    title: "프로젝트 목록",
  },
];

const menu = (
  <Menu>
    {menu_item.map((item) => (
      <Menu.Item key={item.id}>{item.title}</Menu.Item>
    ))}

    <Menu.Item>
      <Profile />
    </Menu.Item>
  </Menu>
);

const Navbar = () => {
  return (
    <NavbarWrapper>
      <Block>
        <MenuPc mode="horizontal" style={{ border: 0 }}>
          <MenuLogo>
            <Link style={{ color: "black " }} to="/">
              HOME
            </Link>
          </MenuLogo>
          <MenuContent>
            <MenuItem>
              <Link to="/">about team</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/project_list">프로젝트 리스트</Link>
            </MenuItem>
          </MenuContent>
          <MenuProfile>
            <Profile />
          </MenuProfile>
        </MenuPc>
        <MenuMobile>
          <MenuLogo>
            <Link style={{ color: "black " }} to="/">
              HOME
            </Link>
          </MenuLogo>
          <MenuContent>
            <Dropdown overlay={menu} placement="bottomRight">
              <UnorderedListOutlined />
            </Dropdown>
          </MenuContent>
        </MenuMobile>
      </Block>
    </NavbarWrapper>
  );
};

export default Navbar;
