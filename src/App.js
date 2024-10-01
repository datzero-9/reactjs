import { useState } from "react";
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">My Website</div>
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'} md:block mt-4 md:mt-0`}>
          <a href="#" className="text-white hover:text-gray-300">Đăng nhập</a>
          <a href="#" className="text-white hover:text-gray-300">Đăng ký</a>
          <a href="#" className="text-white hover:text-gray-300">Trang chủ</a>
          <a href="#" className="text-white hover:text-gray-300">Liên hệ</a>
          <a href="#" className="text-white hover:text-gray-300">Về chúng tôi</a>
        </div>
      </div>
    </nav>
  );
}

export default App;
