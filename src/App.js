import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MovieDetails from "./components/MovieDetails";
import DataTable from "./components/DataTable";
import PageButtons from "./components/PageButtons";

import "./App.css";
import Col from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const API_KEY = "79b40ce";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("pokemon");
  const [year, setYear] = useState("");
  const [pageQuery, setPageQuery] = useState("");
  const [totalResults, setTotalResults] = useState(10);
  const [type, setType] = useState("movie");
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

  const handleClick = (e) => {
    if (e.currentTarget.id === "next" && page <= totalResults / 10) {
      setPage(++page);
      console.log(page);
      fetch(
        `http://www.omdbapi.com/?s=${pageQuery}&type=${type}&y=${year}&apikey=${API_KEY}&page=${page}`
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
        `http://www.omdbapi.com/?s=${pageQuery}&type=${type}&y=${year}&apikey=${API_KEY}&page=${page}`
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
      `http://www.omdbapi.com/?s=${query}&type=${type}&y=${year}&apikey=${API_KEY}&page=${page}`
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
                <div className="header">
                  <h1> Movies App </h1>
                  <h6>
                    Search your favourite movies! Click to the titles to see
                    more!
                  </h6>
                </div>

                <Form.Row
                  className="justify-content-center"
                  style={{ padding: "10px" }}
                >
                  <Col style={{ padding: "5px" }}>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Enter Title"
                    ></Form.Control>
                  </Col>
                  <Col style={{ padding: "5px" }}>
                    <Form.Control
                      size="sm"
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="Enter Year"
                    ></Form.Control>
                  </Col>
                  <Col style={{ padding: "5px" }}>
                    <DropdownButton
                      alignRight
                      title={type}
                      id="dropdown-menu-align-right"
                      onSelect={(e) => {
                        setType(e);
                      }}
                      size="sm"
                    >
                      <Dropdown.Item eventKey="movie">Movie</Dropdown.Item>
                      <Dropdown.Item eventKey="series">Series</Dropdown.Item>
                    </DropdownButton>
                  </Col>
                  <Col style={{ padding: "5px" }}>
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
                <PageButtons handleClick={handleClick} />
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
