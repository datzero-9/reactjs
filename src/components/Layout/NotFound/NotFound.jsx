import axios from 'axios'
import React, { useEffect, useState } from 'react'
import api from '../../Helper/api'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate()
    const [redirect, setRedirect] = useState()
    useEffect(() => {
        try {
            axios.get(`${api}/notfound`)
                .then((res) => {
                    alert('Thao tác lỗi đường dẫn không tồn tại')
                    setRedirect(res.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])
    const [countdown, setCountdown] = useState(10)
    if (countdown > 0) {
        setTimeout(() => {
            setCountdown(countdown - 1)

        }, 1000)
    } else {
        window.location.href = redirect;
    }
    return (
        <div className='p-3 bg-gray-100 h-[100vh]'>
            <div>
                <h6 className='font-medium text-[25px]'>
                    Not Found 404
                </h6>
                <div>
                    <h6 >Thao tác lỗi đường dẫn không tồn tại trên hệ thống</h6>
                    <div>
                        <p
                            className=' w-[100px] text-13 font-medium hover:text-red-500 cursor-pointer'
                            onClick={() => { navigate(-1) }}>Trở lại trang web </p>
                    </div>
                    <h6 className='text-red-500'>Chuyển hướng đến thông tin khắc phục sau  {countdown}</h6>
                    <div className='flex justify-center items-center'>
                        <img src="data:image/png;base64,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" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound