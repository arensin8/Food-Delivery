import { useState } from "react";
import ExploreMenu from "../../componenets/ExploreMenu/ExploreMenu";
import Header from "../../componenets/Header/Header";
import "./Home.css";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
    </div>
  );
};

export default Home;
