import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
class contactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  async componentDidMount() {
    try {
        let response = await fetch(
          'https://randomuser.me/api/?results=50'
        );
        let json = await response.json();
        this.setState(prevState => {
            return {
              ...prevState,
                list: json
            };
        });
      } catch (error) {
        console.error(error);
      }
  }
  componentWillUnmount() {

  }

  render() {
    return (
        <View style={styles.container}>
        <FlatList
          data={this.state.list}
          renderItem={({item}) => (
            <TouchableOpacity onPress={props.onItemPressed}>
                <View>
                    <Text>{item.login.username}</Text>
                    <Text>{item.cell}</Text>
                </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.login.username}
        />
      </View>
  
    );
  }
}

const styles = StyleSheet.create({
    
});
export default contactList;
