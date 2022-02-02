import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "filepond/dist/filepond.min.css";
import { Upload } from "../Upload";

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

const onChange = async (e) => {};

export default () => {
  const [movieId, setMovieId] = useState(0);
  const [movieTitle, setMovieTitle] = useState("");
  const [files, setFiles] = useState([]);

  const { loading, error, data } = useQuery(GET_MOVIES);
  const [addMovie] = useMutation(ADD_MOVIE);
  const [deleteMovie] = useMutation(DELETE_MOVIE);

  function onSubmit(id, title) {
    console.log(id, title);
    addMovie({ variables: { id, title } });
  }

  const onDelete = (id) => {
    deleteMovie({ variables: { id } });
  };
  console.log(loading, error, data);

  return (
    <>
      <Upload />

      <input
        type="text"
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      <button onClick={() => onSubmit(movieId, movieTitle)}>GO!</button>

      <button
        onClick={() => {
          console.log(files[0].file);
        }}
      >
        ff
      </button>

      <button
        onClick={() => {
          onDelete(123);
        }}
      >
        dfdf
      </button>
      {data &&
        data.movies &&
        data.movies.map((movie) => <div key={movie.id}>{movie.title}</div>)}
    </>
  );
};
