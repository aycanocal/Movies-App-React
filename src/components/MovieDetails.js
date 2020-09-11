import React from "react";

function MovieDetails(props) {
  const { title } = props;
  console.log(title);

  return (
    <div>
      <h2>Movie Details</h2>
      <h2>{title}</h2>
    </div>
  );
}

export default MovieDetails;
