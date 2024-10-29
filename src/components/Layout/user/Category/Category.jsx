import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import api from '../../../Helper/api';
import Items from '../Items/Items';
const Category = () => {
    const location = useLocation();
    const { name } = location.state || {};

    /// lấy ra list product có  danh mụa như đã click
    const [listProduct, setListProduct] = useState([])
    useEffect(() => {
        getItemcate(name);
    }, [])
    const getItemcate = (name) => {
        try {
            axios.get(`${api}/listProductCategory/${name}`)
                .then((res) => {
                    setListProduct(res.data)
                })
        } catch (error) {
            console.log()
        }
    }
    return (
        <div className='m-2 pb-20'>
            <div>
                <h2 className='text-[20px] font-bold my-2'>Danh sách sản phẩm: {name}</h2>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
                    {
                        listProduct.map((product, index) => {
                            return (
                                <Items key={index} product={product} />
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default Category