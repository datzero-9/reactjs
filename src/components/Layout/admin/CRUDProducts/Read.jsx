import React from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { PiRecycleBold } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Outlet, Link } from "react-router-dom";
const Read = () => {
    return (
        <div className='p-2 text-21'>
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
                        <tr className=''>
                            <td className='border text-center'>1</td>
                            <td className='border'>Sản phẩm A</td>
                            <td className='border'>Danh mục A</td>
                            <td className='border'>100.000đ</td>
                            <td className='border'>Hình ảnh A</td>
                            <td className='border'>Mô tả A</td>
                            <td className='border'><div className='flex justify-center gap-6'><FaEdit /> <RiDeleteBinLine /></div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Read