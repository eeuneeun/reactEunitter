import { firebaseInstance, authService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Auth = () =>{
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [newAccount, setNewAccount] = useState("true");
const [error, setError] = useState("");

const onChage = (e) =>{
    const {target:{name, value}} = e;
    if(name === "email"){
        setEmail(value);
    }else if(name === "password"){
        setPassword(value);
    }
}
const onSubmit = async (e) =>{
    e.preventDefault(); 
    try{
        let data;
        if(newAccount){
            //이메일 회원가입
            data = await authService.createUserWithEmailAndPassword(
                email, password
                )
        }else{
            //로그인
            data = await authService.signInWithEmailAndPassword(email, password)
        }
    console.log(data)
    } catch(error){
        setError(error.message)
    }
}

const chkAccount = () => setNewAccount(preV => !preV)
const onSocialClick = (e) => {
    const {target:{name}} = e;
    let provider;
    if(name === "google"){
        provider = new firebaseInstance.auth.GoogleAuthProvider();
    }else if(name === "github"){
        provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    const data = authService.signInWithPopup(provider);
}
return (
    <div className="auth flex-col-center">
        <h1 className="home-title">Eunitter</h1>
        <form onSubmit={onSubmit} className="flex-col-center">
            <input type="email" name="email" placeholder="아이디" required onChange={onChage} />
            <input type="password" name="password" placeholder="비밀번호" required onChange={onChage} />
            <input type="submit" value={newAccount ? "이메일 회원가입" : "로그인"} />
            <span className="is-login" onClick={chkAccount}>{newAccount ? "기존의 아이디로 로그인하기" : "회원가입"}</span>
        </form>
        <div className="btn-wrap flex-col-center">
            <button  className="google btn" onClick={onSocialClick} name="google">GOOGLE 로그인</button>
            <button  className="github btn" onClick={onSocialClick} name="github">GITHUB 로그인</button>
        </div>
    </div>
)
} 

export default Auth;