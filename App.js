import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Alert, Linking } from 'react-native';
import Loading from './src/components/loading';
import PaintContacts from './src/components/paintContacts';
import _ from 'lodash';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      contactList: [],
      isLoading: true,
      textInput: '',
      originalContactList: []
    };
  }
  componentDidMount() {
    fetch('https://randomuser.me/api/?exc=login&results=50')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ contactList: json.results });
        this.setState({ originalContactList: json.results });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  toCall = (cell) => {
    Linking.canOpenURL(cell)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(cell);
      }
    })
    .catch(err => {
      console.log(err);
      Alert.alert(
        'No se logro ejecutar la llamada',
      );
    });
  }
  filterContacts = (string) => {
    this.setState({ textInput: string });
    let result =  [];
    _.forEach(this.state.originalContactList, function(v, k){
      let name = `${v.name.title} ${v.name.first} ${v.name.last}`.toUpperCase();
      let found = false;
      if(name.includes(string.replace(/\./g, '').toUpperCase())){
        found = true;
      }else
      if(v.cell.replace(/-/g, '').includes(string)){
        found = true;
      }
      if(found){
        result.push(v);
      }
    });
    this.setState({ contactList: result });
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.searchContainer}>
          <Text style={styles.title}>Contactos</Text>
          <View style={styles.containerFilter}>
            <TextInput
              style={styles.input}
              placeholder="Buscar Concatos"
              underlineColorAndroid="white"
              value={this.state.textInput}
              onChangeText={string => {
                this.filterContacts(string)
              }}
            />
          </View>
          <PaintContacts
            contact={this.state.contactList}
            sendCellNumber={this.toCall}
          />
          <Loading
            visible={this.state.isLoading}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    width: '100%',
    height: '100%',
    marginTop: '12%',
    marginBottom: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFilter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 12,
    marginTop: 12,
  },
  input: {
    fontSize: 17,
    height: 45,
    color: '#5a5a5a',
    width: '100%',
    borderColor: '#f9f9f9',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
});
export default App;