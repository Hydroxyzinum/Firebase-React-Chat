import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  doc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { Context } from "..";
export const Chat = () => {
  const { auth, firestore } = useContext(Context);

  const [user] = useAuthState(auth);

  const [state, setState] = useState("");

  const [messagesData, setMessagesData] = useState([]);

  const sendMessage = async () => {
    try {
      const docRes = await addDoc(collection(firestore, "messages"), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: state,
        createdAt: Timestamp.fromDate(new Date()),
      });
      console.log("Document written with ID: ", docRes.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setState("");
  };

  const getMessages = async () => {
    const q = query(
      collection(firestore, "messages"),
      orderBy("createdAt", "asc")
    );

    onSnapshot(q, (querySnapshot) => {
      setMessagesData([]);

      querySnapshot.docs.map((doc) => {
        setMessagesData((prevState) => {
          return [...prevState, doc.data()];
        });
      });
    });
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messagesData.map((message) => {
          return (
            <div
              key={user.uid}
              style={{
                flexDirection: user.uid === message.uid ? "row-reverse" : "row",
              }}
              className="message-container"
            >
              <div className="avatar-container">
                <img
                  className="avatar"
                  src={message.photoURL}
                  alt={message.photoURL}
                />
              </div>
              <div className="message">{message.text}</div>
            </div>
          );
        })}
      </div>
      <div className="chat-input">
        <input
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="message-inp"
          type="text"
          placeholder="Сообщение"
        />
        <button onClick={sendMessage} className="send-mail">
          Отправить
        </button>
      </div>
    </div>
  );
};
