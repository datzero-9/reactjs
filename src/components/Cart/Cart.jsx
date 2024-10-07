import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { LiaFacebookMessenger } from "react-icons/lia";
// import { AiFillContainer } from "react-icons/ai";
// import { GrFormNext } from "react-icons/gr";
import { Outlet, Link } from "react-router-dom";
import ItemCart from '../ItemCart/ItemCart';

const Cart = () => {
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
        <ItemCart />

      </div>
      
    </div>
  )
}

export default Cart;