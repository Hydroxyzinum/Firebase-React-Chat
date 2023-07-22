import React, { useContext, useEffect, useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { Context } from "..";

export const Chat = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [state, setState] = useState("");
  const [messagesData, setMessagesData] = useState([]);
  const chatWindowRef = useRef(null); // Создаем реф для доступа к окну чата

  const sendMessage = async () => {
    try {
      // Отправка сообщения
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
    setState(""); // Очистка поля ввода после отправки сообщения
  };

  const deleteMessage = async (messageId) => {
    try {
      // Удаление сообщения
      await deleteDoc(doc(firestore, "messages", messageId));
      console.log("Document successfully deleted!");
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const getMessages = async () => {
    const q = query(collection(firestore, "messages"), orderBy("createdAt", "asc"));

    // Слушаем изменения в коллекции сообщений
    onSnapshot(q, (querySnapshot) => {
      setMessagesData(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  };

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(); // Прокручиваем окно чата к последнему сообщению при первой загрузке
    getMessages(); // Получаем сообщения из базы данных
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage(); // Отправляем сообщение по нажатию Enter
    }
  };
  
  useEffect(() => {
    scrollToBottom(); // Прокручиваем окно чата к последнему сообщению при изменении messagesData
  }, [messagesData]);

  return (
    <div className="chat-container">
      <div className="chat-window" ref={chatWindowRef}>
        {messagesData.map((message) => {
          return (
            <div
              key={message.id}
              style={{
                flexDirection: user.uid === message.uid ? "row-reverse" : "row",
              }}
              className="message-container"
            >
              <div className="avatar-container">
                <img className="avatar" src={message.photoURL} alt={message.photoURL} />
              </div>
              <div className="message">{message.text}</div>
              {user.uid === message.uid && (
                <button className="delete-button" onClick={() => deleteMessage(message.id)}>X</button>
              )}
            </div>
          );
        })}
      </div>
      <div className="chat-input">
        <input
          value={state}
          onChange={(e) => setState(e.target.value)}
          onKeyDown={handleKeyPress}
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