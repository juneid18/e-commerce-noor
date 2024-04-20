'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import "../style.css";
import Image from 'next/image';

const Page = () => {
    
    const [Contactus, setcontactus] = useState([]);
    function toggleNav() {
      const nav = document.querySelector(".navcontainer");
      const currentWidth = nav.style.width;
      nav.style.width = currentWidth === "80px" ? "250px" : "80px";
    }
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get("http://localhost:3001/contactusmsg");
          console.log(response.data); 
          setcontactus(response.data);
        } catch (error) {
          console.error("Error fetching Feedback data:", error);
        }
      };
  
      fetchUserData();
    }, []);
  
  return (
    <>
      <head>
        <title>AdminPanel</title>
      </head>
      <header>
        <div class="logosec">
          <div class="logo">AdminPanel</div>
          <Image
                width={30}
                height={100}
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
            class="icn menuicn"
            id="menuicn"
            alt="menu-icon"
            onClick={toggleNav}
          />
        </div>

        <div class="searchbar">
          <input type="text" placeholder="Search" />
          <div class="searchbtn">
            <Image
                width={30}
                height={100}
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
              class="icn srchicn"
              alt="search-icon"
            />
          </div>
        </div>

        <div class="message">
          <div class="circle"></div>
          <Image
                width={30}
                height={100}
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png"
            class="icn"
            alt=""
          />
          <div class="dp">
            <Image
                width={30}
                height={100}
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
              class="dpicn"
              alt="dp"
            />
          </div>
        </div>
      </header>

      <div class="main-container">
        <div class="navcontainer">
          <nav class="nav">
            <div class="nav-upper-options">
              <Link
                href={"./Dashboard"}
                style={{
                  backgroundColor: "#fff",
                  color: "#3f0097",
                  border: "none",
                }}
                class="nav-option option1"
              >
                <Image
                width={30}
                height={100}
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                  class="nav-Image
                width={30}
                height={100}"
                  alt="dashboard"
                />
                <h3> Dashboard</h3>
              </Link>
<Link href={"./Upload"}>
              <div
                
                style={{
                  backgroundColor: "#fff",
                  color: "#3f0097",
                  border: "none",
                }}
                class="option2 nav-option"
              >
                <Image
                width={30}
                height={100}
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  class="nav-Image
                width={30}
                height={100}"
                  alt="articles"
                />
                <h3> Upload</h3>
              </div>
              </Link>
<Link href={"./Users"}>
              <div
                style={{
                    backgroundColor: "#fff",
                    color: "#3f0097",
                    border: "none",
                  }}
                class="nav-option option3"
              >
                <Image
                width={30}
                height={100}
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/5.png"
                  class="nav-Image
                width={30}
                height={100}"
                  alt="report"
                />
                <h3> Users</h3>
              </div>
              </Link>

              <Link href={'./Products'} >
              <div class="nav-option option4" style={{
                    backgroundColor: "#fff",
                    color: "#3f0097",
                    border: "none",
                  }}>
                <Image
                width={30}
                height={100}
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/6.png"
                  class="nav-Image
                width={30}
                height={100}"
                  alt="institution"
                />
                <h3> Products</h3>
              </div>
</Link>
              <Link href={'./Feedback'}  style={{
                    backgroundColor: "#fff",
                    color: "#3f0097",
                    border: "none",
                  }} class="nav-option option5">
                <Image
                width={30}
                height={100}
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183323/10.png"
                  class="nav-Image
                width={30}
                height={100}"
                  alt="blog"
                />
                <h3> Feedback</h3>
              </Link>

              <Link href={'./Contactus'} class="nav-option option6" style={{
                  backgroundColor: "#3f0097",
                  color: "#fff",
                  borderLeft: "5px solid #010058af",
                  textDecoration: "none",
                }}>
                <Image
                width={30}
                height={100}
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/4.png"
                  class="nav-Image
                width={30}
                height={100}"
                  alt="settings"
                />
                <h3> ContactUS </h3>
              </Link>

              <div class="nav-option logout">
                <Image
                width={30}
                height={100}
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                  class="nav-Image
                width={30}
                height={100}"
                  alt="logout"
                />
                <h3>Logout</h3>
              </div>
            </div>
          </nav>
        </div>
        <div class="main">
          <div class="searchbar2">
            <input type="text" name="" id="" placeholder="Search" />
            <div class="searchbtn">
              <Image
                width={30}
                height={100}
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
                class="icn srchicn"
                alt="search-button"
              />
            </div>
          </div>

          <div class="report-container">
            <div class="report-header">
              <h1 class="recent-Articles">ContactUS Table</h1>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {Contactus.map((msg) => (
                  <tr key={msg._id}>
                    <td>{msg._id}</td>
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td>{msg.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page