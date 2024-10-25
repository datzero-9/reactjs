import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../../Helper/api'

const Register = () => {

  //xử lí đăng ký tài khoản
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const navigate = useNavigate()
  const handleRegister = (e) => {
    e.preventDefault();
    const register = {
      name: name,
      username: username,
      password: password
    }
    if (password === passwordAgain) {
      try {
        axios.post(`${api}/register`, register)
          .then((res) => {
            console.log(res.data.status)
            if (res.data.status) {
              alert('Tạo tài khoản thành công')
              navigate('/')
            } else {
              alert('Tài khoản đã tồn tại trên hệ thống')
            }
          })
      } catch (error) {

      }
    } else {
      alert('Xác thực mật khẩu sai')
    }
  }
  return (

    <div className='border p-3 bg-[rgba(255,255,255,0.8)] w-[250px] flex flex-col items-center rounded-md'>
      <h6 className='font-bold text-[22px]'>Đăng ký</h6>
      {/* tài khoản  */}
      <form onSubmit={handleRegister} className='w-full'>
        <div className='my-3 text-[12px] w-full'>
          <h6 className='font-bold'>Tên người dùng:</h6>
          <input
            required
            type="text"
            placeholder='Tên người dùng'
            className='outline-none p-1 border rounded-md bg-[rgba(255,255,255,0.5)]  w-full'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='my-3 text-[12px] w-full'>
          <h6 className='font-bold'>Tài khoản:</h6>
          <input
            required
            type="text"
            placeholder='Tài khoản'
            className='outline-none p-1 border rounded-md bg-[rgba(255,255,255,0.5)]  w-full'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='my-3 text-[12px] w-full'>
          <h6 className='font-bold'>Mật khẩu:</h6>
          <input
            required
            type="password"
            placeholder='Mật khẩu'
            className='outline-none p-1 border rounded-md bg-[rgba(255,255,255,0.5)]  w-full'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='my-3 text-[12px] w-full'>
          <h6 className='font-bold'>Nhập lại mật khẩu:</h6>
          <input
            required
            type="password"
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
          <button type="submit" className='font-semibold p-2 bg-green-400 hover:bg-green-500 rounded-md'>Đăng ký</button>
        </div>
      </form>

    </div>



  )
}

export default Register