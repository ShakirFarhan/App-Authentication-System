import axios from 'axios';
import { Alert } from 'react-native';
export const authenticate = async (mode, email, password) => {
  const URL = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=AIzaSyAXxTWQyNaczBRIn6Hsd2PeRvXNvDZ_Adc`;
  try {
    const { data } = await axios.post(URL, {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  } catch (error) {
    console.log(error);
    Alert.alert(
      'Authentication Failed!',
      'Please Check Your Credentials or Try Again Later'
    );
  }
};
export const signUpUser = (email, password) => {
  return authenticate('signUp', email, password);
};
export const loginUser = async (email, password) => {
  const data = await authenticate('signInWithPassword', email, password);
  return data;
};
