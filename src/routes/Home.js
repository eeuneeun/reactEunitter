import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'fbase';
import Euneet from '../components/Euneet';

const Home = ({userObj}) => {
    const [euneets, setEuneets] = useState([]);
    const [euneet, setEuneet] = useState("");
    const [img, setImg] = useState("");

    // *collection 함수를 쓰지 않고 직접 구현
    // *euneets state 에 함수 리턴하는 부분 체크!
    // const getEineets = async() => {
    //     const dbEuneets = await dbService.collection("euneets").get();
    //     dbEuneets.forEach((msg) => {
    //         const euneetObj = {
    //             ...msg.data(),
    //             id : msg.id,
    //         }
    //         console.log(euneetObj)
    //         setEuneets((prev) => [euneetObj, ...prev]);
    //     });
    // }

    useEffect(()=>{
       //getEineets();
       dbService.collection("euneets").onSnapshot((snapshot) => {
        const euneetArr = snapshot.docs.map((doc)=>({
               id:doc.id,
              ...doc.data()
        }));
        setEuneets(euneetArr);
       })
    },[]);

    const onSubmit = async(e) =>{
        e.preventDefault();
        let imgURL="";
        
        if(img){
            const imgRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const imgRes = await imgRef.putString(img, "data_url");
            imgURL = await imgRes.ref.getDownloadURL();
        }

        await dbService.collection("euneets").add({
            msg:euneet, 
            createdAt:Date.now(),
            createId : userObj.uid,
            img : imgURL
        });
        setEuneet("")
        setImg("");
    }
    const onChage = (e) =>{
        const {target : {value}} = e;
        setEuneet(value);
    }

    const onChangeForFile = (e) => {
        const {target:{files}} = e;
        const theFile = files[0];
        const imgReader = new FileReader();
    
        imgReader.onloadend = (finishedE) =>{
            const {currentTarget : {result}} = finishedE;
            setImg(result);
        }
        
        //실제 서버로 이미지를 보냄 
        imgReader.readAsDataURL(theFile)
    }

    const onClickForFileDel = (e) => {
        setImg(null)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="하고 싶은 말을 입력하세요!" maxLength={120} value={euneet} onChange={onChage} />
                <input type="file" accept="image/*" onChange={onChangeForFile} />
                <input type="submit" value="eunitt!" />
                {img && (
                    <>
                    <div>
                        <img src={img} alt="업로드 하고 싶은 사진의 썸네일 이미지" />
                        <button onClick={onClickForFileDel}>이미지 삭제!</button>
                    </div>
                    </>
                )} 
            </form>
            <div>
                {euneets.map(euneet => (
                    <Euneet key={euneet.id} euneetObj={euneet} isMine={euneet.createId === userObj.uid}/>
                ))}
            </div>

        </div>
    )
}

export default Home