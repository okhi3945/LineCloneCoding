import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import Avatar from './Avatar';

const ChatBubble = ({ message, isMyMessage, isRead, timestamp, senderName, senderProfilePicture }) => {
  
  return (
    <View style={isMyMessage ? styles.containerRight : styles.containerLeft}>
      {!isMyMessage && (
        <View style={styles.senderNameContainer}>
          <Text style={styles.senderName}>{senderName}</Text>
        </View>
      )}
      <View style={[styles.container, isMyMessage ? styles.containerRight : styles.containerLeft]}>
        {!isMyMessage && <Avatar source={senderProfilePicture} isMyMessage={isMyMessage} />}

        <View style={[styles.bubble, isMyMessage ? styles.myBubble : styles.otherBubble]}>
          <View style={[styles.triangle, isMyMessage ? styles.triangleRight : styles.triangleLeft]} />
          <Text>{message}</Text>
        </View>
        <View style={[styles.messageInfo, isMyMessage ? styles.messageInfoRight : styles.messageInfoLeft]}>
          {isRead && <Text style={styles.readStatus}>읽음</Text>}
          <Text style={styles.timestamp}>{moment(timestamp).format('LT')}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginTop: 10
  },
  containerRight: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
  },
  containerLeft: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  senderNameContainer: {
    marginLeft: '12%',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#5D718C',
  },
  bubble: {
    padding: 8,
    borderRadius: 15,
    maxWidth: '70%',
    position: 'relative',
  },
  myBubble: {
    backgroundColor: '#7AD977',
  },
  otherBubble: {
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
    top: 2.5,
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
    top: 2.5
  },
  messageInfo: {
    top: 3,
    marginHorizontal: 8,
    alignItems: 'flex-end',

  },
  messageInfoRight: {
    alignItems: 'flex-end',
  },
  messageInfoLeft: {
    alignItems: 'flex-start',
  },
  readStatus: {
    fontSize: 12,
    color: '#7C95BC',
  },
  timestamp: {
    fontSize: 10,
    color: '#7C95BC',
    marginTop: 4,
  },
});

export default ChatBubble;