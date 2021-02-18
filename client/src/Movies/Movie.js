import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const history = useHistory();
  const {id} = useParams();
  

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };
  

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  const deleteMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then((result) => history.push('/'))
      .catch((error) => console.log('error deleting', error.message))
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save Movie
      </div>
      <div className="delete-button" onClick={deleteMovie}>
        delete Movie
      </div>
      </div>
  );
}

export default Movie;
