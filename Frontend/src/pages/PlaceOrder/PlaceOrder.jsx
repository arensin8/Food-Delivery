import { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios'

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

  const placeOrder = async (event) => {
    event.preventDefault()
    let orderItems = [];
    food_list.map((item) => {
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address : data,
      items : orderItems,
      amount : getTotalCartAmount() + 2
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers : {token}})
    if(response.status === 201 || response.status === 200){
      const {session_url} = response.data;
      window.location.replace(session_url)
    }
  }

  return (
    <form className="placeOrder" onSubmit={placeOrder}>
      <div className="placeOrderLeft">
        <p className="title">Delivery Information</p>
        <div className="multiFields">
          <input required  name="firstName" onChange={onChangeHandler} type="text" placeholder="First Name" value={data.firstName} />
          <input required  name="lastName" onChange={onChangeHandler} type="text" placeholder="Last Name" value={data.lastName}/>
        </div>
        <input required  name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input required  name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multiFields">
          <input required  name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multiFields">
          <input required  name="zipcode" onChange={onChangeHandler} value={data.zipcode}type="text" placeholder="Zip code" />
          <input required  name="country" onChange={onChangeHandler} value={data.country}type="text" placeholder="Country" />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone}type="text" placeholder="Phone" />
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
