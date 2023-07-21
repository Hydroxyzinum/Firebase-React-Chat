import { useContext } from "react";
import { Context } from "..";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const Login = () => {
  const { auth } = useContext(Context);

  const login = async () => {        
    const provider = new GoogleAuthProvider()
    const { user } = await signInWithPopup(auth, provider)
    console.log(user);
};

  return (
    <div className="login-container">
      <div className="login-btn_container">
        <button onClick={login} className="google-login_btn">
          Вход с помощью Google
        </button>
      </div>
    </div>
  );
};
