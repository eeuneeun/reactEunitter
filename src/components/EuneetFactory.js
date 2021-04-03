import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';

const EuneetFactory = ({ userObj }) =>{
    const [euneet, setEuneet] = useState("");
    const [img, setImg] = useState("");

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

    return(
        <form onSubmit={onSubmit}>
            <div>
                <input type="text" placeholder="하고 싶은 말을 입력하세요!" maxLength={120} value={euneet} onChange={onChage} />
                <button className="save">
                    <FontAwesomeIcon icon={faTerminal} color="green"/>
                </button>
            </div>
            <input type="file" className="file" accept="image/*" onChange={onChangeForFile} />
        {img && (
            <>
            <div className="preview-img">
                <img src={img} alt="업로드 하고 싶은 사진의 썸네일 이미지" />
                <button onClick={onClickForFileDel}>X</button>
            </div>
            </>
        )} 
    </form>
    )
};


export default EuneetFactory;