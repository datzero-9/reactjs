import React from 'react'
import { Routes, Route, Outlet, } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import Notice from '../Notice/Notice';
import Category from '../Category/Category';
import Detail from '../Detail/Detail';
import Cart from '../Cart/Cart';
import Search from '../NavBar/Search';

const Layout = () => {
  return (
    
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/detail" element={<Detail />} />       
      </Route>
      <Route path="/cart" element={<Cart />} />


    </Routes>
  )
}

export default Layout