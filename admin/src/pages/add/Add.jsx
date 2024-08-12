import './Add.css';
import {assets} from '../../assets/assets.js'
import { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = () => {

    const url = 'http://localhost:4000'
    const [image , setImage] = useState(false)
    const [data , setData] = useState({
        name : '',
        description : '',
        price : '',
        category : 'Salad'
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({...data , [name] : value}))
    }


    const onSubmitHandler = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        for (const key in data) {
            // Ensuring the key is a property of data
            if (data.hasOwnProperty(key)) {  
                formData.append(key, data[key]);
            }
        }
        formData.append("image" , image)
        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.status === 201) {
                setData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Salad',
                });
                setImage(false);
                toast.success(response.data.message)
            } else {
                console.log('Server responded with an error:', response.data);
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error('An error occurred:', error.response ? error.response.data : error.message);
        }
        
    }

    return (
        <div className='add'>
            <form action="" className="flexCol" onSubmit={onSubmitHandler}>
                <div className="addImgUpload flexCol">
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required/>
                </div>
                <div className="addProdName flexCol">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here'/>
                </div>
                <div className="addProdDesc flexCol">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>
                <div className="addCategoryPrice">
                    <div className="addCategory flexCol">
                        <p>Add category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="addPrice flexCol">
                        <p>Add Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
                    </div>
                </div>
                <button type='submit' className='addBtn'>ADD</button>
            </form>
            
        </div>
    );
};

export default Add;