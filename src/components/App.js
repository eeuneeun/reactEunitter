import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import {authService} from 'fbase';

function App() {
  //console.log(firebaseInstance)
  //console.log(firebaseInstance.auth())

  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userObj, setUserObj] = useState({
    displayName:"",
    uid:"",
  });
  
  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLogin(true);
        setUserObj(user);
        //user 객체의 일정 부문만 가지고 오는 방법
        // setUserObj({
        //   displayName: user.displayName,
        //   uid: user.uid,
        //   updateProfile: (args) => user.updateProfile(args)
        // })
      }else{
        setIsLogin(false)
      }
      setInit(true)
    });
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser;
    // setUserObj(Object.assign({},user));

    //* user 객체의 일부분만을 갱신되는지 감지하게 됨
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  }

  return (
  <>
  { init ? <AppRouter isLogin={isLogin} userObj={userObj}refreshUser={refreshUser} /> : "로딩중~" }
  <footer>&copy; Euitter {new Date().getFullYear()}</footer>
  </>
  )
}

export default App;
