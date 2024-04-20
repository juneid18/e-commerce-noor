"use client";
import { useEffect, useState } from "react";
import "../style.css";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";

const Page = () => {
  const [order, setorder] = useState([]);
  function toggleNav() {
    const nav = document.querySelector(".navcontainer");
    const currentWidth = nav.style.width;
    nav.style.width = currentWidth === "80px" ? "250px" : "80px";
  }
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/findorder");
      console.log(response.data);
      setorder(response.data);
    } catch (error) {
      console.error("Error fetching Feedback data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Head>
        <title>AdminPanel</title>
      </Head>
      <header>
        <div class="logosec">
          <div class="logo">AdminPanel</div>
          <Image
                width={30}
                height={30}

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
                height={30}

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
                height={30}

            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png"
            class="icn"
            alt=""
          />
          <div class="dp">
            <Image
                width={30}
                height={30}

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
                height={30}

                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                  class="nav-Image
                width={30}
                height={30}
"
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
                height={30}

                    src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                    class="nav-Image
                width={30}
                height={30}
"
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
                height={30}

                    src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/5.png"
                    class="nav-Image
                width={30}
                height={30}
"
                    alt="report"
                  />
                  <h3> Users</h3>
                </div>
              </Link>

              <Link href={"./Products"}>
                <div class="nav-option option4">
                  <Image
                width={30}
                height={30}

                    src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/6.png"
                    class="nav-Image
                width={30}
                height={30}
"
                    alt="institution"
                  />
                  <h3> Products</h3>
                </div>
              </Link>
              <Link
                href={"./Feedback"}
                style={{
                  backgroundColor: "#3f0097",
                  color: "#fff",
                  borderLeft: "5px solid #010058af",
                  textDecoration: "none",
                }}
                class="nav-option option5"
              >
                <Image
                width={30}
                height={30}

                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183323/10.png"
                  class="nav-Image
                width={30}
                height={30}
"
                  alt="blog"
                />
                <h3> Feedback</h3>
              </Link>
              <Link href={"./Contactus"}>
                <div
                  class="nav-option option6"
                  style={{
                    backgroundColor: "#fff",
                    color: "#3f0097",
                    border: "none",
                  }}
                >
                  <Image
                width={30}
                height={30}

                    src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/4.png"
                    class="nav-Image"
                    alt="settings"
                  />
                  <h3> ContactUs</h3>
                </div>
              </Link>
            </div>
          </nav>
        </div>
        <div class="main">
          <div class="searchbar2">
            <input type="text" name="" id="" placeholder="Search" />
            <div class="searchbtn">
              <Image
                width={30}
                height={30}

                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
                class="icn srchicn"
                alt="search-button"
              />
            </div>
          </div>

          <div class="report-container">
            <div class="report-header">
              <h1 class="recent-Articles">Order Table</h1>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Quantity</th>
                  <th>ZipCode</th>
                  <th>Product Id</th>
                  <th>Date and Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {order.map((list) => (
                  <tr key={list._id}>
                    <td>{list._id}</td>
                    <td>{list.title}</td>
                    <td>{list.price}</td>
                    <td>{list.name}</td>
                    <td>{list.email}</td>
                    <td>{list.address}</td>
                    <td>{list.city}</td>
                    <td>{list.quantity}</td>
                    <td>{list.zipcode}</td>
                    <td>{list.productId}</td>
                    <td>{list.createdAt}</td>
                    <td>
                      <Link
                        href={{
                          pathname: "Order/BillInvoice",
                          query: {
                            ID: list._id,
                            title: list.title,
                            price: list.price,
                            name: list.name,
                            email: list.email,
                            address: list.address,
                            city: list.city,
                            quantity: list.quantity,
                            zipcode: list.zipcode,
                            productId: list.productId,
                            date: list.createdAt
                          },
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <button
                          style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            textDecoration: "none",
                          }}
                        >
                          Download Bill
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
