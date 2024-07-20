import { useState } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";

const FoodItem = ({ item }) => {
  const [itemCount, setItemCount] = useState(0);

  return (
    <div className="foodItem">
      <div className="foodItemImgContainer">
        <img className="foodItemImg" src={item.image} alt="image" />
        {!itemCount ? (
          <img
            src={assets.add_icon_white}
            className="add"
            onClick={() => setItemCount((prev) => prev + 1)}
          />
        ) : (
          <div className="foodItemCounter">
            <img
              src={assets.remove_icon_red}
              alt="remove"
              onClick={() => setItemCount((prev) => prev - 1)}
            />
            <p>{itemCount}</p>
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={() => setItemCount((prev) => prev + 1)}
            />
          </div>
        )}
      </div>
      <div className="foodIteminfo">
        <div className="foodItemNameRating">
          <p>{item.name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="foodItemDesc">{item.description}</p>
        <p className="foodItemPrice">${item.price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
