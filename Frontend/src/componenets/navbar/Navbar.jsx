import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, getTotalItemsCount ,token,setToken} = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo1} className="logo" alt="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#exploreMenu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#AppDw"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      <div className="navbar-right">
        <i class="fa-solid fa-magnifying-glass"></i>
        <div className="navbar-search-icon">
          <Link to="/cart">
            <i class="fa-solid fa-cart-shopping"></i>
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}>
            {getTotalItemsCount() !== 0 ? getTotalItemsCount() : ""}
          </div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}>Sign in</button> :
        (<div className="navbarProfile">
<img src={assets.profile_icon} alt="profile" />
<ul className="navProfileDropdown">
  <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
  <hr />
  <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Log out</p></li>
</ul>
        </div>)}
    
      </div>
    </div>
  );
};

export default Navbar;
