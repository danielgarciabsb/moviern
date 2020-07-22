import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  Button,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import moviedetails from '../apis/moviedetails';

const win = Dimensions.get('window');

class Filme extends Component {
  state = {
    showModal: null,
    movieDetails: '',
  };

  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.getMovieDetails = this.getMovieDetails.bind(this);
  }

  showModal(id) {
    this.getMovieDetails(id);
    this.setState({showModal: id});
  }

  hideModal() {
    this.setState({showModal: null});
  }

  async getMovieDetails(id) {
    const response = await moviedetails.get(id.toString(), {
      params: {api_key: '5ea8199403b084fcbe626d065e1dca09', language: 'pt-BR'},
    });
    this.setState({movieDetails: response.data});
  }
  render() {
    return (
      <>
        {this.props.filmes.map((filme) => (
          <>
            <TouchableHighlight
              underlayColor={Colors.dark}
              onPress={() => this.showModal(filme.id)}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{filme.title}</Text>
                <View style={styles.separator} />
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${filme.backdrop_path}`,
                  }}
                  style={{width: win.width - 50, height: 200, marginTop: 10}}
                />
                {/*<Text style={styles.sectionDescription}>{filme.overview}</Text>*/}
              </View>
            </TouchableHighlight>
            <Modal
              visible={this.state.showModal === filme.id}
              animationType="slide"
              transparent={true}>
              <View style={styles.body}>
                <Text style={styles.trendingTitle}>{filme.title}</Text>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionDescription}>
                    <Text style={styles.highlight}>Titulo Original: </Text>{' '}
                    {filme.original_title}
                  </Text>
                  <Text style={styles.sectionDescription}>
                    <Text style={styles.highlight}>Duração: </Text>{' '}
                    {this.state.movieDetails.runtime} min
                  </Text>
                  <Text style={styles.sectionDescription}>
                    <Text style={styles.highlight}>Popularidade: </Text>{' '}
                    {this.state.movieDetails.popularity}
                  </Text>
                  <Text style={styles.sectionDescription}>
                    <Text style={styles.highlight}>Sumário: </Text>{' '}
                    {filme.overview}
                  </Text>
                  <Text style={styles.sectionDescription}>
                    <Text style={styles.highlight}>Homepage: </Text>{' '}
                    {this.state.movieDetails.homepage}
                  </Text>
                  <View style={styles.sectionContainer}>
                    <Button
                      onPress={this.hideModal}
                      title="FECHAR"
                      color="#55688A"
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </>
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
