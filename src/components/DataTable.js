import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function DataTable({ data }) {
  const [movieTitle, setMovieTitle] = useState("");
  return (
    <div>
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
                  <Link to={`/movieDetails/${movie.Title}`}>{movie.Title}</Link>
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
    </div>
  );
}

export default DataTable;
