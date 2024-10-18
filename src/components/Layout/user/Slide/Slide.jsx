import React from 'react'
import Slider from "react-slick";

const Slide = () => {
    var settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (

        <div>
            <Slider {...settings} className=''>
                <div className='bg-slate-100 '>
                    <img className='w-full h-8' src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top banner_Thu cu.svg" alt="" />
                </div>
                <div className='bg-slate-100'>
                    <img className='w-full h-8' src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top banner_Chinh hang.svg" alt="" />
                </div>
                <div className='bg-slate-100'>
                    <img className='w-full h-8' src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Smember.svg" alt="" />
                </div>
            </Slider>
        </div>

    )
}

export default Slide