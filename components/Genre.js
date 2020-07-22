import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {fetchGenresAndMovies} from '../apis';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MovieList from './MovieList';

class Genre extends Component {
  componentDidMount() {
    this.props.fetchGenresAndMovies();
  }

  renderList() {
    return this.props.genres.map((genre) => {
      return (
        <View>
          <Text style={styles.trendingTitle}>{genre.name}</Text>
          <MovieList genreid={genre.id} />
        </View>
      );
    });
  }

  render() {
    return <View>{this.renderList()}</View>;
  }
}

const mapStateToProps = (state) => {
  return {genres: state.genres};
};
export default connect(mapStateToProps, {fetchGenresAndMovies})(Genre);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.black,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.black,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  trendingTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: Colors.white,
    paddingHorizontal: 24,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  separator: {
    backgroundColor: Colors.dark,
    height: 1,
    marginTop: 4,
  },
});
