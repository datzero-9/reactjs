import React, { useEffect, useState } from 'react'
import Items from '../Items/Items'
import SlideProduct from '../Slide/SlideProduct';
import axios from 'axios';
import api from '../../../Helper/api'
import BeatLoader from "react-spinners/BeatLoader";
const Home = () => {
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([]);
    useEffect(() => {
        getApi();

    }, []);
    const getApi = () => {

        axios.get(`${api}`)
            .then((res) => {
                setProduct(res.data)
                if (res.data) {
                    setLoading(false)
                }

            })
            .catch((error) => {
                console.log('lỗiii', error)
            })

    }
    return (
        <div className='m-2  flex justify-center  '>
            {
                loading &&
                <div className="flex justify-center items-center w-[100vw] h-[100vh] fixed bg-gray-50 bg-opacity-50 z-20 left-0 top-0 bottom-0 right-0">
                    <BeatLoader
                        color={'#DB142C'}
                        loading={loading}
                        size={10}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            }

            <div className='container'>
                <SlideProduct />
                <hr />
                <h3 className='text-[20px] font-bold'>Sản phẩm nổi bật</h3>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 bg-gray-50 p-2 rounded-md'>
                    {product.map((product) => (
                        <Items key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Home