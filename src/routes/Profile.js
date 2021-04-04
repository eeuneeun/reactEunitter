import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { authService, dbService } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Euneet from '../components/Euneet';

const Profile = ({userObj, refreshUser}) => {
    const [euneets, setEuneets] = useState([]);
    const [euneet, setEuneet] = useState([]);

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

    useEffect(()=>{
        dbService
            .collection("euneets")
            .where("createId","==", userObj.uid)
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                const euneetArr = snapshot.docs.map((msg) => ({
                    id: msg.id,
                    ...msg.data(),
                }));
            setEuneets(euneetArr);
        });
        console.log(euneets)
    },[])
    
    return(
        <>
        <div className="profile flex-col-center">
            <form onSubmit={onSubmitForUpdateProfile} className="flex-center">
                <input type="text" placeholder={`${userObj.displayName}님 수정할 이름을 입력해주세요!`} onChange={onChangeForNewName}/>
                <button className="save">
                    <FontAwesomeIcon icon={faPen}/>
                </button>
            </form>
            <button onClick={onClickForLogout} className="btn logout">로그아웃</button>

            <div className="home flex-col-center">
                <div className="msg-list">
                    {euneets.map((euneet) => (
                        <Euneet
                            key={euneet.id}
                            euneetObj={euneet}
                            isMine={true}
                        />
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile