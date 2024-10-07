import { useState } from "react";
import NavBar from './components/NavBar/NavBar';
import Slide from "./components/Slide/Slide";
import Home from "./components/Home/Home";
import Search from "./components/NavBar/Search";
import { Routes, Route, Outlet, } from "react-router-dom";
import Category from "./components/Category/Category";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";


function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-x-hidden  relative" >
     
      <Layout />

    </div>
  )
}


export default App;
