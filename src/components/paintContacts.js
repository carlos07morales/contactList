import React from 'react';
import {FlatList, StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import { Feather } from '@expo/vector-icons';
const paintContacts = props => {
  let contact = props.contact;
  return (
    <View style={styles.container}>
      <FlatList
        data={contact}
        renderItem={({item}) => (
            <TouchableOpacity onPress={() => props.sendCellNumber(`tel:${item.cell}`)}>
                <View style={styles.itemContainer}>
                    <Image style={styles.image} source={{uri: item.picture.medium}} />
                    <View style={styles.timeContainer}>
                      <Text style={styles.name}>{item.name.title}. {item.name.first} {item.name.last}</Text>
                      <Text style={styles.cell}><Feather name="phone" size={15} color="#cacaca"/> {item.cell}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )}
        keyExtractor={item => item.cell}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    height: 62,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fff',
    margin: 1,
    marginBottom: 5
  },
  timeContainer: {
    marginLeft: 5,
    fontSize: 15,
    width: '85%',
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  name: {
    marginLeft: 10,
    fontSize: 18,
    color: '#000000',
    fontWeight: '600',
  },
  cell: {
    marginLeft: 10,
    fontSize: 15,
    color: '#cacaca',
  }
});

export default paintContacts;
