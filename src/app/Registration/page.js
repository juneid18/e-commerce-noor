"use client";
import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";

const Page = () => {
  const router = useRouter();
  const [data, setdata] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    DOB: "",
    address: "",
    gender: ""
  });

  function slider_left() {
    var element = document.querySelector(".slide-container");
    element.classList.toggle("slider-toggle");
    document.querySelector(".slider-decs").style.display = "none";
    document.querySelector(".slider-decs-hide").style.display = "block";
  }
  function slider_right() {
    var element = document.querySelector(".slide-container");
    element.classList.toggle("slider-toggle");
    document.querySelector(".slider-decs").style.display = "block";
    document.querySelector(".slider-decs-hide").style.display = "none";
  }

  const RegisterHandler = async (e) => {
    e.preventDefault();
    if (data === "") {
      alert("fill the fields ");
    } else {
      try {
        console.log("Data being sent:", data);
        const response = await axios.post(
          "http://localhost:3001/register",
          data
        );
        console.log("Form submitted successfully", response.data);
        console.log(data);
        if (response.data.redirectTo) {
          // Redirect to the specified URL
          window.location.href = response.data.redirectTo;
        } else {
          console.log("Form submitted successfully", response.data);
        }
      } catch (error) {
        console.log("Error submitting form: ", error);
      }
    }
  };

  // LoginHandle
  const [logindata, setlogindata] = useState({
    email: '',
    password: '',
  });

  const loginHandler = async (event) => {
      event.preventDefault();
      if(logindata.email === '' || logindata.password === ''){
        alert('Please fill all proper fields to login. ' );
      }else{
      try {
      console.log("data sent to log the user ");
      const data = await axios.post('http://localhost:3001/login', logindata); 
  console.log('user data :',data.data.matchemail);
      if(data.data.success === true) {
        // add an sweet alert here : 
        const logged = true;
        const userdata = data.data.userinfo;
        const serializedClientData = JSON.stringify(userdata);
        alert("Login Succesfull");
          // router.push('/Home', {state : {islogin : logged , user : userdata} })
  
          Cookies.set("userlogged", logged, { expires: 7, path: "/" });
          
          Cookies.set("clientinfo", serializedClientData, { expires: 7, path: "/" });
  
          const storedUserLogged = Cookies.get("userlogged");
          // let boolen = true; // Use let instead of const
          console.log(storedUserLogged);
          if (storedUserLogged === "undefined" || storedUserLogged === "false") {
          setboolen(false);
          //console.log('User not logged in');
        }
          router.push('/Home')
    } 
    
    if(data.data.success === false) {
        alert('User not found');
    }
      //console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <>
        <head>
        <title>Registration</title>
      </head>
      <div className="main">
        <div className="container">
          <div className="signin-container">
            <form method="post">
              <h1>Sign Up</h1>
              <input name="email" type="email" onChange={(e) => setlogindata({ ...logindata, email: e.target.value })} placeholder="Email" />
              <br />
              <input name="password" type="password" onChange={(e) => setlogindata({ ...logindata, password: e.target.value })} placeholder="Password" />
              <br />
              <a href="#">Forgot your password ?</a>
              <br />
              <button onClick={loginHandler} name="submit" id="submit-btn1">
                SIGN IN
              </button>
            </form>
          </div>

          <div className="register-container">
            <form method="POST">
              <h1>Create Account</h1>
              <input
                name="name"
                type="text"
                onChange={(e) => setdata({ ...data, name: e.target.value })}
                placeholder="Name"
                required
              />
              <br />
              <input
                name="semail"
                type="text"
                onChange={(e) => setdata({ ...data, email: e.target.value })}
                placeholder="Email"
                required
              />
              <br />
              <input
                name="Mobile"
                maxlength="10"
                onChange={(e) => setdata({ ...data, number: e.target.value })}
                type="number"
                placeholder="Mobile Number"
                required
              />
              <br />
              <input
                name="DOB"
                onChange={(e) => setdata({ ...data, DOB: e.target.value })}
                type="date"
                placeholder="DOB"
                required
              />
              <br />
              <input
                name="Address"
                onChange={(e) => setdata({ ...data, address: e.target.value })}
                type="text"
                placeholder="Address"
                required
              />
              <br />
              <select name="Gender" id="gender" onChange={(e) => setdata({ ...data, gender: e.target.value })}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
             </select>
             <br/>
              <input
                name="spassword"
                type="password"
                onChange={(e) => setdata({ ...data, password: e.target.value })}
                placeholder="Create Password"
                required
              />
              <br />
              <button onClick={RegisterHandler} id="submit-btn" name="button">
                SIGN IN
              </button>
            </form>
          </div>
          <div className="slide-container">
            <div className="slider-decs">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start shopping with us</p>
              <button id="signup-btn" onClick={slider_left}>
                SIGN UP
              </button>
            </div>
            <div className="slider-decs-hide">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button id="signup-btn" onClick={slider_right}>
                SIGN IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
