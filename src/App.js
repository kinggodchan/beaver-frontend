import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Axios 임포트
import logo from './logo.svg';
import './App.css';

function App() {
  const [users, setUsers] = useState([]); // 상태 변수 선언

  useEffect(() => {
    // NestJS API 호출
    axios.get('http://localhost:3000/users') // NestJS API 주소
      .then(response => {
        setUsers(response.data); // 응답 데이터 설정
      })
      .catch(error => {
        console.error('Error fetching users:', error); // 에러 처리
      });
  }, []); // 빈 배열을 넣어 컴포넌트가 마운트될 때만 호출

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <h1>Users</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li> // 사용자 이름 출력
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
