import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Provider, useDispatch, useSelector } from 'react-redux';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import store from './store';
import IconButton from './components/ui/IconButton';
import { authenticatedUser, logout } from './redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';
const Stack = createNativeStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch();
  const logoutButton = () => {
    dispatch(logout());
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              size={24}
              color={tintColor}
              onPress={logoutButton}
            />
          ),
        }}
        name="Welcome"
        component={WelcomeScreen}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
function Root() {
  const dispatch = useDispatch();
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        dispatch(authenticatedUser(storedToken));
      }
      setIsTryingLogin(false);
    }
    fetchToken();
  }, []);
  if (isTryingLogin) {
    return <AppLoading />;
  }
  return <Navigation />;
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}
