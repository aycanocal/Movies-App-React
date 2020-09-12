import React, { useState, useEffect } from "react";

import "./App.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import DataTable from "./components/DataTable";
import Col from "react-bootstrap/Form";

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const API_KEY = "79b40ce";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("pokemon");
  const [year, setYear] = useState("");
  const [pageQuery, setPageQuery] = useState("");
  const [totalResults, setTotalResults] = useState(10);
  var [page, setPage] = useState(1);
  const [type, setType] = useState("Select Type");

  const handleSelect = (e) => {
    setType(e);
  };

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

  const handleClick = (e) => {
    if (e.currentTarget.id === "next" && page <= totalResults / 10) {
      setPage(++page);
      console.log(page);
      fetch(
        `http://www.omdbapi.com/?s=${pageQuery}&t=${type}&y=${year}&apikey=${API_KEY}&page=${page}`
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
        `http://www.omdbapi.com/?s=${pageQuery}&t=${type}&y=${year}&apikey=${API_KEY}&page=${page}`
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result.Search);
        });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);

    fetch(
      `http://www.omdbapi.com/?s=${query}&t=${type}&y=${year}&apikey=${API_KEY}&page=${page}`
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result.Search);
        setTotalResults(result.totalResults);
        setPageQuery(query);
        setQuery("");
      });
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

                <Form.Row>
                  <Col>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Enter Title"
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="Enter Year"
                    ></Form.Control>
                  </Col>
                  <Col>
                    <DropdownButton
                      alignRight
                      title={type}
                      id="dropdown-menu-align-right"
                      onSelect={handleSelect}
                      size="sm"
                    >
                      <Dropdown.Item eventKey="Movie">Movie</Dropdown.Item>
                      <Dropdown.Item eventKey="Serie">Serie</Dropdown.Item>
                      <Dropdown.Item eventKey="Serie Episode">
                        Serie Episode
                      </Dropdown.Item>
                    </DropdownButton>
                  </Col>
                  <Col>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
                  </Col>
                </Form.Row>

                <DataTable data={data} />
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
