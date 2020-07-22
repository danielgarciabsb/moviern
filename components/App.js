/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  // ImageBackground,
  Image,
  Dimensions,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Filme from './Filme';
import trending from '../apis/trending';
import api from '../apis/api';
import Genre from './Genre';

const win = Dimensions.get('window');

class App extends Component {
  state = {
    filmes: [],
    trending: [],
    txt_busca: 'psycho',
  };

  constructor(props) {
    super(props);
    this.buscaFilmes = this.buscaFilmes.bind(this);
  }

  async componentDidMount() {
    this.trending = await trending.get('', {
      params: {api_key: '5ea8199403b084fcbe626d065e1dca09', language: 'pt-BR'},
    });
    this.setState({trending: this.trending.data.results});
  }

  async buscaFilmes() {
    this.response = await api
      .get(this.state.txt_busca)
      .then()
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        throw error;
      });
    this.setState({filmes: this.response.data.results});
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <Image
              source={require('../notflix.png')}
              style={{
                width: win.width,
                height: 70,
                marginTop: 20,
                resizeMode: 'contain',
              }}
            />
            <View style={styles.body}>
              <Text style={styles.trendingTitle}>Filmes por título</Text>
              <View style={styles.sectionContainer}>
                <TextInput
                  style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    color: Colors.white,
                    marginBottom: 10,
                  }}
                  onChangeText={(text) => this.setState({txt_busca: text})}
                  value={this.state.text}
                  placeholder="Digite aqui o nome do filme"
                  placeholderTextColor={Colors.dark}
                />
                <Button
                  onPress={this.buscaFilmes}
                  title="BUSCAR"
                  color="#55688A"
                />
              </View>
              <Text style={styles.trendingTitle}>Lançamentos</Text>
              <Filme filmes={this.state.filmes} />
              <Filme filmes={this.state.trending} />
              {/*<Genre />*/}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
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

export default App;
