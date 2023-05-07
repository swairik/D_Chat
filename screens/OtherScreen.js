import {useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';

import Gun from 'gun/gun';
// import SEA from 'gun/sea';
import 'gun/lib/radix.js';
import 'gun/lib/radisk.js';
import 'gun/lib/store.js';
import Store from 'gun/lib/ras.js';

import channel from '../ChannelName';

const ChatScreen = ({navigation}) => {
  const route = useRoute();

  const userName = route.params.user_name;
  const channelName = route.params.channel_name;

  //   const channel = 'chat_android_dchat12345';

  //   console.log(userName);
  //   console.log(channelName);

  const [messages, setMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  let [peer, setPeer] = useState('https://mvp-gun.herokuapp.com/gun');

  const asyncStore = Store({AsyncStorage});

  const db = Gun({
    peers: ['https://mvp-gun.herokuapp.com/gun'],
    store: asyncStore,
  });

  const restartGun = () => {
    gun = Gun({
      peers: [peer],
      store: asyncStore,
    });
  };

  var match = {
    // lexical queries are kind of like a limited RegEx or Glob.
    '.': {
      // property selector
      '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
    },
    '-': 1, // filter in reverse
  };

  const getMessages = () => {
    db.get(channel)
      .map(match)
      .once(async (data, id) => {
        if (data) {
          // Key for end-to-end encryption
          const key = '#foo';
          var message = {
            who: await db.user(data).get('alias'),
            // what: (await SEA.decrypt(data.what, key)) + '',
            what: data.what + '',
            when: GUN.state.is(data, 'what'),
          };
          if (message.what) {
            receivedMessages = [...receivedMessages, message].sort(
              (a, b) => a.when - b.when,
            );
          }
        }
      });
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer1',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
    // db.get(channel)
    //   .map(match)
    //   .once(async (data, id) => {
    //     if (data) {
    //       // Key for end-to-end encryption
    //       const key = '#foo';
    //       var message = {
    //         // transform the data
    //         who: await db.user(data).get('alias'),
    //         // what: (await SEA.decrypt(data.what, key)) + '',
    //         what: data.what + '',
    //         when: GUN.state.is(data, 'what'),
    //       };
    //       if (message.what) {
    //         receivedMessages = [...receivedMessages, message].sort(
    //           (a, b) => a.when - b.when,
    //         );
    //       }
    //     }
    //   });
    // console.log(receivedMessages);
    // db.get(channel).get(new Date().toISOString()).put({
    //   myMessage: 'hello123',
    // });
  }, []);

  db.get(channel)
    .map()
    .once((data, key) => {
      console.log('logging from on listener');
      console.log(data);
    });

  //   const onSend = useCallback((messages = []) => {
  //     setMessages(previousMessages =>
  //       GiftedChat.append(previousMessages, messages),
  //     );
  //     // const myMessage = user.get('all').set({what: messages});
  //     console.log(`messages ${messages}`);
  //     console.log(messages[0].text);
  //     const index = new Date().toISOString();
  //     // db.get(channel)
  //     //   .put(messages[0].text);
  //     db.get(channel).put({
  //       myMessage: 'hellooo',
  //     });
  //     // getMessages();
  //     // console.log(receivedMessages);
  //   });

  const handleSend = async messages => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    console.log('handling send');
    db.get(channel).get(new Date().toISOString()).put({
      myMessage: messages[0].text,
    });
  };

  const renderInputToolbar = props => {
    return <InputToolbar {...props} containerStyle={styles.toolbar} />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => handleSend(messages)}
      user={{
        _id: 1,
      }}
      renderInputToolbar={renderInputToolbar}
    />
  );
};

const styles = StyleSheet.create({
  toolbar: {
    borderTopWidth: 1.5,
    backgroundColor: 'black',
  },
});

export default ChatScreen;
