import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

const GET_MOVIES = gql`
  {
    movies {
      id
      title
    }
  }
`;
const ADD_MOVIE = gql`
  mutation AddMovie($id: Int!, $title: String!) {
    addMovie(data: { id: $id, title: $title }) {
      id
      title
    }
  }
`;

export default () => {
  const [movieId, setMovieId] = useState(0);
  const [movieTitle, setMovieTitle] = useState("");

  const { loading, error, data } = useQuery(GET_MOVIES);
  const [addMovie] = useMutation(ADD_MOVIE);

  function onSubmit(id, title) {
    console.log(id, title);
    addMovie({ variables: { id, title } });
  }

  console.log(loading, error, data);
  return (
    <>
      <input
        type="number"
        value={movieId}
        onChange={(e) => setMovieId(e.target.value)}
      />
      <input
        type="text"
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      <button onClick={() => onSubmit(movieId, movieTitle)}>GO!</button>
      {data &&
        data.movies &&
        data.movies.map((movie) => <div key={movie.id}>{movie.title}</div>)}
    </>
  );
};
