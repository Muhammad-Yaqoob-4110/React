import React from "react";
const ListGroup = ({
  genres,
  handleGenre,
  currentGenre,
  textProperty,
  valueProperty,
}) => {
  const genre = {
    _id: "All Movies",
    name: "All Movies",
  };
  return (
    <ul className="list-group">
      <li
        onClick={() => handleGenre(genre)}
        style={{ cursor: "pointer" }}
        className={
          currentGenre === "All Movies"
            ? "list-group-item active"
            : "list-group-item"
        }
      >
        All Movies
      </li>
      {genres.map((genre) => {
        return (
          <li
            key={genre[valueProperty]}
            onClick={() => handleGenre(genre)}
            style={{ cursor: "pointer" }}
            className={
              currentGenre === genre[textProperty]
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {genre[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
