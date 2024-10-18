import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { MdNavigateNext } from "react-icons/md";
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

    const dataCategory = [
        { id: 1, name: 'Điện thoại' },
        { id: 2, name: 'Máy tính' },
        { id: 3, name: 'Laptop' },
        { id: 4, name: 'Tai nghe' },
        { id: 5, name: 'Chuột' },
        { id: 6, name: 'Bàn phím' },
        { id: 7, name: 'Điện thoại' },
        { id: 8, name: 'Điện thoại' },
    ]
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // console.log(window.innerWidth)
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='flex md:gap-2'>
            <div className='hidden md:block md:w-[30%]'>
                {
                    dataCategory.slice(0, windowWidth > 850 ? 6 : 4).map((data) => {
                        return <div className='flex justify-between items-center bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 m-1 rounded-md '>
                            <h1 className='font-semibold'>{data.name}</h1>
                            <MdNavigateNext size={20} />
                        </div>
                    })
                }
            </div>
            <div className='md:w-[70%] w-full'>
                <Slider {...settings} className=''>
                    <div className='bg-slate-100 '>
                        <img className='w-full rounded-md  border border-gray-500 ' src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/thu-cu-banner-390-home.jpg" alt="" />
                    </div>
                    <div className='bg-slate-100'>
                        <img className=' w-full rounded-md border border-gray-500' src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/dat-truoc-apple-watch-s10-02-10.jpg" alt="" />
                    </div>
                    <div className='bg-slate-100'>
                        <img className='w-full rounded-md border border-gray-500' src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/Mo-ban-Galaxy-Tab-S10-Series-home.png" alt="" />
                    </div>
                </Slider>
            </div>
            <div>

            </div>
        </div>
    )
}

export default SlideProduct;