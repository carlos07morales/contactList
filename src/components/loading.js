import React, { Component } from 'react';
import {View, Modal, ActivityIndicator, StyleSheet} from 'react-native';

class loading extends Component {
  render() {
    const {visible} = this.props;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          return true;
        }}>
        <View style={styles.wrapper}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              style={styles.loaderImage}
              size="large"
              color="#ffffff"
            />
          </View>
        </View>
      </Modal>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapper: {
    zIndex: 9,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  loaderContainer: {
    width: 90,
    height: 90,
    backgroundColor: 'transparent',
    borderRadius: 15,
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -45,
    marginTop: -45,
  },
  loaderImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
  }
});

export default loading;