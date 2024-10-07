import React from 'react'
import Slider from "react-slick";

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
    return (
        <div className=' '>
            <Slider {...settings} className=''>
                <div className='bg-slate-100 '>
                    <img className=' w-full rounded-md  border border-gray-500 ' src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/thu-cu-banner-390-home.jpg" alt="" />
                </div>
                <div className='bg-slate-100'>
                    <img className=' w-full rounded-md border border-gray-500' src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/dat-truoc-apple-watch-s10-02-10.jpg" alt="" />
                </div>
                <div className='bg-slate-100'>
                    <img className='w-full rounded-md border border-gray-500' src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/Mo-ban-Galaxy-Tab-S10-Series-home.png" alt="" />
                </div>
            </Slider>
        </div>
    )
}

export default SlideProduct;