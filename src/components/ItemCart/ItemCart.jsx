import React, { useState } from 'react'
import { CiShop } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import formatPrice from '../Helper/formatPrice'
import { AiFillContainer } from "react-icons/ai";
import { GrFormNext } from "react-icons/gr";
import { Outlet, Link } from "react-router-dom";
import { CiShoppingBasket } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
const ItemCart = () => {
  const Itemcart = [
    { name: 'Điện thoại ip x', price: 200000, quantity: 1, img: 'https://onewaymobile.vn/images/products/2023/06/14/large/14-1-5_1662619052_1686739057.webp' },
    { name: 'Laptop 3x d', price: 3278463, quantity: 1, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_d_i_5__2.png' },
  ]

  const total = Itemcart.reduce((acc, item) => acc + item.price, 0);
  const numberOfItems = Itemcart.length;

  const [handle, setHandle] = useState(false)
  const handleVoucher = () => {
    setHandle(!handle)
  }
  console.log(handle)
  // Itemcart.forEach(item => {
  //   total += item.price;
  // });
  return (
    <div className=''>

      <div className='p-3'>
        {Itemcart.map((data) => {
          return <div className='border border-gray-400 p-2 m-1 rounded-xl'>
            <div className='flex items-center justify-between p-1 border-b border-gray-300'>
              <div className='flex items-center'>
                <CiShop size={19} />
                <p className='font-bold pl-2'>Technology Shop</p>
              </div>
              <div>
                <a href=""> <AiTwotoneDelete size={22} className='text-red-600 hover:text-red-300' /></a>
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
        })
        }
      </div>
      {/* Mua hang  */}
      {
        numberOfItems < 1
          ?
          (
            <div className='p-3 justify-center '>
              <p className='text-center font-bold text-[18px]'>Giỏ hàng hiện tại chưa có sản phẩm nào </p>
              <Link to="/home">
                <div className='text-center m-3'>
                  <button href="" className=' bg-blue-500 hover:bg-yellow-300 p-3 px-5 rounded-xl'>
                    <CiShoppingBasket className='text-[20px] ' />
                  </button>
                </div>
              </Link>
            </div>
          )
          :
          (



            <div className=' bg-gray-100 p-2 '>

              <div>
                <div className=' p-2 flex justify-between border-b border-gray-300'>
                  <div className='flex items-center '>
                    <AiFillContainer size={20} className='text-red-500' />
                    <p className='pl-2'>Voucher giảm giá</p>
                  </div>
                  <div className='cursor-pointer' onClick={handleVoucher}>
                    <GrFormNext size={20} />
                  </div>                 
                </div>
                {
                    handle &&
                    <div className='bg-red-50  p-3 rounded-xl m-3'>
                      <div className='border-b border-gray-400 py-2 flex justify-end'>
                        <MdCancel size={25} onClick={handleVoucher} className='cursor-pointer'/>
                      </div>
                      <div className='flex items-center justify-center text-center'>
                        <p className='font-bold pt-3'>Hiện tại không có voucher</p>
                      </div>
                    </div>
                }
              </div>

              <div className=' p-2 flex justify-between items-center '>
                <div>
                  <div className=' '>
                    <p>Tổng thanh toán: </p>
                    <p className='font-semibold text-red-500'> đ{formatPrice(total)}</p>
                  </div>
                </div>
                <div className='bg-red-500 p-3 hover:bg-red-400'>
                  <p className='text-white font-semibold '>Mua hàng ({numberOfItems})</p>
                </div>
              </div>
            </div>

          )
      }
    </div>
  )
}

export default ItemCart