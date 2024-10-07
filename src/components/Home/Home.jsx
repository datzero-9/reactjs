import React, { useEffect, useState } from 'react'
import Items from '../Items/Items'
import SlideProduct from '../Slide/SlideProduct';
import Search from '../NavBar/Search';
import axios from 'axios';
const Home = () => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        getApi();
    }, []);
    const getApi = () => {
        axios.get(' http://192.168.1.5:80/admin')
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