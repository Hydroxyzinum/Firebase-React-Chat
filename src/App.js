import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./Components/NavBar";
import { AppRouter } from "./Components/AppRouter";
import { Context } from ".";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "./Components/Loader";

function App() {
  const { auth } = useContext(Context);

  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <Loader />;
  }
  
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
