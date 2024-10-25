import React, { useState } from 'react'
import { CiShop } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import formatPrice from '../../../Helper/formatPrice'
import api from '../../../Helper/api';
import axios from 'axios';

const ItemCart = (props) => {
  const { data, getListCart } = props;

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
    <div className=''>
      <div className='p-1'>
        <div className='border border-gray-400 p-2 m-1 rounded-xl'>
          <div className='flex items-center justify-between p-1 border-b border-gray-300'>
            <div className='flex items-center'>
              <CiShop size={19} />
              <p className='font-bold pl-2'>LSHOP-TECH</p>
            </div>
            <div>
              <AiTwotoneDelete size={22} className='text-red-600 hover:text-red-300 cursor-pointer'  onClick={() => deleteCart(data._id)} />
            </div>
          </div>
          <div className='flex  p-1'>
            <img src={data.image} alt="" className='w-[20%]  border border-gray-400 rounded-md p-1' />
            <div className='pl-3'>
              <h3 className='text-17 font-medium'>{data.name}</h3>
              <h3 className='text-red-600'>{formatPrice(data.price)} đ</h3>
              <h3> x {data.quantity}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemCart