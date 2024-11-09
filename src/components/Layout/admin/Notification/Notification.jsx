import axios from 'axios';
import React, { useEffect, useState } from 'react'
import api from '../../../Helper/api';
import formatNumberWithCommas from '../../../Helper/formatPrice';
import BeatLoader from "react-spinners/BeatLoader";
const Notification = () => {
    // lấy thông tin tuwf localstorage
    const user = JSON.parse(localStorage.getItem('user'));

    // lấy ra tất cá các  order tử user
    useEffect(() => {
        getHistories()
    }, [])
    const [listOrder, setListOrder] = useState([])
    const getHistories = () => {
        try {
            axios.get(`${api}/getAllHistories`)
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

    // xác nhận đơn hàng
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState(true)
    const handleComfirmOrder = (idOrder) => {
        setLoading(true)
        setState(!state)
        setTimeout(() => {
            axios.post(`${api}/updateState`, { idOrder, state })
                .then((res) => {
                    setLoading(false)
                    alert('Đã xác nhận đon hàng')
                    getHistories()
                })
        }, 3000)
    }
    return (
        <div className='flex flex-col items-center p-2 '>
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

            <div className='border border-black rounded-md p-2 container'>

                {/* lịch sử đơn hàng  */}
                <h1 className='font-bold'>Đơn hàng</h1>
                {
                    listOrder.map((data, index) => {
                        return (
                            <div key={index} >

                                <div className='border border-gray-400 m-2 p-2 rounded-md cursor-pointer  text-13'>
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

                                    </div>
                                    <hr className='my-2' />
                                    <div className='flex justify-between'>
                                        <div>
                                            <h6>Địa chỉ giao: {data.address}</h6>
                                            <h6>Điện thoại: {data.phone}</h6>
                                            <h6>Ghi chú: {data.note}</h6>
                                            <h6>Tổng tiền: {formatNumberWithCommas(data.total)} VND</h6>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <div onClick={() => handleComfirmOrder(data._id)}>
                                                {
                                                    data.state == false
                                                        ?
                                                        <button className='bg-yellow-300 p-2 rounded-md font-bold text-13'>Chưa xác nhận</button>
                                                        :
                                                        <button className='bg-green-300 p-2 rounded-md font-bold text-13'>Đã xác nhận </button>

                                                }
                                            </div>

                                            <button
                                                onClick={() => { getOrderDetail(data._id) }}
                                                className='bg-green-300 p-2 rounded-md font-bold text-13 hover:bg-gray-200'>
                                                Xem chi tiết
                                            </button>
                                        </div>
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

export default Notification;