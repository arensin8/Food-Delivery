import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebarOptions">
                <NavLink to='/add' className="sidebarOption">
                    <img src={assets.add_icon} alt="" />
                    <p>Add Item</p>
                </NavLink>
                <NavLink to='/list' className="sidebarOption">
                    <img src={assets.order_icon} alt="" />
                    <p>List item</p>
                </NavLink>
                <NavLink to='/orders' className="sidebarOption">
                    <img src={assets.order_icon} alt="" />
                    <p>Orders</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;