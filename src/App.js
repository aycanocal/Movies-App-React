import React, { useState, useEffect } from "react";

import "./App.css";

const API_KEY = "79b40ce";

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("pokemon");
  const [totalResults, setTotalResults] = useState(10);
  var [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?s=${title}&apikey=${API_KEY}&page=${page}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Search);
        setTotalResults(result.totalResults);
      });
  }, []);

  const searchByTitle = (e) => {
    if (e.key === "Enter") {
      setPage(1);
      fetch(`http://www.omdbapi.com/?s=${title}&apikey=${API_KEY}&page=${page}`)
        .then((response) => response.json())
        .then((result) => {
          setData(result.Search);
          setTotalResults(result.totalResults);
        });
    }
  };

  const handleClick = (e) => {
    if (e.currentTarget.id === "next" && page <= totalResults / 10) {
      setPage(++page);
      console.log(page);
      fetch(`http://www.omdbapi.com/?s=${title}&apikey=${API_KEY}&page=${page}`)
        .then((response) => response.json())
        .then((result) => {
          setData(result.Search);
        });
    }
    if (e.currentTarget.id === "previous" && page !== 1) {
      setPage(--page);
      console.log(page);
      fetch(`http://www.omdbapi.com/?s=${title}&apikey=${API_KEY}&page=${page}`)
        .then((response) => response.json())
        .then((result) => {
          setData(result.Search);
        });
    }
  };

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Search By Title"
        onKeyPress={searchByTitle}
      ></input>

      {typeof data != "undefined" ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Imdb ID</th>
            </tr>
          </thead>
          {data.map((movie) => (
            <tbody key={movie.imdbID}>
              <tr>
                <td>{movie.Title}</td>
                <td>{movie.Year}</td>
                <td>{movie.imdbID}</td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        ""
      )}

      <div>
        <button id="previous" onClick={handleClick}>
          Previous
        </button>
        <button id="next" onClick={handleClick}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
