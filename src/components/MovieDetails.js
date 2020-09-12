import React from "react";

function MovieDetails({ movieTitle }) {
  return (
    <div>
      <h2>Movie Details</h2>
      <h3>{movieTitle}</h3>
    </div>
  );
}

export default MovieDetails;
