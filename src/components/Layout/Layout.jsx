import React from 'react'
import NavBar from './user/NavBar/NavBar';
import Home from './user/Home/Home';
import Notice from './user/Notice/Notice';
import Category from '../Layout/admin/Category/Category';
import Detail from './user/Detail/Detail';
import Cart from './user/Cart/Cart';
import Checkout from './user/Checkout/Checkout';
import { Route, Routes, Navigate } from 'react-router-dom';
import Adminpage from './admin/AdminPage/Adminpage';
import Create from '../Layout/admin/CRUDProducts/Create'
import Read from '../Layout/admin/CRUDProducts/Read'
const Layout = () => {

  const isAdmin = 1;
  return (

    <Routes>
      <Route path="/" element={isAdmin ? (<Navigate to="/admin" />) : (<Navigate to="/user" />)} />

      <Route path="/admin" element={<Adminpage />}>
        <Route index element={<Read />} />
        <Route path="products" element={<Read />} />
        <Route path="category" element={<Category />} />
        <Route path="create" element={<Create />} />
      </Route>

      <Route path="/user" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="category" element={<Category />} />
        <Route path="notice" element={<Notice />} />
        <Route path="detail" element={<Detail />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="cart" element={<Cart />} />
      </Route>

    </Routes>
  )
}

export default Layout