import React, { useState } from 'react';
import AppRouter from 'components/Router';
import {firebaseInstance} from 'fbase';
import {authService} from 'fbase';

function App() {
console.log(firebaseInstance)
console.log(firebaseInstance.auth())

  const auth = firebaseInstance.auth();
  const [isLogin, setIsLogin] = useState(firebaseInstance.currentUser);
  //const [isLogin, setIsLogin] = useState(false);

  return (
  <>
  <AppRouter isLogin={isLogin}/>
  <footer>&copy; Euitter {new Date().getFullYear()}</footer>
  </>
  )
}

export default App;
