import { authService } from 'fbase';
import React from 'react';

const Profile = () => {
    const onLogoutClick = () => authService.signOut();
    return(
        <>
            <button onClick={onLogoutClick}>로그아웃</button>
        </>
    )
}

export default Profile