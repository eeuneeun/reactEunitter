import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Euneet from "../components/Euneet";
import EuneetFactory from "components/EuneetFactory";

const Home = ({ userObj }) => {
  const [euneets, setEuneets] = useState([]);

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

  useEffect(() => {
    //getEineets();
    dbService
        .collection("euneets")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
      const euneetArr = snapshot.docs.map((msg) => ({
        id: msg.id,
        ...msg.data(),
      }));
      setEuneets(euneetArr);
    });
  }, []);

  return (
    <div className="home flex-col-center">
      <EuneetFactory userObj={userObj} />
      <div className="msg-list">
        {euneets.map((euneet) => (
          <Euneet
            key={euneet.id}
            euneetObj={euneet}
            isMine={euneet.createId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
