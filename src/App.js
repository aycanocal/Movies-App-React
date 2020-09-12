import React, { useState, useEffect } from "react";

import "./App.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";

const API_KEY = "79b40ce";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("pokemon");
  const [pageQuery, setPageQuery] = useState("");
  const [totalResults, setTotalResults] = useState(10);
  var [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}&page=${page}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Search);
        setTotalResults(result.totalResults);
        setPageQuery(query);
        setQuery("");
      });
  }, []);

  const searchByTitle = (e) => {
    if (e.key === "Enter") {
      setPage(1);
      fetch(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}&page=${page}`)
        .then((response) => response.json())
        .then((result) => {
          setData(result.Search);
          setTotalResults(result.totalResults);
          setPageQuery(query);
          setQuery("");
        });
    }
  };

  const handleClick = (e) => {
    if (e.currentTarget.id === "next" && page <= totalResults / 10) {
      setPage(++page);
      console.log(page);
      fetch(
        `http://www.omdbapi.com/?s=${pageQuery}&apikey=${API_KEY}&page=${page}`
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result.Search);
        });
    }
    if (e.currentTarget.id === "previous" && page !== 1) {
      setPage(--page);
      console.log(page);
      fetch(
        `http://www.omdbapi.com/?s=${pageQuery}&apikey=${API_KEY}&page=${page}`
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result.Search);
        });
    }
  };

  return (
    <Router>
      <div>
        <Route
          path="/"
          exact
          render={() => {
            return (
              <div>
                <h1> Movies App </h1>
                <h2> Search movies with their title!</h2>
                <Form.Control
                  size="sm"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search By Title"
                  onKeyPress={searchByTitle}
                ></Form.Control>
                {typeof data != "undefined" ? (
                  <Table striped bordered hover size="sm">
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
                          <td>
                            <Link to={`/movieDetails/${movie.Title}`}>
                              {movie.Title}
                            </Link>
                          </td>
                          <td>{movie.Year}</td>
                          <td>{movie.imdbID}</td>
                        </tr>
                      </tbody>
                    ))}
                  </Table>
                ) : (
                  ""
                )}
                <div>
                  <Button
                    variant="secondary"
                    id="previous"
                    onClick={handleClick}
                  >
                    Previous
                  </Button>
                  <Button variant="primary" id="next" onClick={handleClick}>
                    Next
                  </Button>
                </div>
              </div>
            );
          }}
        />

        <Route
          path="/movieDetails/:movieTitle"
          exact
          component={MovieDetails}
        />
      </div>
    </Router>
  );
}

export default App;
