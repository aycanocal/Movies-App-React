import React, { useState, useEffect } from "react";

import "./App.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";

const API_KEY = "79b40ce";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("pokemon");
  const [year, setYear] = useState("");
  const [totalResults, setTotalResults] = useState(10);
  var [page, setPage] = useState(1);
  const [movieTitle, setMovieTitle] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}&page=${page}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result.Search);
        setTotalResults(result.totalResults);
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
        });
    }
  };

  const searchByYear = (e) => {
    if (e.key === "Enter") {
      setPage(1);
      fetch(
        `http://www.omdbapi.com/?s=${query}&y=${year}&apikey=${API_KEY}&page=${page}`
      )
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
      fetch(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}&page=${page}`)
        .then((response) => response.json())
        .then((result) => {
          setData(result.Search);
        });
    }
    if (e.currentTarget.id === "previous" && page !== 1) {
      setPage(--page);
      console.log(page);
      fetch(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}&page=${page}`)
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
                <Form>
                  <Form.Row>
                    <Col sm="2">
                      <Form.Control
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search By Title"
                        onKeyPress={searchByTitle}
                      ></Form.Control>
                    </Col>
                    <Col sm="2">
                      <Form.Control
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Select Year"
                        onKeyPress={searchByYear}
                      ></Form.Control>
                    </Col>
                  </Form.Row>
                </Form>

                <DropdownButton
                  alignRight
                  title="Select Type"
                  id="dropdown-menu-align-right"
                  onSelect={(e) => setType(e)}
                >
                  <Dropdown.Item eventKey="option-1">Movie</Dropdown.Item>
                  <Dropdown.Item eventKey="option-2">Serie</Dropdown.Item>
                  <Dropdown.Item eventKey="option-3">
                    Serie Episode
                  </Dropdown.Item>
                </DropdownButton>

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
                            <Link
                              to="/movieDetails"
                              onClick={() => setMovieTitle(movie.Title)}
                            >
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
          path="/movieDetails"
          exact
          render={() => {
            return (
              <div>
                <MovieDetails movieTitle={movieTitle} />
              </div>
            );
          }}
        />
      </div>
    </Router>
  );
}

export default App;
