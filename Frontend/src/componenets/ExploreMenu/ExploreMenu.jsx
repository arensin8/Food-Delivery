import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  const filterCategory = (item) =>
    setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name));

  return (
    <div className="exploreMenu" id="exploreMenu">
      <h1>Explore our menu</h1>
      <p className="exploreMenuText">
        Chhose from a diverse menu feauturing a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicioud meal at a time.
      </p>
      <div className="exploreMenuList">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name,
                )
              }
              key={index}
              className="exploreMenuListItem"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
