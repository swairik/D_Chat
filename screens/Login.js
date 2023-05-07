import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [channelName, setChannelName] = useState('');

  const login = (username, channelName) => {};

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your username"
        label="username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <Input
        placeholder="Enter the channel name"
        label="Channel Name"
        value={channelName}
        onChangeText={text => setChannelName(text)}
      />
      <Button
        title="Join"
        style={styles.button}
        onPress={() => {
          navigation.navigate('Chat', {
            user_name: username,
            channel_name: channelName,
          });
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 100,
  },
  button: {
    width: 370,
    marginTop: 10,
  },
});

export default Login;
