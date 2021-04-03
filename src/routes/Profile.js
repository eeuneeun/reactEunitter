import React, {useState } from 'react';
import { useHistory } from 'react-router';
import { authService } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const Profile = ({userObj, refreshUser}) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const history = useHistory();
    
    const onClickForLogout = () =>{
        authService.signOut();
        history.push("/");
    } 
    
    const onChangeForNewName = (e) => {
        setNewDisplayName(e.currentTarget.value);
        console.log(newDisplayName)
    }
    
    const onSubmitForUpdateProfile = async (e) => {
        e.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({displayName : newDisplayName});
            refreshUser();
        }
    }
    
    return(
        <>
        <div className="profile flex-col-center">
            <form onSubmit={onSubmitForUpdateProfile} className="flex-center">
                <input type="text" placeholder={userObj.displayName} onChange={onChangeForNewName}/>
                <button className="save">
                    <FontAwesomeIcon icon={faPen} color="green"/>
                </button>
            </form>
            <button onClick={onClickForLogout} className="btn logout">로그아웃</button>
        </div>
        </>
    )
}

export default Profile