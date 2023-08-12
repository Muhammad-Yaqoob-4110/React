import React from "react";
import _ from "lodash";
import propTypes from "prop-types";
const Pagination = ({
  pageSize,
  totalMovies,
  handlePageChange,
  currentPage,
}) => {
  const pagesCount = Math.ceil(totalMovies / pageSize);
  const pages = _.range(1, pagesCount + 1);
  if (pages.length === 1) return null;
  return (
    <nav style={{ display: "flex" }}>
      {pages.map((page) => {
        return (
          <ul key={page} className="pagination">
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a onClick={() => handlePageChange(page)} className="page-link">
                {page}
              </a>
            </li>
          </ul>
        );
      })}
    </nav>
  );
};
Pagination.propTypes = {
  pageSize: propTypes.number.isRequired,
  totalMovies: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  handlePageChange: propTypes.func.isRequired,
};

export default Pagination;
