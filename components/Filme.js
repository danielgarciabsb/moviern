import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const win = Dimensions.get('window');

class Filme extends Component {
  render() {
    return (
      <>
        {this.props.filmes.map((filme) => (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{filme.title}</Text>
            <View style={styles.separator} />
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${filme.backdrop_path}`,
              }}
              style={{width: win.width - 50, height: 200, marginTop: 10}}
            />
            {/*<Text style={styles.sectionDescription}>*/}
            {/*  {filme.overview}*/}
            {/*</Text>*/}
          </View>
        ))}
      </>
    );
  }
}

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
export default Filme;
