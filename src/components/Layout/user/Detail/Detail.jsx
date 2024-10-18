import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { IoIosArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import formatPrice from '../../../Helper/formatPrice'
import { LiaCartPlusSolid } from "react-icons/lia";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { Outlet, Link } from "react-router-dom";
import api from '../../../Helper/api'


const Detail = () => {
  // lấy cái id từ params 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  // thay đôi trạng thái 
  const [select, setSelect] = useState(null)
  const [productDetail, setProductDetail] = useState([]);
  const [quantity, setQuantity] = useState(1)
  //sử lý số lượng sản phẩm 
  const handlePlus = () => {
    setQuantity(quantity + 1)
  }
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
    else {
      alert('không thể giảm số lượng nữa')
    }
  }
  // sử lý lựa chọn phiên bản
  const handleSelect = (id) => {
    setSelect(id)
  }
  //fake data
  const data = [

    {
      id: 3,
      color: 'Đen '
    },
    {
      id: 4,
      color: 'Trắng'
    },
    {
      id: 5,
      color: 'Bạc'
    }
  ]
  useEffect(() => {
    if (id) {
      getProductDetail(id);
    }
  }, [id]);

  const getProductDetail = (id) => {
    axios.post(`${api}/detail`, { id: id })
      .then((response) => {
        setProductDetail(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log('lỗi', error);
      });
  };

  return (
    <div href='' className='border border-gray-200  h-auto rounded relative cursor-pointer'>

      <div className='p-2'>
        {/* <IoIosArrowBack className='bg-gray-200 rounded-full p-1 text-[30px] absolute top-2 left-2' /> */}
        <img src={productDetail.image} alt="" className='w-full rounded-lg' />
      </div>
      <div className='p-2 flex justify-normal '>
        <img src={productDetail.image} alt="" className='w-12 h-12 mr-1 rounded-xl' />
        <img src={productDetail.image} alt="" className='w-12 h-12 mr-1 rounded-xl' />
        <img src={productDetail.image} alt="" className='w-12 h-12 mr-1 rounded-xl' />
      </div>
      <div className='p-2'>
        <h3 className='font-semibold pb-3'>{productDetail.name}</h3>
        <div className='flex items-center pb-3'>
          <FaStar className='text-[12px] mr-1 text-yellow-500' />
          <FaStar className='text-[12px] mr-1 text-yellow-500' />
          <FaStar className='text-[12px] mr-1 text-yellow-500' />
          <FaStar className='text-[12px] mr-1 text-yellow-500' />
          <FaStar className='text-[12px] mr-1 text-yellow-500' />
          <p className='text-[12px]'>20 đánh giá</p>
        </div>

        {/* giá sản phẩm  */}
        <div className='pb-3 flex items-center'>
          <h3 className='text-red-600 font-bold mr-2'>{formatPrice(productDetail.price)}đ</h3>
          <h3 className='text-gray-400 font-medium mr-2 text-13'><del>{formatPrice(productDetail.price)}đ</del></h3>
        </div>

        {/* số lượng sản phẩm ? */}
        <div className='flex  items-center'>
          <CiCircleMinus size={25} onClick={handleMinus} />
          <input type="" value={quantity} className='text-center text-19 w-[50px] px-3' />
          <CiCirclePlus size={25} onClick={handlePlus} />
        </div>
        {/* lựa chọn phiên bản */}
        <div>
          <h1 className='font-bold mb-1'>Lựa chọn phiên bản</h1>
          <div className='pb-3 gap-3 grid grid-cols-3'>

            {
              data.map((data) => {
                return <div onClick={() => handleSelect(data.id)} className={`text-center p-2 border border-gray-400 rounded-xl hover:bg-gray-300 ${select === data.id ? 'border-red-600' : ''}`}>
                  <p className='font-medium text-15'>5G 256GB - {data.id}</p>
                  <p><h3 className='text-gray-500 font-medium mr-2 text-13'>{formatPrice(productDetail.price)}đ</h3></p>

                </div>
              })
            }

          </div>

        </div>


        {/* lựa chon màu  */}
        <div>
          <h1 className='font-bold mb-1'>Lựa chọn Màu</h1>
          <div className='pb-3 gap-3 grid grid-cols-3'>

            {
              data.map((data) => {
                return <div onClick={() => handleSelect(data.id)} className={`text-center p-2 border border-gray-400 rounded-xl hover:bg-gray-300 ${select === data.id ? 'border-red-600' : ''}`}>
                  <p className='font-medium text-15'>{data.color}</p>
                </div>
              })
            }

          </div>

        </div>
        {/* mua hàng, thêm vào giỏ hàng */}

        <div className='pb-3 flex  gap-3'>
          <div className='text-center text-white bg-red-600 border border-gray-400 w-[75%] p-2 rounded-xl hover:bg-red-500 cursor-pointer'>
            <Link to="/user/cart">
              <h3 className='text-[20px] font-bold'>Mua ngay</h3>
              <h3 className='text-[11px]'>(Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)</h3>
            </Link>
          </div>
          <div onClick={() => alert('Thêm vào giỏ hàng thành công')} className=' text-red-600 w-[25%] border border-red-600  flex flex-col justify-center items-center p-2 rounded-xl hover:bg-gray-200'>
            <LiaCartPlusSolid className='text-[30px]' />
            <p className='text-[10px]'>Thêm vào giỏ</p>
          </div>
        </div>

        {/* thông tin của sản phẩm  */}
        <div className=' '>
          <h1 className='font-bold mb-1'>Thông tin sản phẩm</h1>
          <div className=' p-3 bg-red-100 rounded-xl'>
            <div className='flex grid grid-cols-2 gap-4  pb-4 '>
              <h4 className='font-bold'>Tên sản phẩm</h4>
              <h4> IP 16 Promax 512GB phiên bản giới hạn</h4>
            </div>
            <div className='flex grid grid-cols-2 gap-4  pb-4 '>
              <h4 className='font-bold'>Dung lượng</h4>
              <h4> IP 16 Promax 512GB phiên bản giới hạn</h4>
            </div>
            <div className='flex grid grid-cols-2 gap-4  pb-4 '>
              <h4 className='font-bold'>Công nghệ</h4>
              <h4> Chip dragon 7563XTG</h4>
            </div>
          </div>

        </div>
        <div className='pb-[75px]'></div>

      </div>
    </div>
  );
}
export default Detail