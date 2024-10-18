import React from 'react'
import { Link } from 'react-router-dom';
import TextLimited from '../../../Helper/sliceText'
import formatNumberWithCommas from '../../../Helper/formatPrice'
const Items = (props) => {
  const { product } = props;
  return (
    <Link to={`detail?id=${product._id}`}>
      <div href='' className='border border-gray-200  p-1 h-auto rounded bg-slate-100 relative cursor-pointer'>
        <div className='absolute top-1 bg-red-500 left-0 p-1 rounded-r-lg'>
          <p className='font-bold'>Giảm 0%</p>
        </div>
        <div className='flex justify-center'>
          <img src={product.image} alt="" className='w-11/12 md:w-32 md:h-36' />
        </div>
        <div className='font-bold text-18'>
          <TextLimited text={product.name} max={20} />
        </div>
        <div className=''>
          <del><p className=''>Giá cũ: {formatNumberWithCommas(product.price)} đ</p></del>
        </div>
        <div className='mb-2'>
          <p className='text-red-400'>Giá: {formatNumberWithCommas(product.price)} đ</p>
        </div>
        <div className='bg-gray-200 rouneded m-2 p-1 text-12 '>
          <TextLimited text={product.description} max={20} />
        </div>

      </div>
    </Link>
  )
}

export default Items;
//rafce