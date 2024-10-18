import React, { useEffect, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { GiCartwheel } from "react-icons/gi";
import { PiShoppingCartThin } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';
import TextLimited from '../../../Helper/sliceText';
import api from '../../../Helper/api';

const Search = () => {

    const [inputValue, setInputValue] = useState('');
    const [item, setItem] = useState([])
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const items = item.length;
    useEffect(() => {
        getItemSearch()
    }, [inputValue])

    const getItemSearch = () => {
        // console.log(`${api}/search`)
        axios.post(`${api}/search`, { text: inputValue })
            .then((response) => {
                setItem(response.data)
                console.log(item)
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })
    }
    return (
        <div class=" flex flex-row bg-red-600 p-2 gap-3 text-white ">
            <div className=' flex justify-center items-center  basis-1/12'>
                <Link to="home">
                    <GiCartwheel size={30} />
                </Link>
            </div>
            <div className='flex justify-center items-center basis-7/12 relative text-black'>
                <FaSearch className='absolute  left-1 text-gray-400' size={20} />
                <input value={inputValue} onChange={handleInputChange} style={{ outline: 'none' }} className='h-4/5 w-full rounded-md pl-7' type="text" placeholder='Bạn cần tìm gì ?' />
                {
                    items < 1 ? '' :
                        (<div className=' p-1 absolute bg-red-400 top-11 left-0 z-10 cursor-pointer w-[350px] rounded-xl'>
                            {
                                item.map((data) => {
                                    return <>
                                        <div key={data.id} className='flex gap-2 m-1 bg-gray-200 rounded-xl'>
                                            <img src={data.image} alt="" className='w-[50px] h-[50px]' />

                                            <TextLimited text={data.name} max={40} />
                                        </div>
                                    </>
                                })
                            }
                        </div>)
                }

            </div>
            <div className='bg-red-500 hover:bg-red-400 flex justify-center items-center p-3 rounded-md basis-2/12'>

                <Link to="cart">
                    <PiShoppingCartThin size={20} />
                </Link>
            </div>
            <div className='bg-red-500  hover:bg-red-400 flex justify-center items-center p-3 rounded-md basis-2/12'>
                <Link to="cart">
                    <FaUserCircle size={20} />
                </Link>
            </div>


        </div>
    )
}

export default Search;