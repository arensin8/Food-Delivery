import { useState } from "react";
import ExploreMenu from "../../componenets/ExploreMenu/ExploreMenu";
import Header from "../../componenets/Header/Header";
import "./Home.css";
import FoodDisplay from "../../componenets/FoodDisplay/FoodDisplay";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default Home;
