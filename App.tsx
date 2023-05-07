import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './screens/Login';
import ChatScreen from './screens/OtherScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={LoginScreen} />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          initialParams={{
            user_name: 'no_user_name',
            channel_name: 'no_channel_name',
          }}
        />
        {/* <Stack.Screen
          name="OtherScreen"
          component={OtherScreen}
          initialParams={{roomId: '1234567890'}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
