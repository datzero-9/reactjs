import React, { useEffect, useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { PiRecycleBold } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from 'axios';
import api from '../../../Helper/api';
import formatPrice from '../../../Helper/formatPrice';
import ReactPaginate from 'react-paginate';
import './Style.css'
const Read = () => {
    //Lấy ra danh sách sản phẩm
    const [listItems, setListItems] = useState([])
    useEffect(() => {
        getListProducts()
    }, [])
    const getListProducts = () => {
        try {
            axios.get(`${api}`)
                .then((res) => {
                    setListItems(res.data)
                    console.log(res.data)
                })
        } catch (error) {
            console.log('Lỗi :' + error)
        }
    }
    // //delete Product
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${api}/deleteProduct/${id}`)
                .then((res) => {
                    console.log(res.data)
                    getListProducts()
                    alert('Xóa sản phẩm thành công');
                })

        } catch (error) {
            console.log('Lỗi', error);
        }
    }
    // click trang
    const handlePageClick = (event) => {
        const newOffset = (event.selected)
        console.log(
            `User requested page number ${event.selected}, which is offset`
        );

    };
    return (
        <div className='p-2 text-[16px] '>
            <div className='flex items-center justify-end gap-4'>
                <Link to="/admin/create">
                    <div className='hover:bg-gray-100 cursor-pointer flex items-center border border-green-300 p-2 rounded-md gap-2 text-green-500'>Thêm <IoIosAddCircle /> </div>
                </Link>
                <div className='hover:bg-gray-100 cursor-pointer flex items-center border border-red-300 p-2 rounded-md gap-2 text-red-500'> Thùng rác <PiRecycleBold /></div>
            </div>
            <div className='my-2'>
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
                            listItems.map((data, index) => {
                                return (
                                    <tr className='' key={index}>
                                        <th className='border text-center w-[5%] p-1'>{index + 1}</th>
                                        <td className='border w-[20%] p-1 '>{data.name}</td>
                                        <td className='border w-[10%] text-center p-1 font-medium'>{data.category}</td>
                                        <td className='border w-[10%] text-center p-1 font-medium'>{formatPrice(data.price)}đ</td>
                                        <td className='border p-1 w-[15%]'>
                                            <img src={data.image} alt="" className='w-[90%] rounded-xl text-center' />
                                        </td>
                                        <td className='border p-2 text-13 w-[30%]'>{data.description}</td>
                                        <td className='border p-1'>
                                            <div className='flex justify-center gap-6 '>
                                                <Link to={`/admin/updateProduct/?id=${data._id}`}>
                                                    <FaEdit className='text-yellow-200 cursor-pointer' />
                                                </Link>
                                                <RiDeleteBinLine className='text-red-300 cursor-pointer' onClick={() => { deleteProduct(data._id) }} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                {/* <div className="flex justify-center items-center mt-4">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={25}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        activeClassName="active"
                    />
                </div> */}
            </div>
        </div>
    )
}

export default Read