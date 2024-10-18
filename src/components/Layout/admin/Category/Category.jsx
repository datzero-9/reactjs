import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import api from '../../../Helper/api'
const Category = () => {

    //Lấy ra danh mục sản phẩm từ api
    const [listCategory, setListCategory] = useState([])
    useEffect(() => {
        getCategory()
    }, [])
    const getCategory = () => {
        axios.get(`${api}/category`)
            .then((res) => {
                setListCategory(res.data)
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })
    }
    //Thêm danh mục sản phẩm
    const [nameCategory, setNameCategory] = useState('')
    const createCategory = (event) => {
        event.preventDefault();

        axios.post(`${api}/createCategory`, { name: nameCategory })
            .then(() => {
                getCategory()
                setNameCategory('')
                setState('')
                alert('Thêm danh mục thành công')
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })

    }
    //delete danh mục
    const deleteCategory = async (id) => {
        console.log(id)
        try {
            await axios.delete(`${api}/deleteCategory/${id}`)
                .then((res) => {
                    setItemCategory('')
                    setIdItemCategory('')
                    getCategory();
                    setState('')
                    alert('Xóa sản phẩm thành công');
                })

        } catch (error) {
            console.log('Lỗi', error);
        }
    }
    //update danh mục
    const [ItemCategory, setItemCategory] = useState('')
    const [idItemCategory, setIdItemCategory] = useState('')
    const getItem = async (id) => {
        try {
            console.log(id)
            await axios.post(`${api}/getItemCategory`, { id: id })
                .then((res) => {
                    setItemCategory(res.data.name)
                    setIdItemCategory(id)
                    console.log(res.data)
                })
        } catch (error) {
            console.log('Lỗi', error);
        }

    }
    const [state, setState] = useState('')
    const updateCategory = (id = '', event) => {
        if (id != '') {
            event.preventDefault();
            try {

                axios.put(`${api}/updateCategory/${id}`, { name: ItemCategory })
                    .then((res) => {
                        alert('Thay đổi thành công')
                        setItemCategory('')
                        getCategory();
                        setState(res.data)
                    })

            } catch (error) {
                console.log('Lỗi', error);
            }
        } else {
            event.preventDefault();
            setItemCategory('')
            alert('Cần chọn danh mục để sửa')
        }
    }
    return (
        <div className='m-2'>
            <div className='flex items-center gap-2'>
                <h1 className='font-semibold text-25 '>Danh mục sản phẩm</h1>
                <hr className='border border-black w-[80%]' />
            </div>
            <div className='flex gap-4'>
                <div className='w-[50%]'>
                    <table className='w-full m-2 text-19'>
                        <thead className=''>
                            <tr>
                                <th className='border'>STT</th>
                                <th className='border'>Tên danh mục</th>
                                <th className='border'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {
                                listCategory.map((data, index) => {

                                    return (
                                        <tr className=''>
                                            <td className='border font-bold'>{index + 1}</td>
                                            <td className='border'>{data.name}</td>
                                            <td className='border'>
                                                <div className='flex justify-center gap-10 text-25'>
                                                    <FaEdit className='text-yellow-200 cursor-pointer' onClick={() => { getItem(data._id) }} />
                                                    <RiDeleteBinLine className='text-red-300 cursor-pointer' onClick={() => { deleteCategory(data._id) }} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className='w-[50%]'>
                    {/* Thêm danh mục mới  */}
                    <div>
                        <form onSubmit={createCategory}>
                            <div className='mb-4'>
                                <h6 className='text-21 font-semibold'>Tên danh mục:</h6>
                                <input
                                    value={nameCategory}
                                    onChange={(e) => setNameCategory(e.target.value)}
                                    type="text"
                                    required
                                    className='border-2 w-full p-2 text-21 rounded-md'
                                    placeholder='Nhập tên danh mục' />
                            </div>
                            <div className='my-4'>
                                <button type='submit' className='border p-2 px-4 border-green-400 text-21 text-green-400 rounded-md font-semibold hover:bg-gray-100'>Thêm</button>
                            </div>
                        </form>
                    </div>
                    <hr className='border-2 border-black' />

                    {/* Update category  */}
                    <div>
                        <form onSubmit={(event) => { updateCategory(idItemCategory, event) }}>
                            <div className='my-4'>
                                <h6 className='text-21 font-semibold'>Nhập lại Tên danh mục:</h6>
                                <input
                                    value={ItemCategory}
                                    onChange={(e) => setItemCategory(e.target.value)}
                                    type="text"
                                    required
                                    className='border-2 w-full p-2 text-21 rounded-md'
                                    placeholder='Nhập lại tên danh mục' />
                            </div>
                            <div>
                                {state !== '' ? <h6 className='font-bold text-21 text-green-400'>{state}</h6> : ''}
                            </div>
                            <div className='my-4'>

                                <button type='submit' className='border p-2 px-4 border-yellow-300 text-21 text-yellow-300 rounded-md font-semibold hover:bg-gray-100'>Xác nhận thay đổi</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category