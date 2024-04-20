'use client'
import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });


  function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
  }
  
  function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }
  useEffect(() => {
    const inputs = document.querySelectorAll(".input");
    inputs.forEach((input) => {
      input.addEventListener("focus", focusFunc);
      input.addEventListener("blur", blurFunc);
    });
  }, [])
  

  

  const ContactUsHandle = async (e) => {
    e.preventDefault();
    if (data.name === "" || data.email === "" || data.phone === "" || data.message === "") {
      alert("Fill in all the fields ");
    } else {
      try {
        console.log("Data being sent:", data);
        const response = await axios.post(
          "http://localhost:3001/contact",
          data
        );
        console.log("Form submitted successfully", response.data);
        document.querySelector(".hidden").style.display = "block";
      } catch (error) {
        console.log("Error while handling Contactus Message: ", error);
      }
    }
  }
const gotohome = () => {
router.push('./Home')
}
  return (
    <>
    <div className='hidden'>
  <div className='alertmain'>
  <div class="subcontainer">
    <div class="success-message">
      <h2>Your query has been sent successfully!</h2>
      <button onClick={gotohome}>Go to Home Page</button>
    </div>
  </div>
  </div>
    </div>



    <div className="container">
      <span className="big-circle"></span>
      <Image width={200} height={200} src="img/shape.png" className="square" alt="" />
      <div className="form">
        <div className="contact-info">
          <h3 className="title">Lets get in touch</h3>
          <p className="text">
          Offering a diverse range of stylish bags, our platform ensures a seamless shopping experience.
          </p>

          <div className="info">
            <div className="information">
              <i className="fas fa-map-marker-alt"></i>

              <p>Shaniwar peth satara, IN 415002</p>
            </div>
            <div className="information">
              <i className="fas fa-envelope"></i>
              <p>noorbag@gmail.com</p>
            </div>
            <div className="information">
              <i className="fas fa-phone"></i>
              <p>9503170450</p>
            </div>
          </div>

        </div>

        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>

          <form className='formcon' action="index.html" autocomplete="off">
            <h3 className="title">Contact us</h3>
            <div className="input-container">
              <input type="text" name="name" onChange={(e) => setData({ ...data, name: e.target.value })} className="input" />
              <label for="">Username</label>
              <span>Username</span>
            </div>
            <div className="input-container">
              <input type="email" name="email" onChange={(e) => setData({ ...data, email: e.target.value })} className="input" />
              <label for="">Email</label>
              <span>Email</span>
            </div>
            <div className="input-container">
              <input type="tel" name="phone" onChange={(e) => setData({ ...data, phone: e.target.value })} className="input" />
              <label for="">Phone</label>
              <span>Phone</span>
            </div>
            <div className="input-container textarea">
              <textarea name="message" onChange={(e) => setData({ ...data, message: e.target.value })} className="input"></textarea>
              <label for="">Message</label>
              <span>Message</span>
            </div>
            <input type="submit" value="Send" onClick={ContactUsHandle} className="btn" />
          </form>
        </div>
      </div>
    </div>

    </>
  )
};

export default Page;
