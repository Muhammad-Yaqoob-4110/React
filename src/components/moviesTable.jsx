import React from "react";
import Like from "../common/like";
import { Link } from "react-router-dom";
const MoviesTable = ({
  movies,
  handleDlelete,
  handleLike,
  onSort,
  sortColumn,
}) => {
  return (
    <table className="table">
      <thead>
        <th style={{ cursor: "pointer" }} onClick={() => onSort("title")}>
          Title
          {sortColumn.path === "title" && sortColumn.order === "asc" ? (
            <i style={{ padding: "0px" }} className="fa fa-sort-asc"></i>
          ) : null}
          {sortColumn.path === "title" && sortColumn.order === "desc" ? (
            <i style={{ padding: "0px" }} className="fa fa-sort-desc"></i>
          ) : null}
        </th>

        <th style={{ cursor: "pointer" }} onClick={() => onSort("genre.name")}>
          Genre{" "}
          {sortColumn.path === "genre.name" && sortColumn.order === "asc" ? (
            <i style={{ padding: "0px" }} className="fa fa-sort-asc"></i>
          ) : null}
          {sortColumn.path === "genre.name" && sortColumn.order === "desc" ? (
            <i style={{ padding: "0px" }} className="fa fa-sort-desc"></i>
          ) : null}
        </th>
        <th
          style={{ cursor: "pointer" }}
          onClick={() => onSort("numberInStock")}
        >
          Stock{" "}
          {sortColumn.path === "numberInStock" && sortColumn.order === "asc" ? (
            <i style={{ padding: "0px" }} className="fa fa-sort-asc"></i>
          ) : null}
          {sortColumn.path === "numberInStock" &&
          sortColumn.order === "desc" ? (
            <i style={{ padding: "0px" }} className="fa fa-sort-desc"></i>
          ) : null}
        </th>
        <th
          style={{ cursor: "pointer" }}
          onClick={() => onSort("dailyRentalRate")}
        >
          Rate{" "}
          {sortColumn.path === "dailyRentalRate" &&
          sortColumn.order === "asc" ? (
            <i style={{ padding: "0px" }} className="fa fa-sort-asc"></i>
          ) : null}
          {sortColumn.path === "dailyRentalRate" &&
          sortColumn.order === "desc" ? (
            <i style={{ padding: "0px" }} className="fa fa-sort-desc"></i>
          ) : null}
        </th>
        <th>Like</th>
        <th>Delete</th>
      </thead>
      <tbody>
        {movies.map((movie) => {
          return (
            <tr key={movie._id}>
              <td>
                {" "}
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>{" "}
              </td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like movie={movie} onClick={() => handleLike(movie)} />
              </td>
              <td>
                <button
                  onClick={() => handleDlelete(movie)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MoviesTable;
