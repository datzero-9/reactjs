import React, { useEffect, useRef, useState } from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { CiShop } from "react-icons/ci";
import { MdNotificationsActive } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { GiCartwheel } from "react-icons/gi";
import { PiShoppingCartThin } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { MdNavigateNext } from "react-icons/md";
import TextLimited from '../../../Helper/sliceText';
import api from '../../../Helper/api';
import { TbCategory } from "react-icons/tb";
import { IoCall } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import ClipLoader from "react-spinners/ClipLoader";
import { MdCancel } from "react-icons/md";
import Footer from '../Footer/Footer';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';


const NavBar = () => {

    //lấy thông tin từ local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const [inputValue, setInputValue] = useState('');
    const [item, setItem] = useState([])
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const items = item.length;
    useEffect(() => {
        getListCategory()
        getItemSearch()

    }, [inputValue])
    // lấy ra sản phẩm timf kiếm bằng keyword
    const getItemSearch = () => {
        axios.post(`${api}/search`, { text: inputValue })
            .then((response) => {
                setItem(response.data)
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })
    }

    //chọn sản phẩm sau khi tìm kiếm 
    const [loading, setLoading] = useState(false)
    const handleSearch = (id) => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setInputValue('')
            navigate(`/user/detail?id=${id}`)
        }, 3000)
    }
    // hiển thị danh mục
    const [category, setCategory] = useState(false)
    const handleCategory = () => {
        setCategory(!category)
        console.log(category)
    }

    // lấy ra list danh mục ( category)
    const [listCategory, setListCategory] = useState([])
    const getListCategory = () => {

        axios.get(`${api}/category`)
            .then((res) => {
                setListCategory(res.data)
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })
    }
    // đăng xuất tài khoản 
    const navigate = useNavigate()
    const logout = () => {

        navigate('/user/info', { state: user });
    }

    // lấy danh mục sản phẩm được click 
    const getItemCate = (name) => {
        try {
            setLoading(true)
            axios.get(`${api}/listProductCategory/${name}`)
                .then((res) => {
                    setTimeout(() => {
                        setCategory(!category);
                        setLoading(false)
                        navigate('/user/category', { state: { listProduct: res.data, name } });
                    }, 2000)
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <ScrollToTopButton />
            {
                loading &&
                <div className="flex justify-center items-center w-[100vw] h-[100vh] fixed bg-gray-50 bg-opacity-50 z-20 left-0 top-0 bottom-0 right-0">
                    <ClipLoader

                        color={'#DB142C'}
                        loading={loading}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader loiloi"
                    />
                </div>
            }

            <div class="  bg-red-600 flex flex-col items-center fixed top-0 right-0 left-0 z-10">
                <div className='flex  bg-red-600 p-2 gap-3 text-white  container'>
                    {/* logo  */}
                    <div className=' basis-1/12 md:basis-3/12 xl:basis-2/12 '>
                        <Link to="home">
                            <div className='flex justify-center items-center gap-1 h-full'>
                                <h6 className='text-[20px] font-bold hidden md:block'>LSHOP-TECH </h6>
                                <h6 className=''><GiCartwheel size={30} /></h6>
                            </div>
                        </Link>
                    </div>
                    {/* danh mục  */}
                    <div className='bg-red-500 hover:bg-red-400 rounded-md hidden lg:block lg:basis-1/12 cursor-pointer relative'>
                        <div className='h-full flex-col justify-center items-center flex ' onClick={handleCategory}>
                            <h6 className='xl:text-[20px] text-[15px]'><TbCategory /></h6>
                            <h6 className='text-[10px] '>Danh mục</h6>
                        </div>
                        {
                            category &&
                            <div>
                                {/* Danh mục xuất hiện */}
                                <div className='absolute z-30 top-[40px] right-[0px] bg-gray-200 w-[250px] text-black p-2 rounded-md'>
                                    {
                                        listCategory.map((data, index) => (
                                            <div key={index} onClick={() => { getItemCate(data.name) }} className='flex justify-between items-center bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 m-1 rounded-md'>
                                                <h1 className='font-semibold text-[14px]'>{data.name}</h1>
                                                <MdNavigateNext size={20} />
                                            </div>
                                        ))
                                    }
                                </div>

                                {/* Nền mờ */}
                                <div onClick={handleCategory} className="w-[100vw] h-[100vh] fixed bg-gray-50 bg-opacity-50 z-20 left-0 top-0 bottom-0 right-0"></div>
                            </div>
                        }
                    </div>

                    {/* Tìm kiếm sản phảma  */}
                    <div className='flex justify-center items-center basis-7/12 md:basis-6/12 lg:basis-5/12  relative text-black'>
                        <FaSearch className='absolute  left-1 text-gray-400' size={20} />
                        {inputValue.length > 0 ? <MdCancel className='absolute  right-1 text-gray-400 cursor-pointer' size={20} onClick={() => { setInputValue('') }} /> : ''}
                        <input value={inputValue} onChange={handleInputChange} style={{ outline: 'none' }} className='h-4/5 w-full rounded-md pl-7' type="text" placeholder='Bạn cần tìm gì ?' />
                        {
                            items < 1 ? '' :
                                (<div className=' p-1 absolute bg-red-400 top-11 left-0 z-10 cursor-pointer w-[300px] sm:w-[350px] rounded-xl'>
                                    {
                                        item.slice(0, 5).map((data, index) => {
                                            return (
                                                <div key={index} className='flex gap-2 m-1 bg-gray-200  hover:bg-gray-300 text-[12px]' onClick={() => { handleSearch(data._id) }}>
                                                    <div className='w-[100px] flex justify-center items-center'>
                                                        <img src={data.image} alt="" className='w-[50px] h-[50px]' />
                                                    </div>
                                                    <TextLimited text={data.name} max={60} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>)
                        }

                    </div>
                    {/* Liên hệ mua hàng  */}
                    <div className='bg-red-500 hover:bg-red-400 rounded-md hidden lg:block lg:basis-1/12  cursor-pointer '>
                        <div className=' h-full flex-col justify-center items-center flex'>
                            <h6 className='xl:text-[20px] text-[15px]'><IoCall /></h6>
                            <h6 className='text-[10px]  '>0356.031.160 </h6>
                        </div>
                    </div>
                    {/* tra cứu thông tin đơn hàng  */}
                    <div className='hidden bg-red-500 hover:bg-red-400 rounded-md md:block basis-1/12 cursor-pointer '>
                        <Link to="histories">
                            <div className='flex flex-col justify-center items-center h-full'>
                                <h6 className='xl:text-[20px] text-[15px]'><CiDeliveryTruck /></h6>
                                <h6 className='text-[10px] '>Đơn hàng </h6>
                            </div>
                        </Link>
                    </div>

                    {/* Giỏ hàng  */}
                    <div className='bg-red-500 hover:bg-red-400 p-1 rounded-md basis-2/12 md:basis-1/12'>

                        <Link to="cart">
                            <div className='flex flex-col justify-center items-center h-full'>
                                <h6 className='xl:text-[20px] text-[15px] relative'><PiShoppingCartThin />
                                </h6>
                                <h6 className='text-[10px] '>Giỏ hàng </h6>
                            </div>
                        </Link>
                    </div>

                    {/* Tài khoản  */}
                    <div className='bg-red-500  hover:bg-red-400  rounded-md p-1 basis-2/12 md:basis-1/12 cursor-pointer' onClick={logout}>
                        <div className='flex flex-col justify-center items-center h-full'>
                            <h6 className='xl:text-[20px] text-[15px]'><FaUserCircle /></h6>
                            <h6 className='text-[10px]'>{user.name}</h6>
                        </div>
                    </div>
                </div>


            </div>

            {/* Navbar khi ở màn hình mobile  */}
            <ul className='md:hidden  rounded-t-lg flex flex-row gap-1 text-center  bg-gray-200 fixed bottom-0 w-full p-2 z-10 text-[10px]'>
                <li className='basis-1/5 flex flex-col items-center py-2' >

                    <Link to="home">
                        <IoHomeOutline size={25} />
                    </Link>
                    <p className=' font-bold'>Trang chủ</p>

                </li>
                <li className='basis-1/5 flex flex-col items-center py-2'>
                    <Link to="categorymobile" state={{ listCategory }}>
                        <BiSolidCategoryAlt size={25} />
                    </Link>
                    <p className=' font-bold'>Danh mục</p>
                </li>
                <li className='basis-1/5 flex flex-col items-center py-2'>

                    <Link to="shop">
                        <CiShop size={25} />
                    </Link>
                    <p className=' font-bold'>Cửa hàng</p>
                </li>
                <li className='basis-1/5 flex flex-col items-center py-2'>

                    <Link to="histories">
                        <CiDeliveryTruck size={25} />
                    </Link>
                    <p className=' font-bold'>Đơn hàng</p>
                </li>
                <li className='basis-1/5 flex flex-col items-center py-2'>

                    <Link to="notice">
                        <MdNotificationsActive size={25} />
                    </Link>
                    <p className=' font-bold'>Thông báo</p>
                </li>

            </ul>

            {/* <div className="overflow-y-auto pb-[80px] md:pb-0  overflow-x-hidden" style={{ height: 'calc(100vh - 50px)' }}> */}
            <div className='mt-[60px]'>
                <Outlet context={{ category }} />
                <Footer />

            </div>


        </>


    );
};

export default NavBar;