import React from "react";
import Block from "./Block";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Login from "../Login";

const NavbarWrapper = styled.div`
  border-bottom: 1px solid #efefef;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MenuItem = styled.div`
  margin: 0 24px;
  color: black;
`;

const MenuLogo = styled.div``;
const MenuContent = styled.div`
  display: flex;
`;
const MenuProfile = styled.div`
  cursor: pointer;
`;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <Block>
        <Menu mode="horizontal" style={{ border: 0 }}>
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
            <Login />
          </MenuProfile>
        </Menu>
      </Block>
    </NavbarWrapper>
  );
};

export default Navbar;
