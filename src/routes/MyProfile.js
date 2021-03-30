import { authService } from 'fbase';
import React from 'react';
import { useHistory } from 'react-router';

const Profile = () => {
    const history = useHistory();
    const onLogoutClick = () =>{
        authService.signOut();
        history.pushState("/");
    } 
    return(
        <>
            <button onClick={onLogoutClick}>로그아웃</button>
        </>
    )
}

export default Profile