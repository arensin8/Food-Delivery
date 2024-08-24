import { assets } from "../../assets/assets";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footerContent">
        <div className="footerContentLeft">
          <Link to="/">
            <img src={assets.logo1} alt="logo" />
          </Link>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            voluptatem provident cum nostrum praesentium odit ut commodi ducimus
            dolorem, repellendus aliquid necessitatibus aut voluptate molestiae
            atque nam saepe amet voluptatibus.
          </p>
          <div className="footerSocialIcons">
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-linkedin"></i>
          </div>
        </div>
        <div className="footerContentCenter">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footerContentRight">
          <h2>Get In Touch</h2>
          <ul>
            <li>+374-95123456</li>
            <li>contact@Arendelivert.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footerCW">
        <p>Copyright 2024 &copy; ArensDelivery.com - All rights reserved.</p>
      </p>
    </div>
  );
};

export default Footer;
