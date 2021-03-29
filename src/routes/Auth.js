import { authService } from 'fbase';
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
return (
    <div>
        <h1>Auth</h1>
        <form onSubmit={onSubmit}>
            <input type="email" name="email" placeholder="아이디" required onChange={onChage} />
            <input type="password" name="password" placeholder="비밀번호" required onChange={onChage} />
            <input type="submit" value={newAccount ? "이메일 회원가입" : "로그인"} />
            <span onClick={chkAccount}>{newAccount ? "로그인" : "회원가입"}</span>
            <span>{error}</span>
        </form>
        <div>
            <button>GOOGLE 로그인</button>
            <button>GITHUB 로그인</button>
        </div>
    </div>
)
} 

export default Auth;