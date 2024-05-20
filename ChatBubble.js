import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = ({ message, isMyMessage }) => {
  return (
    <View style={[styles.bubble, isMyMessage ? styles.myBubble : styles.otherBubble]}>
      <View style={[styles.triangle, isMyMessage ? styles.triangleRight : styles.triangleLeft]} />
      <Text>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    bubble: {
      padding: 8,
      borderRadius: 15,
      marginVertical: 4,
      maxWidth: '70%',
      position: 'relative',
    },
    myBubble: {
      alignSelf: 'flex-end',
      backgroundColor: '#7AD977',
    },
    otherBubble: {
      alignSelf: 'flex-start',
      backgroundColor: '#FFFFFF',
    },
    triangle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
    },
    triangleRight: {
      borderLeftWidth: 10,
      borderRightWidth: 0,
      borderBottomWidth: 10,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: '#7AD977',
      transform: [{ rotate: '180deg' }], 
      right: -4,
      top : 2.5,
    },
    triangleLeft: {
      borderLeftWidth: 0,
      borderRightWidth: 10,
      borderBottomWidth: 10,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: '#FFFFFF',
      transform: [{ rotate: '180deg' }], 
      left: -4,
      top : 2.5
    },
  });
  
  export default ChatBubble;