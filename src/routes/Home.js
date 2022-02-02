import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "filepond/dist/filepond.min.css";
import { Files } from "../Files";
import Navbar from "../components/layout/Navbar";
import CommonPageLayout from "../components/layout/CommonPageLayout";

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

export default () => {
  const [movieTitle, setMovieTitle] = useState("");

  const { loading, error, data } = useQuery(GET_MOVIES);
  const [addMovie] = useMutation(ADD_MOVIE);
  const [deleteMovie] = useMutation(DELETE_MOVIE);

  function onSubmit(title) {
    addMovie({ variables: { title } });
  }

  console.log(loading, error, data);

  return (
    <>
      <CommonPageLayout>
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
      </CommonPageLayout>
    </>
  );
};
