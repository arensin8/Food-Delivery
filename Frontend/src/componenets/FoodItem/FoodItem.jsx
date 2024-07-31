import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ item }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="foodItem">
      <div className="foodItemImgContainer">
        <img className="foodItemImg" src={item.image} alt="image" />
        {!cartItems[item._id] ? (
          <img
            src={assets.add_icon_white}
            className="add"
            onClick={() => addToCart(item._id)}
          />
        ) : (
          <div className="foodItemCounter">
            <img
              src={assets.remove_icon_red}
              alt="remove"
              onClick={() => removeFromCart(item._id)}
            />
            <p>{cartItems[item._id]}</p>
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={() => addToCart(item._id)}
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
