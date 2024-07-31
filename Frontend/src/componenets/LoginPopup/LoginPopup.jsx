import { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");

  return (
    <>
      <div className="loginPopup">
        <form className="loginPopupContainer">
          <div className="loginPopupTitle">
            <h2>{currState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div className="loginPopupInput">
            {currState === "Login" ? (
              <></>
            ) : (
              <input type="text" placeholder="Your name" required />
            )}
            <input type="email" placeholder="Your email" required />
            <input type="password" placeholder="Password" required />
            <button>
              {currState === "Sign Up" ? "Create account" : "Login"}
            </button>
          </div>
          <div className="loginPopupCondition">
            <input type="checkbox" required />
            <p>By continuing, I aggree to the terms of use & privacy policy.</p>
          </div>
          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account ?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPopup;
