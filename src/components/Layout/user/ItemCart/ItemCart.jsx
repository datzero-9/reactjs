import React, { useState } from 'react'
import { CiShop } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import formatPrice from '../../../Helper/formatPrice'

const ItemCart = (props) => {
  const { data } = props;

  const deleteCart = () => {
    const confirmed = window.confirm('Bạn muốn xóa sản phẩm này?');
    console.log(confirmed)
}

  return (
    <div className=''>
      <div className='p-1'>
        <div className='border border-gray-400 p-2 m-1 rounded-xl'>
          <div className='flex items-center justify-between p-1 border-b border-gray-300'>
            <div className='flex items-center'>
              <CiShop size={19} />
              <p className='font-bold pl-2'>Technology Shop</p>
            </div>
            <div>
              <a href=""> <AiTwotoneDelete size={22} className='text-red-600 hover:text-red-300' onClick={deleteCart} /></a>
            </div>
          </div>
          <div className='flex items-center p-1'>
            <img src={data.img} alt="" className='w-[60px] h-[60px] border border-gray-400 rounded-md p-1' />
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