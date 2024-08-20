import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token,setToken] = useState("")
  const url = 'http://localhost:4000';


  const addToCart = (itemId) => {
    setCartItems((prevState) => {
      // Create a copy of previous state
      const updatedCartItems = { ...prevState };
      // Check if item exists in cartItems
      if (updatedCartItems[itemId]) {
        // Item exists: increment quantity by 1
        updatedCartItems[itemId] += 1;
      } else {
        // Item does not exist: add it with quantity 1
        updatedCartItems[itemId] = 1;
      }

      return updatedCartItems;
    });
  };

  //anoher way of wrinting func
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalItemsCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalCount += cartItems[item];
      }
    }
    return totalCount;
  };

  useEffect(() => {
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))

    }
  },[])

  const contextValue = {
    food_list,
    addToCart,
    cartItems,
    setCartItems,
    removeFromCart,
    getTotalCartAmount,
    getTotalItemsCount,
    url,
    token,
    setToken
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
