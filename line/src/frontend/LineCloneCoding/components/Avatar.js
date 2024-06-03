import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Avatar = ({ source, isMyMessage }) => {
  return (
    <View style={[styles.container, isMyMessage ? styles.containerRight : styles.containerLeft]}>
      <Image source={source} style={styles.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  containerRight: {
    marginLeft: 8,
  },
  containerLeft: {
    marginRight: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom:'100%',
    marginRight:'20%'
  },
});

export default Avatar;
