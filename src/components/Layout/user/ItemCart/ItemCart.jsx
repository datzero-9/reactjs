import React, { useState } from 'react'
import { CiShop } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import formatPrice from '../../../Helper/formatPrice'
import api from '../../../Helper/api';
import axios from 'axios';

const ItemCart = (props) => {
  const { data, getListCart } = props;
  // customize lại ngày tháng
  const formattedDate = new Date(data.createdAt).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  // xóa sản phẩm khỏi giỏ hàng
  const deleteCart = (id) => {
    try {
      axios.delete(`${api}/deleteCart/${id}`)
        .then((res) => {
          console.log(res.data)
          alert('Đã xóa khỏi giỏ hàng')
          getListCart()
        })

    } catch (error) {

    }

  }

  return (
    <div className='w-full sm:w-[550px] md:w-[700px]  xl:w-[1024px] '>
      <div className='p-1'>
        <div className='border border-gray-400 p-2 m-1 rounded-xl'>
          <div className='flex items-center justify-between p-1 border-b border-gray-300'>
            <div className='flex items-center gap-2'>
              <CiShop size={19} className='text-red-500' />
              <p className='font-bold text-red-500'> LSHOP-TECH  </p>
              <p className='text-[12px]'> Ngày thêm: {formattedDate}</p>
            </div>
            <div>
              <AiTwotoneDelete size={22} className='text-red-600 hover:text-red-300 cursor-pointer' onClick={() => deleteCart(data._id)} />
            </div>
          </div>
          <div className='flex  p-1'>
            <img src={data.image} alt="" className=' h-[60px] border border-gray-400 rounded-md p-1' />
            <div className='pl-3'>
              <h3 className='text-[12px] font-medium'>{data.name}</h3>
              <div className='flex gap-2'>
                <h3 className='text-red-600 text-[12px]'>{formatPrice(data.price)} đ</h3>
                <h3 className='text-[12px]'>x {data.quantity}   </h3>
                <h3 className='text-[12px] text-red-600 '>= {formatPrice(data.price*data.quantity)} đ</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemCart