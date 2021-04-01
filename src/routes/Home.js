import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';

const Home = ({userObj}) => {
    const [euneets, setEuneets] = useState([]);
    const [euneet, setEuneet] = useState("");

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
       console.log(euneets)

       })
    },[]);

    const onSubmit = async(e) =>{
        e.preventDefault();
        await dbService.collection("euneets").add({
            msg:euneet, 
            createdAt:Date.now(),
            createId : userObj.uid
        });
        setEuneet("")
    }
    const onChage = (e) =>{
        const {target : {value}} = e;
        setEuneet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="하고 싶은 말을 입력하세요!" maxLength={120} value={euneet} onChange={onChage} />
                <input type="submit" value="eunitt!" />
            </form>
            <div>
                {euneets.map(euneet => {
                    return(
                    <>
                    <div key={euneet.id}>
                        <h4>{euneet.msg}</h4>
                    </div>
                    </>
                    )
                })}
            </div>

        </div>
    )
}

export default Home