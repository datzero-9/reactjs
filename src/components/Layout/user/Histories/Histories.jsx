import axios from 'axios';
import React, { useEffect, useState } from 'react'
import api from '../../../Helper/api';

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
    return (
        <div className='p-2'>
            <div className='border border-black rounded-md p-2'>
                <h1 className='font-bold'>Lịch sử đơn hàng</h1>
                {
                    listOrder.map((data, index) => {
                        return (
                            <div key={index} onClick={() => { alert("Adminitrator đang hoàn thiện vui lòng trải nghiệm sau") }}>
                                <div className='border border-gray-400 m-2 p-2 rounded-md cursor-pointer hover:bg-gray-200 text-13'>
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
                                    <hr />
                                    <h6>Địa chỉ giao: {data.address}</h6>
                                    <h6>Điện thoại: {data.phone}</h6>
                                    <h6>Ghi chú: {data.note}</h6>
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