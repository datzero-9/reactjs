import React, { useEffect, useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { PiRecycleBold } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import api from '../../../Helper/api';
import formatPrice from '../../../Helper/formatPrice';

import './Style.css'
const Read = () => {

    const location = useLocation();
    const { item, text } = location.state || {};

    //Lấy ra danh sách sản phẩm
    const [listItems, setListItems] = useState([])
    useEffect(() => {
        getListProducts()
    }, [])
    const getListProducts = () => {
        const selec = {
            category: [],
            price: []
        }
        try {
            axios.post(`${api}`, { selec })
                .then((res) => {
                    setListItems(res.data)
                    // console.log(res.data)
                })
        } catch (error) {
            console.log('Lỗi :' + error)
        }
    }
    if (!item || !text) {
        var product = listItems;
    } else {
        var product = item;
    }
    // //delete Product

    // ẩn mô tar
    //delete danh mục
    const [confirm, setConfirm] = useState(false)
    const [idItem, setidItem] = useState('')


    const confirmDelete = (id) => {
        setidItem(id)
        setConfirm(true)
    }
    const Cancel = () => {
        setConfirm(false)
    }
    const deleteProduct = async () => {
        try {
            await axios.delete(`${api}/deleteProduct/${idItem}`)
                .then((res) => {
                    console.log(res.data)
                    getListProducts()
                    setConfirm(false)
                    alert('Xóa sản phẩm thành công');
                })

        } catch (error) {
            console.log('Lỗi', error);
        }
    }
    return (
        <div className='p-2  relative'>
            {
                confirm &&
                <div className='absolute bg-gray-50 w-full h-[90vh]  flex justify-center bg-opacity-50'>
                    <div className=' bg-gray-50 border border-black p-2 my-10 w-[300px] h-[150px] rounded-md m-4'>
                        <div className='font-bold text-17'>
                            <h1 className='text-center'>Thông báo</h1>
                        </div>
                        <hr className='border border-black' />
                        <div className='p-2 text-13 py-5'>
                            <h1 className='text-center'>Bạn có muốn xóa sản phẩm này ?</h1>
                        </div>
                        <hr className='border border-black' />

                        <div className='gap-4 p-3 flex justify-end items-center text-13'>
                            <button className='border p-2 rounded-md font-bold bg-red-500 ' onClick={Cancel}>Cancel</button>
                            <button className='border p-2 rounded-md font-bold bg-gray-200 ' onClick={deleteProduct}>Xác nhận</button>
                        </div>
                    </div>
                </div>

            }
            <div className='flex items-center justify-end gap-4 text-[14px]'>
                <Link to="/admin/create">
                    <div className='hover:bg-gray-100 cursor-pointer flex items-center border border-green-300 p-1 rounded-md gap-2 text-green-500'>Thêm <IoIosAddCircle /> </div>
                </Link>
                <div className='hover:bg-gray-100 cursor-pointer flex items-center border border-red-300 p-1 rounded-md gap-2 text-red-500'> Thùng rác <PiRecycleBold /></div>
            </div>
            <div className='my-2 text-13'>
                <table className='w-full border-collapse'>
                    <thead className='border'>
                        <tr>
                            <th className='border'>STT</th>
                            <th className='border'>Tên sp</th>
                            <th className='border'>Danh mục</th>
                            <th className='border'>Giá</th>
                            <th className='border'>Hình ảnh</th>
                            <th className='border'>Mô tả</th>
                            <th className='border'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product.map((data, index) => {
                                return (
                                    <tr className='' key={index}>
                                        <th className='border text-center w-[5%] p-1'>{index + 1}</th>
                                        <td className='border w-[20%] p-1 text-[11px]'>{data.name}</td>
                                        <td className='border text-[11px] w-[10%]  p-1 font-medium'>
                                            <h6>{data.category}</h6>
                                            <h6 className='text-red-500'>Tồn kho: {data.warehouse}</h6>
                                        </td>
                                        <td className='border text-[11px] w-[10%]  p-1 font-medium'>
                                            <h6>{formatPrice(data.price)}đ</h6>
                                            <h6>Giảm {formatPrice(data.discount)}%</h6>
                                            <h6 className='text-red-500'>Còn {formatPrice(data.realPrice)}đ</h6>
                                        </td>
                                        <td className='border p-1 w-[15%] '>
                                            <div className='flex justify-center items-center'>
                                                <img src={data.image} alt="" className='h-[100px] rounded-md ' />
                                            </div>
                                        </td>
                                        <td className="border p-2 text-[11px] w-[30%]">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        data.description.length > 300
                                                            ? `${data.description.slice(0, 300)}........`
                                                            : data.description,
                                                }}
                                            />
                                        </td>
                                        <td className='border p-1'>
                                            <div className='flex justify-center gap-6 '>
                                                <Link to={`/admin/updateProduct/?id=${data._id}`}>
                                                    <FaEdit className='text-yellow-200 cursor-pointer' />
                                                </Link>

                                                <RiDeleteBinLine className='text-red-300 cursor-pointer' onClick={() => { confirmDelete(data._id) }} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Read