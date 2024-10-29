import React from 'react'
import NavBar from './user/NavBar/NavBar';
import CategoryUser from './user/Category/Category';
import Home from './user/Home/Home';
import Notice from './user/Notice/Notice';
import Category from './admin/Category/Category';
import Detail from './user/Detail/Detail';
import Cart from './user/Cart/Cart';
import Checkout from './user/Checkout/Checkout';
import { Route, Routes, Navigate } from 'react-router-dom';
import Adminpage from './admin/AdminPage/Adminpage';
import Create from './admin/CRUDProducts/Create'
import Read from './admin/CRUDProducts/Read'
import Update from './admin/CRUDProducts/Update';
import Login from './user/Accounts/Login';
import Register from './user/Accounts/Register';
import Account from './user/Accounts/Account';
const Layout = () => {

  const isAdmin = 0;
  return (

    <Routes>
      {/* Đặt trang login làm trang chính */}
      <Route path="/" element={<Navigate to="/account/login" />} />

      {/* Account Routes */}
      <Route path="/account" element={<Account />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Điều hướng theo role sau khi đăng nhập */}
      <Route path="/redirect" element={isAdmin ? (<Navigate to="/admin" />) : (<Navigate to="/user" />)} />

      {/* Admin Routes */}
      <Route path="/admin" element={<Adminpage />}>
        <Route index element={<Read />} />
        <Route path="products" element={<Read />} />
        <Route path="category" element={<Category />} />
        <Route path="create" element={<Create />} />
        <Route path="updateProduct" element={<Update />} />
      </Route>

      {/* User Routes */}
      <Route path="/user" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="category" element={<CategoryUser />} />
        <Route path="notice" element={<Notice />} />
        <Route path="detail" element={<Detail />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>

  )
}

export default Layout