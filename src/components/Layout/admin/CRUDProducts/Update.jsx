
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiBoxList } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdOutlineDownloadDone } from "react-icons/md";
import api from '../../../Helper/api';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const Update = () => {


    const [imageUrl, setImageUrl] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');

    // lấy cái id từ params 
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    //lấy ra thông tin sản phẩm

    useEffect(() => {
        if (id) {
            getProduct(id)
        }

    }, [id])
    const getProduct = (id) => {
        try {
            axios.get(`${api}/getProduct/${id}`)
                .then((res) => {
                    setProductName(res.data.name)
                    setProductPrice(res.data.price)
                    setSelectedCategory(res.data.category)
                    setProductDescription(res.data.description)
                    setImageUrl(res.data.image)
                })
        } catch (error) {
            console.log("lỗi:" + error)
        }
    }
    //selected category
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        // console.log(e.target.value)
    };


    //chọn hình ảnh
    const uploadImg = (selectedImage) => {
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('upload_preset', 'nxl7uozr');
        axios.post("https://api.cloudinary.com/v1_1/dfv0n3vas/image/upload", formData)
            .then((res) => {
                const uploadedImageUrl = res.data.secure_url;
                setImageUrl(uploadedImageUrl);
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
            });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            uploadImg(selectedImage);
        }
    };
    //Lấy ra danh mục sản phẩm từ api
    const [listCategory, setListCategory] = useState([])
    useEffect(() => {
        getCategory()
    }, [])
    const getCategory = () => {
        axios.get(`${api}/category`)
            .then((res) => {
                setListCategory(res.data)
                // console.log(res.data)
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })
    }
    // lấy thông tin từ form
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();

        const productData = {
            name: productName,
            price: productPrice,
            category: selectedCategory,
            description: productDescription,
            image: imageUrl ? imageUrl : 'https://res.cloudinary.com/dfv0n3vas/image/upload/v1728919650/samples/logo.png'
        };
        axios.put(`${api}/updateProduct/${id}`, productData)
            .then((res) => {
                alert('Đã chỉnh sửa sản phẩm')
                navigate('/admin/products');
            })
            .catch((error) => {
                console.log('lỗiii', error)
            })
    }
    const goBack = () => {
        navigate(-1);  // Điều hướng trở lại trang trước đó
    };
    return (
        <div className='p-1 m-1 '>
            <div className='flex justify-end text-15 text-green-400'>
                <div onClick={goBack} className='border border-green-400 p-2 flex items-center gap-2 font-semibold rounded-md hover:bg-gray-100 cursor-pointer'>
                    <p>Danh sách sản phẩm</p><CiBoxList size={16} />
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <h1 className='font-semibold text-[16px] '>Chỉnh sửa sản phẩm</h1>
                <hr className='border border-black w-[80%]' />
            </div>
            <div className='p-3 text-15 font-medium'>
                <form onSubmit={handleSubmit}>
                    <div className='gap-5 flex'>
                        <div className='w-[50%]'>
                            {/* Tên sản phẩm  */}
                            <div className='m-2 gap-2 '>
                                <h6 className=''>Tên sản phẩm :</h6>
                                <input
                                    type="text"
                                    placeholder='Nhập tên sản phẩm...'
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className='border-2 w-full rounded-md p-1'
                                    required
                                />
                            </div>
                            {/* Giá sản phẩm  */}
                            <div className='m-2 gap-2 '>
                                <h6 className=''>Giá sản phẩm :</h6>
                                <input
                                    type="number"
                                    placeholder='Nhập giá sản phẩm...'
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    className='border-2 w-full rounded-md p-1'
                                    required
                                />
                            </div>
                            {/* Danh mục sản phẩm  */}
                            <div className='m-2 gap-2 '>
                                <h6 className=''>Danh mục sản phẩm</h6>
                                <select
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    className='border-2 w-full rounded-md p-1 cursor-pointer'
                                    required
                                >
                                    <option value={selectedCategory}>{selectedCategory}</option>
                                    {listCategory.map((category, index) => (
                                        <option key={index} value={category.name} >{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Mô tả Sản phẩm  */}
                            <div className='m-2 gap-2 font-normal'>
                                <h6 className=''>Mô tả sản phẩm:</h6>
                                
                                <CKEditor
                                    editor={ClassicEditor}

                                    data={productDescription}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setProductDescription(data);
                                    }}
                                />
                            </div>
                        </div>
                        <div className='w-[50%]'>
                            {/* Lựa Chọn hình ảnh  */}
                            <div className='m-2 gap-2'>
                                <h6 className=''>Hình ảnh sản phẩm:</h6>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className='cursor-pointer my-2'
                                    require
                                />
                                <div className='w-[40%]'>
                                    {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />}
                                </div>
                            </div>
                            {/* submit  */}
                            <div className='m-2 gap-2 '>
                                <button
                                    type='submit'
                                    className='border-2 border-green-400 text-green-400 p-2 rounded-md hover:bg-gray-200 flex items-center'>
                                    Xác nhận <MdOutlineDownloadDone size={16} />
                                </button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Update