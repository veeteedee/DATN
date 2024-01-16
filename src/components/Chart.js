// Filename - Chart.jsx
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Chart.css';

// ...

const Chart = () => {
    const [DuLieu, setDuLieu] = useState([]);
    const [ChartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-ycgvb/endpoint/GetWeb");
                const newData = response.data;
                setDuLieu(newData);

                // Thêm dữ liệu mới vào mảng cũ
                setChartData(prevData => [...prevData, ...newData]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 2000);

        return () => clearInterval(intervalId);
    }, []); // Không cần thêm DuLieu vào dependency để tránh việc thực hiện useEffect liên tục

    const dataPoints = ChartData.map(user => ({ Time: user.Time, RPM: user.RPM }));


    return (
        <div>
            <h1>ĐỒ THỊ TỐC ĐỘ ĐỘNG CƠ DÙNG BỘ ĐIỀU KHIỂN PID</h1>



            <table1>
                <thead>
                    <tr>
                        <th>RPM</th>
                        <th>Derivative</th>
                        <th>Integral</th>
                        <th>Control Signal</th>
                        <th>Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    {DuLieu.map((user, index) => (
                        <tr key={index}>
                            <td>{user.RPM}</td>
                            <td>{user.Derivative}</td>
                            <td>{user.Integral}</td>
                            <td>{user.Control_signal}</td>
                            <td>{user.Time}</td>
                        </tr>
                    ))}
                </tbody>
            </table1>

            <div>
                <Line
                    data={{
                        datasets: [{
                            data: dataPoints,
                            label: "RPM",
                            showLine: true,
                            fill: false,
                            borderWidth: 1,
                            parsing: {
                                xAxisKey: 'Time',
                                yAxisKey: 'RPM'
                            },
                            backgroundColor: 'rgba(255, 99, 132, 1)',
                            borderColor: "rgba(75,192,192,1)"
                        }]
                    }}
                    options={{
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 500
                            }
                        }
                    }}

                />
            </div>

            <ul>
                <li>
                    <Link to="/">
                        <button className="Button">Back to Home</button>
                    </Link>
                </li>
            </ul>

        </div>
    );
};

export default Chart;