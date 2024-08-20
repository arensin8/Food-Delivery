import { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios'



const LoginPopup = ({ setShowLogin }) => {

  const [currState, setCurrState] = useState("Login");
  const {url,setToken} = useContext(StoreContext)

  const [data,setData] = useState({
    name : "",
    email:"",
    password:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({...data,[name]:value}))
  }

  const onLogin = async (event)=>{
    event.preventDefault();
    let newUrl = url;
    currState === "Login" ? (newUrl += '/api/user/login'):(newUrl += '/api/user/register')
    const response = await axios.post(newUrl,data)
    console.log(response);
    if(response.status === 201){
      console.log(response.data.token);
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
    }else{
      alert(response.data.message)
    }
  }
 

  return (
    <>
      <div className="loginPopup">
        <form onSubmit={onLogin} className="loginPopupContainer">
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
              <input type="text" placeholder="Your name" name='name' onChange={onChangeHandler} value={data.name} required />
            )}
            <input type="email" placeholder="Your email" name='email' onChange={onChangeHandler} value={data.email} required />
            <input type="password" placeholder="Password" name='password' onChange={onChangeHandler} value={data.password} required />
            <button type="submit">
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
