import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ProfileImage = ({ source }) => {
  return (
    <View style={[styles.container]}>
      <Image source={source} style={styles.avatar}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
});

export default ProfileImage;