import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TextLimited from '../../../Helper/sliceText'
import formatNumberWithCommas from '../../../Helper/formatPrice'
const Items = (props) => {
  const { product } = props;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Link to={`/user/detail?id=${product._id}`}>
      <div href='' className='border border-gray-200  p-1 h-auto rounded bg-slate-100 relative cursor-pointer'>
        <div className='absolute top-1 bg-red-500 left-0 p-1 rounded-r-lg'>
          <p className='font-bold'>Giảm 0%</p>
        </div>
        <div className='flex justify-center items-center'>
          <img src={product.image} alt="" className=' w-[90%] h-[100px] m-2' />
        </div>
        <div className='font-medium text-13'>
          <TextLimited text={product.name.length > 45 ? product.name : product.name + ' - Sản phẩm đang được bày bán với giá tốt'} max={45} />
        </div>
        <div className=''>
          <del><p className=''> {formatNumberWithCommas(product.price)} đ</p></del>
        </div>
        <div className='mb-2'>
          <p className='text-red-400 text-13'>Giá: {formatNumberWithCommas(product.price)} đ</p>
        </div>
        <div className='bg-gray-200 rouneded m-2 p-1 text-[11px] '>
          <TextLimited text={product.description.length > 45 ? product.description : product.description + ' - Sản phẩm đang được bày bán với giá tốt'} max={45} />
        </div>

      </div>
    </Link>
  )
}

export default Items;
//rafce