import React from 'react';
import Filme from './Filme';
import {connect} from 'react-redux';

class MovieList extends React.Component {
  render() {
    const {movie} = this.props;
    if (!movie) {
      return null;
    }

    return <Filme filmes={movie.movies} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    movie: state.moviesbygenre.find(
      (movie) => movie.genreid === ownProps.genreid,
    ),
  };
};

export default connect(mapStateToProps)(MovieList);
