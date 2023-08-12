import React, { Component } from "react";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/fakeMovieService";
class MovieDetail extends Component {
  state = {
    movieForm: {
      title: "",
      genre: "",
      stock: "",
      rate: "",
    },
    errors: {
      title: "",
      genre: "",
      stock: "",
      rate: "",
    },
  };

  componentDidMount() {
    const movie = getMovie(this.props.match.params._id.toString());

    const movieForm = {};
    movieForm.title = movie.title;
    movieForm.genre = movie.genre.name;
    movieForm.stock = movie.numberInStock;
    movieForm.rate = movie.dailyRentalRate;

    this.setState({ movieForm });
  }
  schema = {
    title: Joi.string().min(3).required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    stock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    rate: Joi.number().min(0).max(10).required().label("Daily Rental Rate"),
  };
  validate = () => {
    const joiObject = Joi.validate(this.state.movieForm, this.schema, {
      abortEarly: false,
    });

    const errors = {};
    if (joiObject.error) {
      for (let index = 0; index < joiObject.error.details.length; index++) {
        const path = joiObject.error.details[index].path;
        const message = joiObject.error.details[index].message;
        errors[path] = message;
      }
      return errors;
    } else {
      return null;
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (errors !== null) {
      this.setState({ errors });
    } else {
      const movie = this.state.movieForm;
      movie._id = this.props.match.params._id.toString();
      saveMovie(movie);
      console.log("Submited");
      this.props.history.replace("/movies");
    }
  };
  handleChange = (e) => {
    const movieForm = { ...this.state.movieForm };
    movieForm[e.currentTarget.name] = e.currentTarget.value;
    const obj = { [e.currentTarget.name]: e.currentTarget.value };
    const sch = { [e.currentTarget.name]: this.schema[e.currentTarget.name] };
    const joiObject = Joi.validate(obj, sch, { abortEarly: true });
    const errors = { ...this.state.errors };
    if (joiObject.error !== null) {
      const path = joiObject.error.details[0].path;
      const message = joiObject.error.details[0].message;
      errors[path] = message;
    } else {
      errors[e.currentTarget.name] = "";
    }
    this.setState({ movieForm, errors });
  };
  render() {
    const { movieForm, errors } = this.state;
    console.log(this.state.movie);
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Movie Form</h3>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            autoFocus
            value={movieForm.title}
            name="title"
            onChange={this.handleChange}
            type="text"
            id="title"
            className="form-control"
            placeholder="Title"
          />
        </div>

        {errors.title && (
          <div className="alert alert-danger ">{errors.title}</div>
        )}

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <select
            value={movieForm.genre}
            name="genre"
            onChange={this.handleChange}
            id="genre"
            className="form-control"
          >
            <option>Action</option>
            <option>Comedy</option>
            <option>Thriller</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="numberInStock">Number in Stock</label>
          <input
            value={movieForm.stock}
            name="stock"
            onChange={this.handleChange}
            type="number"
            id="numberInStock"
            className="form-control"
            placeholder="Number in Stock"
          />
        </div>

        {errors.stock && (
          <div className="alert alert-danger ">{errors.stock}</div>
        )}

        <div className="form-group">
          <label htmlFor="rate">Rate</label>
          <input
            value={movieForm.rate}
            name="rate"
            onChange={this.handleChange}
            type="number"
            id="rate"
            className="form-control"
            placeholder="Daily rental Rate"
          />
        </div>

        {errors.rate && (
          <div className="alert alert-danger ">{errors.rate}</div>
        )}

        <button
          disabled={this.validate()}
          className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}

export default MovieDetail;
