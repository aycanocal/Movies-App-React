import React, { useState, useEffect } from "react";

const API_KEY = "79b40ce";

function MovieDetails({ match }) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(
      `http://www.omdbapi.com/?t=${match.params.movieTitle}&apikey=${API_KEY}`
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  return (
    <div>
      {typeof data != "undefined" ? (
        <div className="details">
          <div className="header">
            <h3>{data.Title}</h3>
            <img src={data.Poster}></img>
          </div>
          <dl key={data.imdbID}>
            <dt>Year</dt>
            <dd> {data.Year}</dd>
            <dt>Rated</dt>
            <dd> {data.Rated}</dd>
            <dt>Released</dt>
            <dd>{data.Released}</dd>
            <dt>Runtime</dt>
            <dd>{data.Runtime}</dd>
            <dt>Genre</dt>
            <dd>{data.Genre}</dd>
            <dt>Director</dt>
            <dd>{data.Director}</dd>
            <dt>Writer</dt>
            <dd>{data.Writer}</dd>
            <dt>Actors</dt>
            <dd>{data.Actors}</dd>
            <dt>Plot</dt>
            <dd>{data.Plot}</dd>
            <dt>Language</dt>
            <dd>{data.Language}</dd>
            <dt>Country</dt>
            <dd>{data.Country}</dd>
            <dt>Awards</dt>
            <dd>{data.Awards}</dd>
            <dt>IMDB Rating</dt>
            <dd>{data.imdbRating}</dd>
          </dl>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default MovieDetails;
