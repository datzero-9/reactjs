import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { CiShop } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import formatPrice from '../../../Helper/formatPrice'
import api from '../../../Helper/api';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";
import { FaAngleDoubleDown } from "react-icons/fa";
import { FaAngleDoubleUp } from "react-icons/fa";
const Checkout = () => {
    // dữ liệu được lấy từ component Cart
    const location = useLocation();
    const { listCart, total } = location.state || {};


    //lấy thông tin từ local storage
    const user = JSON.parse(localStorage.getItem('user'));

    // Lâý thông tin khách hàng từ form để đặt hàng
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState('bank');
    const handleChange = (event) => {
        setPaymentMethod(event.target.value);
    };
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState()
    const [note, setNote] = useState('Không có ghi chú')
    // xóa hết tất cả sản phẩm trong giỏ hàng saui khi đătj hàng 
    const deleteAllCart = () => {
        try {
            axios.delete(`${api}/deleteAllCart/${user.id}`)
                .then((res) => {

                })
        } catch (error) {
            console.log('có lỗi xảy ra, vui lòng kiểm tra lại')
        }
    }

    //Hiển thị list sản phẩm sẽ mua
    const items = listCart.length;

    const [allCheckout, setAllCheckout] = useState(2)
    const [icon, setIcon] = useState(true)
    const handleDisplay = () => {
        setIcon(!icon)
        if (items == allCheckout) {
            setAllCheckout(2)
        } else {
            setAllCheckout(items)
        }
    }
    //Thao tác thanh toán online hoặc nhận hàng mới thanh toán
    const handleBuyProduct = (e) => {

       
        e.preventDefault();
        if (phone < 0) {
            alert('sai định dạng số điện thoại');
            return;
        }
        if (phone.length < 10) {
            alert('Số điện thoại này không tồn tại');
            return;
        }
        setLoading(true)
        const checkout = {
            idUser: user.id,
            address: address,
            phone: phone,
            note: note,
            payment: paymentMethod,
            listCart: listCart,
            total: total,
            state: false
        }

        try {

            if (checkout.payment === 'cod') {
                // Thanh tóan khi nhận hàng
                axios.post(`${api}/checkout`, checkout)
                    .then((res) => {
                        setTimeout(() => {
                            setLoading(false)
                            alert('Đặt hàng thành công, theo dõi sdt để nhận được thông báo mới nhất')
                            deleteAllCart();
                            navigate('/user/histories')
                        }, 3000)
                    })

            } else {
                // Thanh toán online
                axios.post(`${api}/payment`, checkout)
                    .then((res) => {
                        setTimeout(() => {
                            setLoading(false)
                            alert('Chuyển đến trang thanh toán ');
                            window.location.href = res.data.order_url;
                        }, 3000)
                    })
            }

        } catch (error) {
            console.log("lỗi:" + error)
        }
    }
    return (
        <div className='p-3 flex justify-center'>
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

            <div className='container'>
                <h3 className='text-23 font-bold text-center '>Thông tin đặt hàng</h3>
                <div className='border border-gray-300 rounded-xl p-5'>
                    <form onSubmit={(e) => { handleBuyProduct(e) }}>
                        <div className='md:flex '>
                            {/* form nhập thông tin  */}
                            <div className='md:w-[50%]'>

                                <div className='p-2'>
                                    <h5 className='text-17 font-semibold pb-2'>Địa chỉ giao hàng:</h5>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => { setAddress(e.target.value) }}
                                        placeholder='Nhập thông tin địa chỉ'
                                        className=' p-1 border border-gray-400 rouned-xl w-full'
                                        required
                                    />
                                </div>

                                <div className='p-2'>
                                    <h5 className='text-17 font-semibold pb-2'>Số điện thoại:</h5>
                                    <input
                                        required
                                        value={phone}
                                        onChange={(e) => { setPhone(e.target.value) }}
                                        type="number"
                                        placeholder='Nhập thông tin số điện thoại'
                                        className=' p-1 border border-gray-400 rouned-xl w-full'
                                    />
                                </div>

                                <div className='p-2'>
                                    <h5 className='text-17 font-semibold pb-2'>Ghi chú:</h5>
                                    <textarea

                                        type="text"
                                        placeholder='Ghi chú'
                                        value={note}
                                        onChange={(e) => { setNote(e.target.value) }}
                                        className=' p-1 border border-gray-400 rouned-xl w-full' >
                                    </textarea>
                                </div>
                                <div className='gap-2 flex '>
                                    <input
                                        type="radio"
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={handleChange}
                                        required
                                    />
                                    <h6>Thanh toán khi nhận hàng</h6>
                                </div>
                                <div className='gap-2 flex'>
                                    <input
                                        type="radio"
                                        value="bank"
                                        checked={paymentMethod === 'bank'}
                                        onChange={handleChange}
                                        required
                                    />
                                    <h6>Chuyển khoản ngân hàng, ví điện tử</h6>
                                </div>
                                <div className='flex justify-end p-2'>
                                    {
                                        items < 1 ? <div>Không có sản phẩm</div> : <button type='submit' className='rounded-md p-2 text-15 font-semibold bg-red-500 hover:bg-red-400 text-white'>{formatPrice(total)} đ - Xác nhận</button>
                                    }
                                </div>
                            </div>
                            {/* mua sản phẩm  */}

                            {/* list sản phẩm sẽ mua  */}
                            <div className=" md:w-[50%] "  >
                                <h5 className='text-17 font-semibold p-2 '>Sản phẩm sẽ mua:</h5>
                                <div className='flex flex-col items-center overflow-y-auto ' style={{ height: `calc(100vh - 0)` }}>
                                    {
                                        listCart.slice(0, allCheckout).map((data, index) => {
                                            return (
                                                <div key={index} className='w-full '>

                                                    <div className='border border-gray-400 p-2 m-1 rounded-xl'>
                                                        <div className='flex items-center justify-between p-1 border-b border-gray-300'>
                                                            <div className='flex items-center gap-2'>
                                                                <CiShop size={19} className='text-red-500' />
                                                                <p className='font-bold text-red-500'> LSHOP-TECH  </p>
                                                            </div>
                                                        </div>
                                                        <div className='flex  p-1'>
                                                            <img src={data.image} alt="" className=' h-[60px] border border-gray-400 rounded-md p-1' />
                                                            <div className='pl-3'>
                                                                <h3 className='text-[12px] font-medium'>{data.name}</h3>
                                                                <div className='flex gap-2'>
                                                                    <h3 className='text-red-600 text-[12px]'>{formatPrice(data.realPrice)} đ</h3>
                                                                    <h3 className='text-[12px]'>x {data.quantity}   </h3>
                                                                    <h3 className='text-[12px] text-red-600 '>= {formatPrice(data.realPrice * data.quantity)} đ</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        items > 2
                                            ?
                                            <div className='w-full flex justify-center'>
                                                {
                                                    icon ?
                                                        <h6 onClick={handleDisplay} className='border p-1 px-3 hover:bg-yellow-200'><FaAngleDoubleDown /></h6>
                                                        :
                                                        <h6 onClick={handleDisplay} className='border p-1 px-3 hover:bg-yellow-200'><FaAngleDoubleUp /></h6>

                                                }
                                            </div>
                                            : ''

                                    }
                                </div>
                            </div>
                        </div>

                    </form>

                </div>
            </div>

        </div>
    )
}

export default Checkout