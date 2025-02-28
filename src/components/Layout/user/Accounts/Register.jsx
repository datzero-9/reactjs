import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../../Helper/api'
import BeatLoader from "react-spinners/BeatLoader";
const Register = () => {

  //xử lí đăng ký tài khoản
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [code, setCode] = useState('')
  //điều hướng bằng navigate
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // đăng ký tài khoản
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true)
    const register = {
      name: name,
      username: email,
      password: password,
      code: code,
    }

    // validate email 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    if (isValidEmail) {
      if (password.length < 6) {
        alert('Mật khẩu từ 6 ký tự trở lên');
        setLoading(false)
        return;
      }
      else {
        if (password === passwordAgain) {
          try {
            axios.post(`${api}/comfirmAccount`, register)
              .then((res) => {
                setLoading(false)
                
                if (res.data.status) {
                  alert('Tạo tài khoản thành công')
                  navigate('/')
                } else {
                  alert('sai mã xác nhận')
                }
                
              })
          } catch (error) {
            console.log(error)
          }
        } else {
          setTimeout(() => {
            setLoading(false)
            alert('Xác thực mật khẩu sai')
          }, 3000)
        }
      }
    } else {
      alert('Sai định dạng email');
      setLoading(false)
      return
    }

  }
  // đăng ký tài khoản
  // đăng ký tài khoản
  const verificationCode = (e) => {
    e.preventDefault();

    function getRandomThousands() {
      const random = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      // Tạo số ngẫu nhiên từ 1000 đến 9999
      return random;
    }

    const code = getRandomThousands(); // Gọi hàm và gán kết quả cho biến code

    const register = {
      name: 'zxcvbnm',
      username: email,
      password: 'zxcvbnm',
      code: code, // Gán giá trị code cho register.code
    };
    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if (isValidEmail) {
      try {
        axios.post(`${api}/register`, register).then((res) => {
          if (res.data.status) {
            alert('Kiểm tra email để lấy mã xác nhận');
          } else {
            alert('Đã gửi mã xác nhận lên hệ thống');
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Sai định dạng email');
      setLoading(false);
      return;
    }
  };
  return (

    <div className='border p-3 bg-[rgba(255,255,255,0.8)] w-[350px] flex flex-col items-center rounded-md'>
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
          <h6 className='font-bold'>Tài khoản email:</h6>
          <div className='flex justify-center items-center gap-2'>
            <input
              required
              type="text"
              placeholder='Tài khoản email'
              className='outline-none p-1 border rounded-md bg-[rgba(255,255,255,0.5)]  w-full'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h6 onClick={verificationCode} className={`w-[30%] ${email ? "bg-blue-500 hover:bg-blue-400 cursor-pointer" : "bg-gray-500"}  text-[10px] text-white font-medium  rounded-md p-2`}>Mã kích hoạt</h6>
          </div>
        </div>
        {
          code && (
            <div>
              <div className="my-3 text-[12px] w-full">
                <h6 className="font-bold">Mật khẩu:</h6>
                <input
                  required
                  type="password"
                  placeholder="Mật khẩu"
                  className="outline-none p-1 border rounded-md bg-[rgba(255,255,255,0.5)] w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3 text-[12px] w-full">
                <h6 className="font-bold">Nhập lại mật khẩu:</h6>
                <input
                  required
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  className="outline-none p-1 border rounded-md bg-[rgba(255,255,255,0.5)] w-full"
                  value={passwordAgain}
                  onChange={(e) => {
                    setPasswordAgain(e.target.value);
                    if (e.target.value !== password) {
                      // Hiển thị thông báo lỗi mật khẩu không trùng khớp
                    } else {
                      // Xóa thông báo lỗi
                    }
                  }}
                />
              </div>
            </div>
          )
        }
        <div className='my-3 text-[12px] w-full'>
          <h6 className='font-bold'>Mã kích hoạt:</h6>
          <input
            required
            type="text"
            placeholder='Mã kích hoạt tại email'
            className='outline-none p-1 border rounded-md bg-[rgba(255,255,255,0.5)]  w-full'
            value={code}
            onChange={(e) => setCode(e.target.value)}
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