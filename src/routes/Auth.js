import React, { useState } from 'react';

const Auth = () =>{
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const onChage = (e) =>{
    const {target:{name, value}} = e;
    console.log(e.target.name)
    if(name === "email"){

    }else if(name === "password"){

    }
}
const onSubmit = (e) =>{
    e.preventDefault(); 
}

return (
    <div>
        <h1>Auth</h1>
        <form onSubmit={onSubmit}>
            <input type="email" name="email" value={email} placeholder="아이디" required value={email} onChange={onChage} />
            <input type="password" name="password" value={password} placeholder="비밀번호" required value={password} onChange={onChage} />
            <input type="submit" placeholder="로그인" />
        </form>
        <div>
            <button>GOOGLE 로그인</button>
            <button>GITHUB 로그인</button>
        </div>
    </div>
)
} 

export default Auth;