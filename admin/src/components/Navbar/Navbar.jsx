import './Navbar.css'
import {assets} from '../../assets/assets' 

const Navbar = () => {
    return (
        <div className='navbar'>
            <img className='logo' src={assets.logo} alt="logo" />
            <img src={assets.profile_image} alt="profile" className='profile'/>
        </div>
    );
};

export default Navbar;