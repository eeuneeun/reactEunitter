import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import {firebaseInstance} from 'fbase';
import {authService} from 'fbase';

function App() {
  //console.log(firebaseInstance)
  //console.log(firebaseInstance.auth())

  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  
  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLogin(true)
      }else{
        setIsLogin(false)
      }
      setInit(true)
    });
  }, [])
  const auth = firebaseInstance.auth();
  //const [isLogin, setIsLogin] = useState(false);

  return (
  <>
  { init ? <AppRouter isLogin={isLogin}/> : "로딩중~" }
  <footer>&copy; Euitter {new Date().getFullYear()}</footer>
  </>
  )
}

export default App;
