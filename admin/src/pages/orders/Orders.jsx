import { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(url + "/api/order/list");
            if (response.status === 200) {
                setOrders(response.data.data);
            } else {
                toast.error("Something went wrong while fetching orders");
            }
        } catch (error) {
            toast.error("Error fetching orders");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="orderList">
                {orders.map((order, index) => (
                    <div key={index} className="orderItem">
                        <img src={assets.parcel_icon} alt="order" />
                        <div>
                            <p className='orderItemFood'>
                                {order.items.map((item, idx) => {
                                    console.log(item);
                                    if (idx === order.items.length - 1) {
                                        return item.name + " x " + item.quantity;
                                    } else {
                                        return item.name + " x " + item.quantity + ", ";
                                    }
                                })}
                            </p>
                            <p className="orderItemName">
                                {order.address.firstName+" "+order.address.lastName}
                            </p>
                            <div className="orderItemAddress">
                                <p>{order.address.street+","}</p>
                                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                            </div>
                            <p className='orderItemPhone'>{order.address.phone}</p>
                        </div>
                        <p>Items: {order.items.length}</p>
                        <p>${order.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
