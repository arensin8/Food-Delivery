import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount ,token,food_list,cartItems,url} = useContext(StoreContext);

  const [data,setData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    street : "",
    city : "",
    state : "",
    country : "",
    zipcode : "",
    phone : "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({...data,[name]:value}))
  }

  useEffect(()=>{
console.log(data);
  },[data])

  const placeOrder = (event) => {
    event.preventDefault()
    let orderItems = [];
    food_list.map((item) => {
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    console.log(orderItems);
  }

  return (
    <form className="placeOrder" onSubmit={placeOrder}>
      <div className="placeOrderLeft">
        <p className="title">Delivery Information</p>
        <div className="multiFields">
          <input name="firstName" onChange={onChangeHandler} type="text" placeholder="First Name" value={data.firstName} />
          <input name="lastName" onChange={onChangeHandler} type="text" placeholder="Last Name" value={data.lastName}/>
        </div>
        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multiFields">
          <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multiFields">
          <input name="zipcode" onChange={onChangeHandler} value={data.zipcode}type="text" placeholder="Zip code" />
          <input name="country" onChange={onChangeHandler} value={data.country}type="text" placeholder="Country" />
        </div>
        <input name="phone" onChange={onChangeHandler} value={data.phone}type="text" placeholder="Phone" />
      </div>
      <div className="placeOrderRight">
        <div className="cartTotal">
          <h2>Cart Totals</h2>
          <div>
            <div className="cartTotalDetails">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartTotalDetails">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cartTotalDetails">
              <b>Total </b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">Proceed to payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
