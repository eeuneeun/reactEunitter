import { authService, dbService } from 'fbase';
import React, {useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const Profile = ({userObj, refreshUser}) => {
    const [newDisplayName, setNewDisplayName] = useState("");
    const history = useHistory();
    const onLogoutClick = () =>{
        authService.signOut();
        history.pushState("/");
    } 

    const getMyEuneets = async() => {
        const euneets = await dbService.collection("euneets").where("createId", "==", userObj.uid).orderBy("createdAt", "desc").get();
        console.log(euneets)
        euneets.docs.map((msg) => {
            console.log(msg.data());
        });
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
    
    useEffect(()=>{
        getMyEuneets();
    }, []);

    return(
        <>
            <form onSubmit={onSubmitForUpdateProfile}>
                <input type="text" placeholder={userObj.displayName} onChange={onChangeForNewName}/>
                <input type="submit" value="저장" />
            </form>
            <button onClick={onLogoutClick}>로그아웃</button>
        </>
    )
}

export default Profile