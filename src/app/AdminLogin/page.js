'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Assuming you meant 'next/router' instead of 'next/navigation'
import axios from 'axios';
import Cookies from 'js-cookie';
import './style.css'; 

const Login = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const [logindata, setLoginData] = useState({
    email: '',
    password: '',
  });

  const loginHandler = async (event) => {
    event.preventDefault();
    if (logindata.email === '' || logindata.password === '') {
      alert('Please fill all proper fields to login.');
    } else {
      try {
        const data = await axios.post('http://localhost:3001/adminlogin', logindata); 
        if (data.data.success === true) {
          Cookies.set("adminlogged", true, { expires: 7, path: "/" });
          const storedUserLogged = Cookies.get("adminlogged");
          setIsLoggedIn(storedUserLogged);
        } else {
          alert('User not found');
        }
      } catch (error) {
        console.log(error);
        alert('An error occurred while logging in');
      }
    }
  };
  useEffect(() => {
    if (isLoggedIn === false) {
      // Redirect or display message indicating the user needs to log in
      router.push('/AdminLogin');
    } else {
      router.push('/Adminpanel');
    }
  }, [isLoggedIn, router]);
  console.log(isLoggedIn);

  return (
    <div className="loginBox">
      <h2>Admin Panel Login</h2>
      <form onSubmit={loginHandler}>
        <div className="userBox">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={logindata.email}
            onChange={(e) => setLoginData({ ...logindata, email: e.target.value })}
            required
          />
        </div>
        <div className="userBox">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={logindata.password}
            onChange={(e) => setLoginData({ ...logindata, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="loginBtn">Login</button>
      </form>
    </div>
  );
};

export default Login;
