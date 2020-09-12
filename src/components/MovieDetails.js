import React, { useState, useEffect } from "react";

const API_KEY = "79b40ce";

function MovieDetails({ movieTitle }) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${API_KEY}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  }, []);
  return (
    <div>
      <h2>Movie Details</h2>
      {typeof data != "undefined" ? (
        <div>
          <dl key={data.imdbID}>
            <dt>Title:</dt>
            <dd>{data.Title}</dd>
            <dt>Year:</dt>
            <dd>{data.Year}</dd>
            <dt>Imdb ID:</dt>
            <dd> {data.imdbID}</dd>
          </dl>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default MovieDetails;
