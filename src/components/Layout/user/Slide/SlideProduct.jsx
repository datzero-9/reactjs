import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { MdNavigateNext } from "react-icons/md";
import axios from 'axios';
import api from '../../../Helper/api';
import { Link, useNavigate } from 'react-router-dom';
// import { useOutletContext } from 'react-router-dom';
const SlideProduct = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000
    };



    // console.log(window.innerWidth)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        getApi()
        getListCategory()
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    //Lấy ra sản phẩm mới nhất
    const [product, setProduct] = useState([]);
    const getApi = () => {

        axios.get(`${api}`)
            .then((res) => {
                setProduct(res.data)
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })

    }
    // nổi bật category
    // const { category } = useOutletContext();

    // lấy ra list danh mục ( category)
    const [listCategory, setListCategory] = useState([])
    const getListCategory = () => {

        axios.get(`${api}/category`)
            .then((res) => {
                setListCategory(res.data)
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })
    }
    // xét số lượng item category sẽ hiển thị ra
    const lengthCate = listCategory.length;
    const [itemCate, setItemCate] = useState(4)
    // console.log(`length : ${lengthCate} -- item: ${itemCate}`)
    const handleAddCate = () => {

        if (lengthCate > itemCate) {
            setItemCate(itemCate + 1);
        } else {
            setItemCate(4)
        }
    }


    // lấy danh mục sản phẩm được click 
    const navigate = useNavigate()
    const getItemCate = (name) => {
        // console.log('id:' + id)
        navigate(`/user/category`, { state: { name } })
    }
    return (
        <div className='flex md:gap-2 pb-2'>
            <div className={`hidden md:block md:w-[30%] lg:w-[25%]  rounded-md`}>
                {
                    listCategory.slice(0, itemCate).map((data, index) => {
                        return <div key={index} onClick={() => { getItemCate(data.name) }} className='flex justify-between items-center bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 m-1 rounded-md '>
                            <h1 className='font-semibold'>{data.name}</h1>
                            <MdNavigateNext size={20} />
                        </div>
                    })
                }
                <div className='flex justify-center my-2' onClick={handleAddCate}>
                    <button className='p-1 border border-black  rounded-md hover:bg-gray-100'>{itemCate < lengthCate ? 'Xem thêm' : 'Ẩn bớt'}</button>
                </div>
            </div>
            <div className='md:w-[70%] lg:w-[50%] w-full '>
                <Slider {...settings} className=''>
                    <div className='bg-slate-100 '>
                        <img className='w-full rounded-md  border border-gray-500 ' src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/thu-cu-banner-390-home.jpg" alt="" />
                    </div>
                    <div className='bg-slate-100'>
                        <img className=' w-full rounded-md border border-gray-500' src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/sliding-home-iphone-16-pro-km-moi.jpg" alt="" />
                    </div>
                    <div className='bg-slate-100'>
                        <img className='w-full rounded-md border border-gray-500' src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/Mo-ban-Galaxy-Tab-S10-Series-home.png" alt="" />
                    </div>
                </Slider>
            </div>
            <div className='lg:w-[25%] hidden lg:block gap-2'>
                <h6 className='font-bold pb-2 text-center'>Sản phẩm mới nhất</h6>
                {
                    product.slice(0, 2).map((data, index) => {
                        return (
                            <Link to={`/user/detail?id=${data._id}`}>
                                <div key={index} className='m-2 p-2 flex justify-center hover:bg-gray-100 rounded-md cursor-pointer'>
                                    <img src={data.image} alt="Ảnh bị lỗi" className='w-[70%] h-[100px] rounded-md bg-red-200' />
                                </div>
                            </Link>
                            )
                    })
                }
            </div>
        </div>
    )
}

export default SlideProduct;