import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Body from "./Body";
import { SigninContext } from "./SigninContext.js";
import React, { useState } from "react";

function App() {
  const [isShowSignin, setIsShowSignin] = useState(false);
  const [isShowSignup, setIsShowSignup] = useState(false);
  const [isupdatePassword, setUpdatePassword] = useState(false);

  return (
    <div className="App">
      <SigninContext.Provider
        value={{
          signin: { isShowSignin, setIsShowSignin },
          signup: { isShowSignup, setIsShowSignup },
          update: { isupdatePassword, setUpdatePassword },
        }}
      >
        <Header />
        <Body />
        <Footer />
      </SigninContext.Provider>
    </div>
  );
}

export default App;
