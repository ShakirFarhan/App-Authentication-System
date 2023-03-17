import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import { useSelector } from 'react-redux';
function WelcomeScreen() {
  const [message, setMessage] = useState('');
  const { token } = useSelector((state) => state.user);
  useEffect(() => {
    axios
      .get(
        `https://react-native-auth-33daf-default-rtdb.firebaseio.com/message.json?auth=${token}`
      )
      .then((res) => setMessage(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
