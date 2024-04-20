'use client'
import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Page = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  useEffect(() => {
    if (typeof location !== "undefined") {
      // Your code that accesses location here
      // For example:
      console.log("Current URL:", location.href);
    }
  }, []);

  const FeedbackHandle = async (e) => {
    e.preventDefault();
    if (data.name === "" || data.email === "" || data.message === "") {
      alert("Fill in all the fields ");
    } else {
      try {
        console.log("Data being sent:", data);
        const response = await axios.post(
          "http://localhost:3001/feedback",
          data
        );
        console.log("Form submitted successfully", response.data);
      } catch (error) {
        console.log("Error while handling Contactus Message: ", error);
      }
    }
  }
  useEffect(() => {
    console.log("Effect is running");
  }, [data]);
  return (
    <>
  <section className="contact-us">
	<h2>Feedback</h2>
	<form method="POST">
		<label for="name">Name:</label>
		<input type="text" id="name" name="name" onChange={(e) => setData({ ...data, name: e.target.value })} required />
		<label for="email">Email:</label>
		<input type="email" id="email" name="email" onChange={(e) => setData({ ...data, email: e.target.value })} required />
		<label for="message">Message:</label>
		<textarea id="message" name="message" rows="5" onChange={(e) => setData({ ...data, message: e.target.value })} required ></textarea>
		<input type="submit" value="Submit" onClick={FeedbackHandle} />
	</form>
</section>
    </>
  )
};

export default Page;
