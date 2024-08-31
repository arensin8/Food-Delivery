import { useNavigate, useSearchParams } from "react-router-dom";
import "./Verify.css";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios"

function Verify() {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    // finding the value of the key in the params
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext)


    const verifyPayment = async () => {
        const response = await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.status === 200){
            navigate('/myorders')
        }else{
            navigate('/')
        }
    }


     useEffect(() => {
        verifyPayment()
     }, []);

    return (
        <div className="verify">
            <div className="spinner"></div>
        </div>
    );
}

export default Verify;