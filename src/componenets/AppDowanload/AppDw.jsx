import { assets } from "../../assets/assets";
import "./AppDw.css";

const AppDw = () => {
  return (
    <>
      <div className="appDw" id="AppDw">
        <p>
          For better experience download
          <br /> Aren's Delivery app
        </p>
        <div className="appDwPlatforms">
          <img src={assets.play_store} alt="" />
          <img src={assets.app_store} alt="" />
        </div>
      </div>
    </>
  );
};

export default AppDw;
