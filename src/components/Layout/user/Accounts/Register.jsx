import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  // lất thông tin người dùng
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')

  return (

    <div className='border p-3 bg-[rgba(255,255,255,0.8)] w-[250px] flex flex-col items-center rounded-md'>
      <h6 className='font-bold text-[22px]'>Đăng ký</h6>
      {/* tài khoản  */}
      <form action="" className='w-full'>
        <div className='my-3 text-[12px] w-full'>
          <h6 className='font-bold'>Tài khoản:</h6>
          <input
            type="text"
            placeholder='Tài khoản'
            className='outline-none p-1 border rounded-md bg-[rgba(255,255,255,0.5)]  w-full'
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className='my-3 text-[12px] w-full'>
          <h6 className='font-bold'>Mật khẩu:</h6>
          <input
            type="text"
            placeholder='Mật khẩu'
            className='outline-none p-1 border rounded-md bg-[rgba(255,255,255,0.5)]  w-full'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='my-3 text-[12px] w-full'>
          <h6 className='font-bold'>Nhập lại mật khẩu:</h6>
          <input
            type="text"
            placeholder='Nhập lại mật khẩu'
            className='outline-none p-1 border rounded-md bg-[rgba(255,255,255,0.5)]  w-full'
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
        </div>

        <div className='my-3 flex justify-end text-[12px] gap-2'>
          <Link to="/account/login">
            <button className='font-semibold p-2 bg-yellow-300 hover:bg-yellow-400 rounded-md'>Đăng nhập</button>
          </Link>
          <button className='font-semibold p-2 bg-green-400 hover:bg-green-500 rounded-md'>Đăng ký</button>
        </div>
      </form>
      
    </div>



  )
}

export default Register