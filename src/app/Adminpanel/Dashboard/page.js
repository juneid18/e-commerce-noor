"use client";
import { useEffect, useState } from "react";
import "../style.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import Image from "next/image";


const Page = () => {
  const router = useRouter();
  const [navWidth, setNavWidth] = useState('80px');
  

  useEffect(() => {
    const nav = document.querySelector('.navcontainer');
    nav.style.width = navWidth;
  }, [navWidth]);

  const toggleNav = () => {
    setNavWidth((prevWidth) => (prevWidth === '80px' ? '250px' : '80px'));
  };

  const [users, setusers] = useState([]);
  const [product, setproduct] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setusers(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchProductData = async () => {
    try {
      const result = await axios.get("http://localhost:3001/products");
      setproduct(result.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchProductData();
  }, []);
  const handleLogout = () => {
    Cookies.remove('adminlogged');
    router.push("/AdminLogin")
  };
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    try {
      const storedAdminLogged = Cookies.get("adminlogged");
      setIsLoggedIn(storedAdminLogged);
    } catch (error) {
      console.log("Cookies is not set or defined yet !!", error);
    }
  }, []);
  console.log(isLoggedIn);
  return (
    <>

      <head>
        <title>AdminPanel</title>
      </head>
      <header>
        <div class="logosec">
          <div class="logo">AdminPanel</div>
          <div onClick={toggleNav} style={{cursor:'pointer'}}>
            <div className="hamburger"></div>
          <div className="hamburger"></div>
          <div className="hamburger"></div>
          </div>
        </div>


        <div class="message">
          <div class="dp" onClick={handleLogout}>
            <Image
            width={100}
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
              <div class="nav-option option1">
                <Image
                width={30}
                height={100}
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                  class="nav-img"
                  alt="dashboard"
                />
                <h3> Dashboard</h3>
              </div>

              <Link href={'./Upload'} class="option2 nav-option">
                <Image
                width={30}
                height={100}
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  class="nav-img"
                  alt="articles"
                />
                <h3> Upload</h3>
              </Link>

              <Link href={'./Order'} class="option2 nav-option">
                <Image
                width={30}
                height={100}
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  class="nav-img"
                  alt="articles"
                />
                <h3> Orders</h3>
              </Link>

              <Link href={'./Users'} class="nav-option option3">
                <Image
                width={30}
                height={100}
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/5.png"
                  class="nav-img"
                  alt="report"
                />
                <h3> Users</h3>
              </Link>

              <Link href={'./Products'} class="nav-option option4" style={{
                    backgroundColor: "#fff",
                    color: "#3f0097",
                    border: "none",
                  }}>
                <Image
                width={30}
                height={100}
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/6.png"
                  class="nav-img"
                  alt="institution"
                />
                <h3> Products</h3>
              </Link>
<Link href={'./Feedback'}>
              <div class="nav-option option5" style={{
                    backgroundColor: "#fff",
                    color: "#3f0097",
                    border: "none",
                  }}>
                <Image
                width={30}
                height={100}
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183323/10.png"
                  class="nav-img"
                  alt="blog"
                />
                <h3> Feedback</h3>
              </div>
              </Link>
              <Link href={'./Feedback'}>

              <div class="nav-option option6" style={{
                    backgroundColor: "#fff",
                    color: "#3f0097",
                    border: "none",
                  }}>
                <Image
                width={30}
                height={100}
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/4.png"
                  class="nav-img"
                  alt="settings"
                />
                <h3> ContactUS</h3>
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
                height={100}
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
                class="icn srchicn"
                alt="search-button"
              />
            </div>
          </div>

          <div class="box-container">
            <div class="box box1">
              <div class="text">
                <h2 class="topic-heading">{users.length}</h2>
                <h2 class="topic">Active Users</h2>
              </div>

              <Image
                width={30}
                height={100}
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(31).png"
                alt="Views"
              />
            </div>

            <div class="box box2">
              <div class="text">
                <h2 class="topic-heading">{product.length}</h2>
                <h2 class="topic">Total Products</h2>
              </div>

              <Image
                width={30}
                height={100}
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185029/13.png"
                alt="likes"
              />
            </div>

            <div class="box box3">
              <div class="text">
                <h2 class="topic-heading">320</h2>
                <h2 class="topic">Comments</h2>
              </div>

              <Image
                width={30}
                height={100}
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(32).png"
                alt="comments"
              />
            </div>

            <div class="box box4">
              <div class="text">
                <h2 class="topic-heading">70</h2>
                <h2 class="topic">Published</h2>
              </div>

              <Image
                width={30}
                height={100}
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185029/13.png"
                alt="published"
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Page;
