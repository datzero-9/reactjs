import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { LiaFacebookMessenger } from "react-icons/lia";
import { AiFillContainer } from "react-icons/ai";
import { GrFormNext } from "react-icons/gr";
import { CiShoppingBasket } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { Outlet, Link } from "react-router-dom";
import ItemCart from '../ItemCart/ItemCart';
import formatPrice from '../../../Helper/formatPrice'

// Itemcart.forEach(item => {
//   total += item.price;
// });
const Cart = () => {

  const Itemcart = [
    { name: 'Điện thoại ip x', price: 200000, quantity: 1, img: 'https://onewaymobile.vn/images/products/2023/06/14/large/14-1-5_1662619052_1686739057.webp' },
    { name: 'Laptop 3x d', price: 3278463, quantity: 1, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_d_i_5__2.png' },
    { name: 'Laptop 3x d', price: 3278463, quantity: 1, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_d_i_5__2.png' },
  ]

  const total = Itemcart.reduce((acc, item) => acc + item.price, 0);
  const numberOfItems = Itemcart.length;

  const [handle, setHandle] = useState(false)
  const handleVoucher = () => {
    setHandle(!handle)
  }

  return (
    <div>
      {/* trờ lại trang home  */}
      <div className='flex bg-gray-200 p-2 justify-between'>
        <div className='flex  items-center'>
          <Link to="/">
            <IoIosArrowRoundBack className='text-red-500 text-[35px]' />
          </Link>


          <p className=' pl-3 font-medium text-[19px]'>Giỏ hàng (34)</p>
        </div>
        <div className='flex items-center'>
          <LiaFacebookMessenger size={30} className='text-red-500' />
        </div>
      </div>
      {/* items cart  */}
      <div>
        {
          Itemcart.map((data)=>{
           return <ItemCart data={data}/>
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
              <Link to="home">
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
                      <MdCancel size={25} onClick={handleVoucher} className='cursor-pointer' />
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
                <Link to="/user/checkout">
                  <div className='bg-red-500 p-3 hover:bg-red-400'>
                    <p className='text-white font-semibold '>Mua hàng ({numberOfItems})</p>
                  </div>
                </Link>
              </div>
              <div className='pb-[70px]'></div>
            </div>

          )
      }

    </div>
  )
}

export default Cart;