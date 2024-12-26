import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import api from '../../../Helper/api';
import formatPrice from '../../../Helper/formatPrice';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Đăng ký các thành phần cần thiết
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const Revenue = () => {
    const [chartData, setChartData] = useState(null);
    const [selectYear, setSelectYear] = useState(2024)
    const [total, setTotal] = useState([])
    useEffect(() => {
        axios.get(`${api}/revenue/${selectYear}`)
            .then((response) => {
                setChartData(response.data[0]);
                setTotal(response.data[1]);
                console.log(response.data[1]);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu doanh thu:', error);
            });
    }, [selectYear]);
    const all = total.reduce((total, price) => { return total + price.total }, 0)
    if (!chartData) {
        return <p>Đang tải dữ liệu...</p>;
    }
    const allYear = [
        { nam: 2020 },
        { nam: 2021 },
        { nam: 2022 },
        { nam: 2023 },
        { nam: 2024 },
        { nam: 2025 },
        { nam: 2026 },
    ]
    return (
        <div className='m-2'>
            <h2 className='font-semibold'>Biểu đồ doanh thu</h2>

            <select className='outline-none text-13 border border-black ' onChange={(e) => { setSelectYear(e.target.value) }}>
                <option value="2024">Năm 2024</option>

                {
                    allYear.map((data, index) => {
                        return (
                            <option value={data.nam} key={index}>Năm {data.nam}</option>
                        )
                    })
                }
            </select>
            <h6 className='text-13 '>Tổng Doanh thu năm {selectYear}: {formatPrice(all)} VND </h6>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' }
                    },
                    scales: {
                        x: { type: 'category' },
                        y: { type: 'linear' },
                    },
                }}
            />
        </div>
    );
}

export default Revenue