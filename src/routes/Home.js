import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "filepond/dist/filepond.min.css";
import { Files } from "../Files";
import Navbar from "../components/layout/Navbar";
import CommonPageLayout from "../components/layout/CommonPageLayout";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Login from "./Login";

const GET_MOVIES = gql`
  {
    movies {
      id
      title
    }
  }
`;
const ADD_MOVIE = gql`
  mutation AddMovie($title: String!) {
    addMovie(data: { title: $title }) {
      id
      title
    }
  }
`;
const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: Int!) {
    deleteMovie(data: { id: $id }) {
      id
      title
    }
  }
`;
const HeaderContainer = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  background-color: rgba(0, 21, 41, 0);
`;

const Header = styled.header`
  max-width: 1200px;
  position: relative;
  margin: auto;
  will-change: transform;
  height: 100%;
  padding: 0 24px;
  font-size: 16px;
`;
const HeaderLogo = styled.div`
  float: left;
  line-height: 62px;
  display: inline-block;
  padding: 0 20px;
  cursor: pointer;
  background: 0 0;
  color: #fff;
  height: 64px;
  border-bottom-color: transparent;
  position: relative;
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    border 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const HeaderMenu = styled.div`
  float: right;
  line-height: 62px;
  display: inline-block;
  padding: 0 20px;
  cursor: pointer;
  background: 0 0;
  color: #fff;
  height: 64px;
  border-bottom-color: transparent;
  position: relative;
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    border 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Banner = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  text-align: center;
  border-color: #666;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/xTPkCNNLOnTEbGgVZOpE.jpg);
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
`;

const BannerTextWrapper = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 0;
  right: 0;
  color: #fff;
  max-width: 845px;
  height: 500px;
  width: 80%;
  font-size: 20px;
  line-height: 28px;
  font-weight: 400;
`;

const BannerSlogan = styled.div`
  font-size: 68px;
  line-height: 80px;
  text-indent: 2px;
  font-weight: 600;
  margin: 26px auto 38px;
  overflow: hidden;
`;

const BannerName = styled.div`
  font-size: 24px;
`;

const ContentWrapper = styled.div`
  position: relative;
  margin: auto;
  margin-top: -220px;
  overflow: initial;
  width: calc(100% - 112px);
  min-height: 878px;
  border-radius: 4px;
  box-shadow: 0 32px 32px rgb(34 94 222 / 8%);
  background: #fff;
`;

const Content = styled.div`
  margin-top: -220px;
  padding: 64px 24px;
  overflow: hidden;
  height: 100%;
  max-width: 1200px;
  position: relative;
  margin: auto;
  will-change: transform;
`;

const Home = () => {
  const [movieTitle, setMovieTitle] = useState("");

  const { loading, error, data } = useQuery(GET_MOVIES);
  const [addMovie] = useMutation(ADD_MOVIE);
  const [deleteMovie] = useMutation(DELETE_MOVIE);

  function onSubmit(title) {
    addMovie({ variables: { title } });
  }

  console.log(loading, error, data);
  const history = useHistory();

  return (
    <>
      {/* <CommonPageLayout> */}
      <HeaderContainer>
        <Header>
          <HeaderLogo>HOME</HeaderLogo>
          <HeaderMenu>
            <Login />
          </HeaderMenu>
          <HeaderMenu onClick={() => history.push("/project_list")}>
            프로젝트 리스트
          </HeaderMenu>
          <HeaderMenu>about team</HeaderMenu>
        </Header>
      </HeaderContainer>
      <Banner>
        <BannerTextWrapper>
          <BannerSlogan>DATA LABELING ASSISTANT</BannerSlogan>
          <BannerName>ai 기술을 활용한 데이터 라벨링 보조 서비스</BannerName>
        </BannerTextWrapper>
      </Banner>
      <ContentWrapper>
        <Content></Content>
      </ContentWrapper>
      <Files />

      <input
        type="text"
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      <button onClick={() => onSubmit(movieTitle)}>GO!</button>
      {data &&
        data.movies &&
        data.movies.map((movie) => <div key={movie.id}>{movie.title}</div>)}
      {/* </CommonPageLayout> */}
    </>
  );
};

export default Home;
