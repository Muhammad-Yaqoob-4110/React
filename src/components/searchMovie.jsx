import React, { Component } from "react";
class SearchMovie extends Component {
  state = {};
  render() {
    const { searchQuery, onChange } = this.props;
    return (
      <div className="form-group">
        <input
          value={searchQuery}
          name="search"
          onChange={(e) => onChange(e.currentTarget.value)}
          type="text"
          className="form-control"
          placeholder="Search..."
        />
      </div>
    );
  }
}

export default SearchMovie;
// value={movieForm.rate}
//             name="rate"
//             onChange={this.handleChange}
