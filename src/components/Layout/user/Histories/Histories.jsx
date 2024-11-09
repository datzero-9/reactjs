import axios from 'axios';
import React, { useEffect, useState } from 'react'
import api from '../../../Helper/api';
import { IoIosArrowRoundBack } from "react-icons/io";
import { LiaFacebookMessenger } from "react-icons/lia";
import { Link, useLocation } from 'react-router-dom';
import { TiTickOutline } from "react-icons/ti";
import formatNumberWithCommas from '../../../Helper/formatPrice';
const Histories = () => {
    // lấy thông tin tuwf localstorage
    const user = JSON.parse(localStorage.getItem('user'));

    // lấy ra tất cá các  order tử iduser name
    useEffect(() => {
        getHistories()
    }, [])
    const [listOrder, setListOrder] = useState([])
    const getHistories = () => {
        try {
            axios.post(`${api}/getHistories`, { id: user.id })
                .then((res) => {
                    setListOrder(res.data)
                    console.log(res.data)
                })
        } catch (error) {
            console.log("có lỗi xảy ra vui lòng kiểm tra: " + error)
        }
    }

    const getOrderDetail = (id) => {
        alert(id)
    }
    return (
        <div className='flex flex-col items-center p-2 '>

            <div className='border border-black rounded-md p-2 container'>
                {/* trờ lại trang home  */}
                <div className='flex bg-gray-100 p-2 justify-between rounded-md'>
                    <div className='flex  items-center'>
                        <Link to="/user">
                            <IoIosArrowRoundBack className='text-red-500 text-[35px]' />
                        </Link>

                        <p className=' pl-3 font-medium text-[16px]'>Quay lại </p>
                    </div>
                    <div className='flex items-center'>
                        <LiaFacebookMessenger size={30} className='text-red-500' />
                    </div>
                </div>
                {/* lịch sử đơn hàng  */}
                <h1 className='font-bold'>Lịch sử đơn hàng</h1>
                {
                    listOrder.map((data, index) => {
                        return (
                            <div key={index} onClick={() => { getOrderDetail(data._id) }}>

                                <div className='border border-gray-400 m-2 p-2 rounded-md cursor-pointer hover:bg-gray-200 text-13'>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-4'>
                                            <h6 className='font-bold'>ID: {data._id}</h6>
                                            <h6>Ngày đặt: {new Date(data.createdAt).toLocaleString('vi-VN', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })}</h6>
                                        </div>
                                        <div className='flex gap-2'>
                                            <h6 className='font-bold'>Trạng thái đơn hàng:</h6>
                                            {
                                                data.state === false
                                                    ?
                                                    <h6 className='text-yellow-500 flex'>Chưa xác nhận <TiTickOutline /></h6>
                                                    :
                                                    <h6 className='text-green-500 flex'>Đã xác nhận <TiTickOutline /></h6>
                                            }

                                        </div>
                                    </div>
                                    <hr />
                                    <div>
                                        <h6>Địa chỉ giao: {data.address}</h6>
                                        <h6>Điện thoại: {data.phone}</h6>
                                        <h6>Ghi chú: {data.note}</h6>
                                        <h6>Tổng tiền: {formatNumberWithCommas(data.total)} VND</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Histories