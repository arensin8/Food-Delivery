import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="foodDisplay" id="foodDisplay">
      <h2>Top dishes near you</h2>
      <div className="foodDisplayList">
        {food_list.map((item, index) => {
          return <FoodItem key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
