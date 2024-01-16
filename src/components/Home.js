import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Home.css';
export default function Home() {

  const [kp, setKp] = useState('')
  const [td, setTd] = useState('')
  const [setpoint, setSetpoint] = useState('')
  const [ti, setTi] = useState('')
  const [data,setData] = useState([])
  const [time, setTime] = useState('');


  // useEffect(()=>{
  //   axios.get("https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-ycgvb/endpoint/GetWeb")
  //   .then(res => {

  //     setData(res.data);
  //   })
  //   .catch(er => console.log(er))
  // }, [])


  //localStorage để lưu giá trị mới nhâp và hiện lên bảng
  useEffect(() => {
    // Retrieve data from localStorage on component mount
    const storedData = JSON.parse(localStorage.getItem('pidData')) || [];
    setData(storedData);
  }, []);

  let submit = async (e) => {
    e.preventDefault()

    try {
      const currentTime = new Date().toLocaleTimeString();

      await axios.post("https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-ycgvb/endpoint/PostPID", {
        setpoint, kp, td, ti
      })

      // setData([...data, { setpoint, kp, td, ti, time: currentTime }]);
      const newData = [...data, { setpoint, kp, td, ti, time: currentTime }];
      setData(newData);
      localStorage.setItem('pidData', JSON.stringify(newData));

      setSetpoint('');
      setKp('');
      setTd('');
      setTi('');
      setTime(currentTime);

    }
    catch (e) {

      console.log(e);

    }
  }

  const handleDelete = (setpointToDelete) => {

    const newData = data.filter(item => item.setpoint !== setpointToDelete);
    setData(newData);
    localStorage.setItem('pidData', JSON.stringify(newData));
    
    // setData(data.filter(item => item.setpoint !== setpointToDelete));
  }

  return (
    <div className='cont'>

      <h1>HỆ THỐNG ĐIỀU KHIỂN ĐỘNG CƠ DÙNG PHƯƠNG PHÁP PID</h1>
      <form action="POST">

        <p class="note">
          Thông số Setpoint&#58; &nbsp;
          <textarea name="text" onChange={(e) => { setSetpoint(e.target.value) }} value={setpoint || ''} placeholder="Nhập Setpoint" cols="20" rows="1"></textarea>
        </p>


        <p class="note">
          Thông số Kp&#58; &nbsp;
          <textarea name="text" onChange={(e) => { setKp(e.target.value) }} value={kp || ''} placeholder="Nhập Kp" cols="20" rows="1"></textarea>
        </p>


        <p class="note">
          Thông số Td&#58; &nbsp;
          <textarea name="text" onChange={(e) => { setTd(e.target.value) }} value={td || ''} placeholder="Nhập Td" cols="20" rows="1"></textarea>
        </p>


        <p class="note">
          Thông số Ti&#58; &nbsp;
          <textarea name="text" onChange={(e) => { setTi(e.target.value) }} value={ti || ''} placeholder="Nhập Ti" cols="20" rows="1"></textarea>
        </p>


      </form>
      <input class="Button" type="submit" onClick={submit} value="submit" />

      <table>
        <thead>
          <tr>
            <th>SetPoint</th>
            <th>Thông số Kp</th>
            <th>Thông số Td</th>
            <th>Thông số Ti</th>
            {/* <th>RPM</th> */}
            <th>Thời gian gửi</th>
            <th>Xóa dữ liệu</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((user, index) => (
              <tr key={index}>
              
                <td>{user.setpoint}</td>
                <td>{user.kp}</td>
                <td>{user.td}</td>
                <td>{user.ti}</td>
                {/* <td>{user.RPM}</td> */}
                <td>{user.time}</td>
                <td>
                  <button onClick={( )=> handleDelete(user.setpoint)}>Delete</button>
                </td>
              </tr>
            )
            )
          }
        </tbody>
      </table>

      <ul>
        <li>
          <Link to="/chart">
            <button className="Button">Go to Chart</button>
          </Link>
        </li>
      </ul> 

    </div>

  )

}
