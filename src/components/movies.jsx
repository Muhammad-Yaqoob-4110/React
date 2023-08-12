import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import { paginate } from "./../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchMovie from "./searchMovie";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "",
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };
  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }
  handleDlelete = (movie) => {
    const movies = this.state.movies.filter((m) => {
      return m._id !== movie._id;
    });

    this.setState({ movies: movies });
  };
  handleLike = (movie) => {
    movie.liked = movie.liked ? false : true;
    this.setState({ movies: this.state.movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenre = (genre) => {
    if (genre.name !== "All Movies") {
      const movies = getMovies().filter((movie) => {
        return movie.genre._id === genre._id;
      });
      this.setState({
        currentGenre: genre.name,
        movies,
        currentPage: 1,
        searchQuery: "",
      });
    } else {
      const movies = getMovies();
      this.setState({
        currentGenre: genre.name,
        movies,
        currentPage: 1,
        searchQuery: "",
      });
    }
  };
  handleSort = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };
  handleSerachQeury = (searchQuery) => {
    this.setState({ searchQuery, currentGenre: "", currentPage: 1 });
    // console.log(searchQuery);
  };
  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      sortColumn,
      currentGenre,
      searchQuery,
    } = this.state;
    const { length: count } = this.state.movies;
    const sorted = _.orderBy(allMovies, [sortColumn.path], [sortColumn.order]);
    let movies = {};
    if (searchQuery) {
      movies = getMovies().filter((m) => {
        return m.title.toLowerCase().startsWith(searchQuery.toLowerCase());
      });
    } else {
      movies = paginate(sorted, currentPage, pageSize);
    }
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            genres={genres}
            handleGenre={this.handleGenre}
            currentGenre={currentGenre}
          />
        </div>
        <div className="col">
          {this.state.movies.length === 0 ? (
            <p>There are no movies in the data base</p>
          ) : (
            <div>
              <div style={{ marginBottom: "4px" }}>
                <Link to="/movies/new">
                  <button className="btn btn-primary">New Movie</button>
                </Link>
              </div>
              <p>Showing {movies.length} movies in the database</p>
              <SearchMovie
                searchQuery={searchQuery}
                onChange={this.handleSerachQeury}
              />
              <MoviesTable
                movies={movies}
                handleLike={this.handleLike}
                handleDlelete={this.handleDlelete}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
            </div>
          )}
          <Pagination
            pageSize={pageSize}
            totalMovies={count}
            currentPage={currentPage}
            handlePageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
