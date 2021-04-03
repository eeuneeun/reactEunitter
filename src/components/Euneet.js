import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Euneet = ({euneetObj, isMine}) =>{
    //수정중인지 아닌지 판별하는 상태값
    const [editing, setEditing] = useState(false);
    //새로운 메시지를 담을 상태값
    const [newEuneet, setNewEuneet] = useState(euneetObj.msg);

    const onClickForDel = async () => {
        const chkDel = window.confirm("정말로 삭제 하실 건가요?");
        if(chkDel) {
            await dbService.doc(`euneets/${euneetObj.id}`).delete();
            await storageService.refFromURL(euneetObj.img).delete();
        }

    };

    const toggleEditing = () => {
        setEditing((prev) => !prev);
    }

    const onChagForEdit = (e) =>{
        const {target : {value}} = e;
        setNewEuneet(value);
    }

    const onSubmitForEdit = async (e) =>{
        e.preventDefault();
        await dbService.doc(`euneets/${euneetObj.id}`).update({
            msg:newEuneet
        })
        toggleEditing()
    }

    return(
        <>
        <div key={euneetObj.id} className="msg-item">
            {editing ? (
                <>
                <form onSubmit={onSubmitForEdit}>
                    <input type="text" placeholder={euneetObj.msg} maxLength={120} value={newEuneet} onChange={onChagForEdit} />
                </form>
                <button className="ok" onClick={toggleEditing}>확인</button>
                </>
            ):(
                <>
                <h4>{euneetObj.msg}</h4>
                {isMine && (
                    <>
                    <button className="msg-del fas fa-pen" onClick={onClickForDel}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    <button className="msg-mod" onClick={toggleEditing}>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    </>
                )}
                {euneetObj.img && <img src={euneetObj.img} alt="업로드 된 이미지" />}
                </>
            )}
        </div>
        </>
    )
}

export default Euneet;