import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { GiCartwheel } from "react-icons/gi";
import { PiShoppingCartThin } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { CiShop } from "react-icons/ci";
import { MdNotificationsActive } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa6";
import Search from './Search';


const NavBar = () => {
    return (
        <>
           <Search />
            <ul className=' rounded-t-lg flex flex-row gap-1 text-center  bg-gray-200 fixed bottom-0 w-full p-2 z-10'>
                <li className='basis-1/5 flex flex-col items-center py-2' >

                    <Link to="/home">
                        <IoHomeOutline size={25} />
                    </Link>
                    <p className='text-13 font-bold'>Trang chủ</p>

                </li>
                <li className='basis-1/5 flex flex-col items-center py-2'>
                    <Link to="/category">
                        <BiSolidCategoryAlt size={25} />
                    </Link>
                    <p className='text-13 font-bold'>Danh mục</p>
                </li>
                <li className='basis-1/5 flex flex-col items-center py-2'>

                    <Link to="/shop">
                        <CiShop size={25} />
                    </Link>
                    <p className='text-13 font-bold'>Cửa hàng</p>
                </li>
                <li className='basis-1/5 flex flex-col items-center py-2'>

                    <Link to="/">
                        <FaRegNewspaper size={25} />
                    </Link>
                    <p className='text-13 font-bold'>Tin tức</p>
                </li>
                <li className='basis-1/5 flex flex-col items-center py-2'>

                    <Link to="/notice">
                        <MdNotificationsActive size={25} />
                    </Link>
                    <p className='text-13 font-bold'>Thông báo</p>
                </li>

            </ul>
           
            <Outlet />

        </>


    );
};

export default NavBar;