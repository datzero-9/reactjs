
import React from 'react';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('user'); // Lấy thông tin từ localStorage

    if (!user) {
        alert('vui lòng nhập tài khoản')
        return <Navigate to="/" replace />;
    }

    // Nếu đã đăng nhập, hiển thị component con
    return children;
}

export default ProtectedRoute