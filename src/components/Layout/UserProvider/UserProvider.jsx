// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Tạo Context cho user
// const UserContext = createContext();

// // Provider để quản lý trạng thái user
// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     // Khi component mount, kiểm tra localStorage để khôi phục thông tin người dùng
//     useEffect(() => {
//         // Đọc dữ liệu người dùng từ localStorage
//         const storedUser = localStorage.getItem('user');

//         if (storedUser) {
//             try {
//                 // Parse dữ liệu từ JSON
//                 const parsedUser = JSON.parse(storedUser);

//                 // Kiểm tra nếu dữ liệu hợp lệ
//                 if (parsedUser && parsedUser.id && parsedUser.name) {
//                     setUser(parsedUser);
//                 }
//             } catch (error) {
//                 console.error("Lỗi khi khôi phục dữ liệu người dùng từ localStorage", error);
//             }
//         }
//     }, []);  // Chạy một lần khi component mount

//     // Lưu thông tin người dùng vào localStorage mỗi khi user thay đổi
//     useEffect(() => {
//         if (user) {
//             localStorage.setItem('user', JSON.stringify(user));  // Lưu thông tin vào localStorage
//         } else {
//             localStorage.removeItem('user');  // Nếu user null, xóa thông tin
//         }
//     }, [user]);

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// // Hook tùy chỉnh để sử dụng Context
// export const useUser = () => useContext(UserContext);
