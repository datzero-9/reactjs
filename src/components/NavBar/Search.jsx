import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { GiCartwheel } from "react-icons/gi";
import { PiShoppingCartThin } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { CiShop } from "react-icons/ci";
import { MdNotificationsActive } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa6";
const Search = () => {
    return (
        <div class=" flex flex-row bg-red-600 p-2 gap-3 text-white ">
            <div className=' flex justify-center items-center  basis-1/12'>
                <GiCartwheel size={30} />
            </div>
            <div className='flex justify-center items-center basis-7/12 relative text-black'>
                <FaSearch className='absolute  left-1 text-gray-400' size={20} />
                <input style={{ outline: 'none' }} className='h-4/5 w-full rounded-md pl-7' type="text" placeholder='Bạn cần tìm gì ?' />
            </div>
            <div className='bg-red-500 hover:bg-red-400 flex justify-center items-center p-3 rounded-md basis-2/12'>
                <a href="/cart">
                    <PiShoppingCartThin size={20} />
                </a>
            </div>
            <div className='bg-red-500  hover:bg-red-400 flex justify-center items-center p-3 rounded-md basis-2/12'>
                <a href="">
                    <FaUserCircle size={20} />
                </a>
            </div>
        </div>
    )
}

export default Search