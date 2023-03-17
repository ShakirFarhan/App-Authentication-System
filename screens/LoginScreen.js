import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../apis/user';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { authenticatedUser } from '../redux/authSlice';
function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const authenticateUser = async ({ email, password }) => {
    setIsAuthenticating(true);
    const data = await loginUser(email, password);
    dispatch(authenticatedUser(data.idToken));
    setIsAuthenticating(false);
  };
  console.log(token);
  if (isAuthenticating) {
    return <LoadingOverlay message={'Loggin...'} />;
  }
  return <AuthContent onAuthenticate={authenticateUser} isLogin />;
}

export default LoginScreen;
