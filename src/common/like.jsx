import React from "react";
const Like = ({ movie, onClick }) => {
  let classes = movie.liked ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={onClick}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
