import React, { useEffect, useState } from 'react'
import Items from '../Items/Items'
import SlideProduct from '../Slide/SlideProduct';
import axios from 'axios';
import api from '../../../Helper/api'
const Home = () => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        getApi();
    }, []);
    const getApi = () => {

        axios.get(api)
            .then((response) => {
                setProduct(response.data)
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })

    }
    return (
        <div className='m-2 pb-20'>

            <SlideProduct />
            <h3 className='text-[20px] font-bold'>Sản phẩm nổi bật</h3>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {product.map((product) => (
                    <Items key={product._id} product={product} />
                ))}
            </div>
        </div >
    )
}

export default Home