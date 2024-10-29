import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { CiShop } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import formatPrice from '../../../Helper/formatPrice'
import api from '../../../Helper/api';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";
const Checkout = () => {
    // dữ liệu được lấy từ component Cart
    const location = useLocation();
    const { listCart, total } = location.state || {};
    //format ngày
  
    const items = listCart.length;
    // xác nhận mua hàng
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleBuyProduct = () => {
        setLoading(true)
        setTimeout(() => {
            alert("Đặt hàng thành công")
            setLoading(false)
            navigate('/user/cart')
        }, 3000)
    }
    const getListCart = () => {
        alert("xóa thành công vui lòng refresh lại trang ");
    }
    return (
        <div className='p-3'>
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

            <h3 className='text-23 font-bold text-center '>Thông tin đặt hàng</h3>
            <div className='border border-gray-300 rounded-xl p-5'>
                <div className='p-2'>
                    <h5 className='text-17 font-semibold pb-2'>Địa chỉ giao hàng:</h5>
                    <input type="text" placeholder='Nhập thông tin địa chỉ' className=' p-1 border border-gray-400 rouned-xl w-full' />
                </div>

                <div className='p-2'>
                    <h5 className='text-17 font-semibold pb-2'>Số điện thoại:</h5>
                    <input type="text" placeholder='Nhập thông tin số điện thoại' className=' p-1 border border-gray-400 rouned-xl w-full' />
                </div>

                <div className='p-2'>
                    <h5 className='text-17 font-semibold pb-2 '>Sản phẩm sẽ mua:</h5>
                    <div className='flex flex-col items-center'>
                        {
                            listCart.map((data, index) => {
                                return (
                                    <div key={index} className='w-full sm:w-[550px] md:w-[700px]  xl:w-[1024px] '>
                                        <div className='p-1'>
                                            <div className='border border-gray-400 p-2 m-1 rounded-xl'>
                                                <div className='flex items-center justify-between p-1 border-b border-gray-300'>
                                                    <div className='flex items-center gap-2'>
                                                        <CiShop size={19} className='text-red-500' />
                                                        <p className='font-bold text-red-500'> LSHOP-TECH  </p>
                                                    </div>
                                                </div>
                                                <div className='flex  p-1'>
                                                    <img src={data.image} alt="" className=' h-[60px] border border-gray-400 rounded-md p-1' />
                                                    <div className='pl-3'>
                                                        <h3 className='text-[12px] font-medium'>{data.name}</h3>
                                                        <div className='flex gap-2'>
                                                            <h3 className='text-red-600 text-[12px]'>{formatPrice(data.price)} đ</h3>
                                                            <h3 className='text-[12px]'>x {data.quantity}   </h3>
                                                            <h3 className='text-[12px] text-red-600 '>= {formatPrice(data.price * data.quantity)} đ</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            {/* mua sản phẩm  */}
                <div className='flex justify-end p-2' onClick={handleBuyProduct}>
                    {
                        items < 1 ? <div>Không có sản phẩm</div> : <button className='rounded-md p-2 text-15 font-semibold bg-red-500 hover:bg-red-400 text-white'>{formatPrice(total)} đ - Xác nhận</button>
                    }
                </div>
            </div>

        </div>
    )
}

export default Checkout