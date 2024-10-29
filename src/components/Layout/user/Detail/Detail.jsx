import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import formatPrice from '../../../Helper/formatPrice'
import { LiaCartPlusSolid } from "react-icons/lia";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { Link } from "react-router-dom";
import api from '../../../Helper/api'
import BeatLoader from "react-spinners/BeatLoader";

const Detail = () => {
  // lấy thông tin đăng nhập từ loclstorage 
  const user = JSON.parse(localStorage.getItem('user'));

  // lấy cái id từ params 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  // thay đôi trạng thái 

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
  const [select, setSelect] = useState(null)
  const handleSelect = (id) => {
    setSelect(id)
  }
  //sử lý lựa chọn màu
  const [selectColor, setSelectColor] = useState(null)
  const handleSelectColor = (id) => {
    setSelectColor(id)
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

      })
      .catch((error) => {
        console.log('lỗi', error);
      });
  };
  // thêm sản phẩm vào giỏ hàng
  const addCart = () => {
    const cart = {
      idUser: user.id,
      idProduct: productDetail._id,
      name: productDetail.name,
      image: productDetail.image,
      quantity: quantity,
      price: productDetail.price,
      salePrice: productDetail.price,
    }
    try {
      axios.post(`${api}/addCart`, cart)
        .then((res) => {
          if (res.data.status) {
            alert("Sản phẩm đã được thêm vào giỏ hàng")
            return;
          }
          else {
            alert("Sản phẩm đã Có trong giỏ hàng");
          }

        })
    } catch (error) {
      console.log("lỗi:" + error)
    }
  }
  //mua ngay sản phẩm
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const buyProduct = () => {
    setLoading(true)
    const cart = {
      idUser: user.id,
      idProduct: productDetail._id,
      name: productDetail.name,
      image: productDetail.image,
      quantity: quantity,
      price: productDetail.price,
      salePrice: productDetail.price,
    }
    try {
      axios.post(`${api}/addCart`, cart)
        .then((res) => {
          setTimeout(() => {
            setLoading(false)
            navigate('/user/cart')
          },3000)
        })
    } catch (error) {
      console.log("lỗi:" + error)
    }
  }
  return (
    <div href='' className='border border-gray-200  h-auto rounded relative cursor-pointer'>
      {
        loading &&
        <div className="flex justify-center items-center w-[100vw] h-[100vh] fixed bg-gray-50 bg-opacity-50 z-20 left-0 top-0 bottom-0 right-0">
          <BeatLoader
            color={'#DB142C'}
            loading={loading}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      }

      <div className='p-2 lg:flex gap-4'>
        {/* list ảnh của sản phẩm  */}
        <div className='lg:w-[50%] lg:p-2  '>
          <div className='p-4 flex justify-center md:bg-gray-100 rounded-md'>
            <img src={productDetail.image} alt="" className='w-full rounded-lg md:w-[60%]  lg:w-full' />
          </div>
          <div className='p-2 flex justify-normal '>
            {
              data.map((data, index) => {
                return <img key={index} src={productDetail.image} alt="" className='w-[80px]  mr-3 rounded-md lg:w-[120px] border' />
              })
            }


          </div>
        </div>

        {/* Thông tin của sản phẩm  */}
        <div className='lg:w-[50%] lg:p-2 '>
          <h3 className='font-semibold pb-3 md:text-[18px] '>{productDetail.name}</h3>

          <div className='flex items-center pb-3 text-[12px] md:text-[14px] lg:text-[18px]'>
            <FaStar className=' mr-1 text-yellow-500' />
            <FaStar className=' mr-1 text-yellow-500' />
            <FaStar className=' mr-1 text-yellow-500' />
            <FaStar className=' mr-1 text-yellow-500' />
            <FaStar className=' mr-1 text-yellow-500' />
            <p className=''>20 đánh giá</p>
          </div>

          {/* giá sản phẩm  */}
          <div className='pb-3 flex items-center'>
            <h3 className='text-red-600 font-bold mr-2'>{formatPrice(productDetail.price)}đ</h3>
            <h3 className='text-gray-400 font-medium mr-2 text-13'><del>{formatPrice(productDetail.price)}đ</del></h3>
          </div>

          {/* số lượng sản phẩm ? */}
          <div className='flex  items-center my-2'>
            <CiCircleMinus size={25} onClick={handleMinus} />
            <input type="" value={quantity} className='text-center text-19 w-[50px] px-3' />
            <CiCirclePlus size={25} onClick={handlePlus} />
          </div>
          {/* lựa chọn phiên bản */}
          <div className='my-2'>
            <h1 className='font-bold mb-1'>Lựa chọn phiên bản</h1>
            <div className='pb-3 gap-3 grid grid-cols-3 md:grid-cols-5 xl:grid-cols-6'>

              {
                data.map((data) => {
                  return <div onClick={() => handleSelect(data.id)} className={`text-center p-2 border border-gray-400 rounded-xl hover:bg-red-200 ${select === data.id ? 'border-red-600 bg-red-200' : ''}`}>
                    <p className='font-medium text-13'>5G 256GB - {data.id}</p>
                    <p><h3 className='text-gray-500 font-medium mr-2 text-13'>{formatPrice(productDetail.price)}đ</h3></p>

                  </div>
                })
              }

            </div>

          </div>


          {/* lựa chon màu  */}
          <div className='my-2'>
            <h1 className='font-bold mb-1'>Lựa chọn Màu</h1>
            <div className='pb-3 gap-3 grid grid-cols-3 md:grid-cols-5  xl:grid-cols-6'>

              {
                data.map((data) => {
                  return <div onClick={() => handleSelectColor(data.id)} className={`text-center p-2 border border-gray-400 rounded-xl hover:bg-red-200 ${selectColor === data.id ? 'border-red-600 bg-red-200' : ''}`}>
                    <p className='font-medium text-13'>{data.color}</p>
                  </div>
                })
              }

            </div>

          </div>
          {/* mua hàng, thêm vào giỏ hàng */}

          <div className='pb-3 flex  gap-3'>
            <div onClick={buyProduct} className='text-center text-white bg-red-600 border border-gray-400 w-[75%] md:w-[50%] lg:w-[60%]  p-2 rounded-xl hover:bg-red-500 cursor-pointer'>
              <h3 className='text-[18px] font-bold'>Mua ngay</h3>
              <h3 className='text-[11px]'>(Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)</h3>
            </div>
            <div onClick={() => addCart()} className=' text-red-600 w-[25%] md:w-[20%] border border-red-600  flex flex-col justify-center items-center p-2 rounded-xl hover:bg-gray-200'>
              <LiaCartPlusSolid className='text-[30px]' />
              <p className='text-[10px]'>Thêm vào giỏ</p>
            </div>
          </div>
        </div>
      </div>
      <hr className='m-2' />
      <div className='p-2'>
        {/* thông số  của sản phẩm  */}
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

      </div>
      <hr className='m-2' />
    </div>

  );
}
export default Detail