import { useEffect, useState } from 'react';
import './List.css';
import { toast } from 'react-toastify';
import axios from 'axios'

const List = () => {


    const [list,setList] = useState([]);

    const url = 'http://localhost:4000'
    const fetchList = async () => {
        const result = await axios.get(`${url}/api/food/list`)
        console.log(result.data);
        if(result){
            setList(result.data.data)
        }else{
            toast.error("Error!")
        }
    }

    const removeFood = async (foodId) => {
        try {
            const result = await axios.delete(`${url}/api/food/remove/${foodId}`);
            toast.success("Food deleted successfully!");
            await fetchList();
        } catch (error) {
            console.error('Error deleting food:', error.response ? error.response.data : error.message);
            toast.error("Error deleting food!");
        }
    };
    

    useEffect(() => {
        fetchList()
    },[])
    return (
        <div className='list add flexCol'>
            <p>All foods list</p>
            <div className="listTable">
                <div className="listTableFormat title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item,index) => {
                    return (
                        <div className='listTableFormat' key={index}>
                            <img src={`${url}/images/`+item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
                        </div>
                    )
                })}
            </div>
            
        </div>
    );
};

export default List;