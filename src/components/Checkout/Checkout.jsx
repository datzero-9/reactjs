import React from 'react'
import ItemCart from '../ItemCart/ItemCart'
import Items from '../Items/Items'

const Checkout = () => {
    const Itemcart = [
        { name: 'Điện thoại ip x', price: 200000, quantity: 1, img: 'https://onewaymobile.vn/images/products/2023/06/14/large/14-1-5_1662619052_1686739057.webp' },
        { name: 'Laptop 3x d', price: 3278463, quantity: 1, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_d_i_5__2.png' },
        { name: 'Laptop 3x d', price: 3278463, quantity: 1, img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_d_i_5__2.png' },
    ]
    const items = Itemcart.length;
    return (
        <div className='p-3'>

            <h3 className='text-23 font-bold text-center '>Thông tin đặt hàng</h3>
            <div className='border border-gray-300 rounded-xl p-5'>
                <div className='p-2'>
                    <h5 className='text-17 font-semibold pb-2'>Địa chỉ giao hàng:</h5>
                    <input type="text" placeholder='Nhập thông tin địa chỉ' className=' p-1 border border-gray-400 rouned-xl w-full' />
                </div>

                <div className='p-2'>
                    <h5 className='text-17 font-semibold pb-2'>Số điện thoại:</h5>
                    <input type="text" placeholder='Nhập thông tin số điện thoại' className=' p-1 border border-gray-400 rouned-xl w-full' />
                </div>

                <div className='p-2'>
                    <h5 className='text-17 font-semibold pb-2'>Sản phẩm sẽ mua:</h5>
                    {
                        Itemcart.map((data) => {
                            return <ItemCart data={data} />
                        })
                    }
                </div>
                <div className='flex justify-end p-2' onClick={()=>alert('Mua hàng thành công')}>
                    {
                        items < 1 ? <div>Không có sản phẩm</div> : <button className='rounded-md p-2 text-17 font-semibold bg-red-500 hover:bg-red-400 text-white'>Xác nhận</button>
                    }
                </div>
            </div>
            <div className='pb-[75px]'></div>

        </div>
    )
}

export default Checkout