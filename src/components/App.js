import React, { useState } from 'react';
import AppRouter from 'components/Router';
import firebase from 'firebasePool';
import {authService} from 'firebasePool';

function App() {
  const auth = firebasePool.auth();
  const [isLogin, setIsLogin] = useState(authService.currentUser);

  return (
  <>
  <AppRouter isLogin={isLogin}/>
  <footer>&copy; Euitter {new Date().getFullYear()}</footer>
  </>
  )
}

export default App;
