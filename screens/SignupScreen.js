import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../apis/user';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { authenticatedUser } from '../redux/authSlice';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();
  const authenticateUser = async ({ email, password }) => {
    setIsAuthenticating(true);
    const data = await signUpUser(email, password);
    dispatch(authenticatedUser(data.idToken));
    setIsAuthenticating(false);
  };
  if (isAuthenticating) {
    return <LoadingOverlay message={'Creating user...'} />;
  }
  return <AuthContent onAuthenticate={authenticateUser} />;
}

export default SignupScreen;
