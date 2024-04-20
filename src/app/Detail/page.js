"use client";
import React, { useEffect, useState } from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './page.module.css';
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";

const Page = ({ searchParams }) => {
  const [clientdata, setclientdata] = useState();

  useEffect(() => {
    try {
      const clientInfo = JSON.parse(Cookies.get("clientinfo"));
      setclientdata(clientInfo);
      setdata({
        userId: clientInfo.objectId,
        productId: searchParams.ID,
        category: searchParams.category,
        detail: searchParams.detail,
        image: searchParams.image,
        price: searchParams.price,
        title: searchParams.title,
      });
    } catch (error) {
      console.log("Cookies is not set or defined yet !!", error);
    }
  }, [searchParams.ID, searchParams.category, searchParams.detail, searchParams.image, searchParams.price, searchParams.title]);

  const [data, setdata] = useState({
    userId: "",
    productId: "",
    category: "",
    detail: "",
    image: "",
    price: "",
    title: "",
  });

  function shownav() {
    var element = document.getElementById('navCon')
    element.classList.toggle("toggleclass");
  }
  const [animationActive, setAnimationActive] = useState(false);

  const addToCart = async () => {
    // Trigger animation
    setAnimationActive(true);

    setTimeout(() => {
      setAnimationActive(false);
    }, 5000); 
    // console.log(data);
    try {
      console.log("Data being sent:", data);
      const response = await axios.post("http://localhost:3001/cart", data);
      console.log("Form submitted successfully", response.data);
      if (response.data) {
        // Redirect to the specified URL
        console.log("Form submitted successfully", response.data);
      } else {
        console.log("Form submitted unsuccessfully");
      }
    } catch (error) {
      console.log("Error submitting form: ", error);
    }
  };

  const [relatedProducts, setRelatedProducts] = useState([]);
  // Function to fetch related products based on category
  const fetchRelatedProducts = async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/products?category=${category}`
      );
      setRelatedProducts(response.data);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  // Fetch related products when the component mounts
  useEffect(() => {
    if (searchParams.category) {
      fetchRelatedProducts(searchParams.category);
    }
  }, [searchParams.category]);
  return (
    <>
    <div className={styles.main}>
      <nav className={styles.navcontainer}>
        <div className={styles.logo}>
          <div className={styles.nav}>
            <span onClick={shownav}>&#9776;</span>
          </div>
          <video id="video" width="140"style={{marginLeft:'60px'}} autoPlay muted>
            <source src="./images/Logo.mp4" type="video/mp4" />
          </video>
        </div>

        <div className={styles.nav_searchcon}>
          {/* <!-- <input id="searchbar" type="text" placeholder="Search Product Here ..."> --> */}
        </div>
        <Link href="./Cart">
          <FontAwesomeIcon
            icon={faShoppingCart}
            style={{
              fontSize: "30px",
              margin: "16px",
              color: "black",
              cursor: "pointer",
            }}
            />
            {animationActive && <span className={styles.red_dot}></span>}
    
        </Link>
      </nav>
      <div id="navCon" className={styles.nav_con}>
        <span onClick={shownav}>&times;</span>
        <Link href={"./Home"}>HOME</Link>
        <Link href={"./MyOrders"}>My Orders</Link>
        <Link href={"./Contact"}>CONTACT</Link>
        <Link href={"./Aboutus"}>ABOUT US</Link>
      </div>

      <div className={styles.container}>
        <Image
        width={400}
        height={200}
          id={styles.item_img}
          src={`http://localhost:3001/uploads/${searchParams.image}`}
          alt={searchParams.title}
        />
        <div className={styles.item_img_container}>
          <div id={styles.main_img}>
            <span style={{ fontSize: "26px" }}>{searchParams.title}</span>
          </div>
          <span style={{ fontSize: "26px" }}>
            ₹<span>{searchParams.price}</span>
          </span>
          <div
            style={{
              width: "100%",
              padding: "24px",
              border: "1px solid #ccc",
              marginTop: "24px",
              borderRadius: "4px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <h2>Product Details : </h2>
            <br />
            <p>{searchParams.detail}</p>
          </div>
          <div
            style={{
              width: "100%",
              padding: "24px",
              borderBottom: "1px solid #ccc",
              textAlign: "center",
              marginTop: "24px",
              borderRadius: "4px",
            }}
          >
            <Link
              href={{
                pathname: "/Detail/Order",
                query: {
                  orderId: searchParams.ID,
                  title: searchParams.title,
                  image: searchParams.image,
                  price: searchParams.price,
                  detail: searchParams.detail,
                },
              }}
            >
              <button name="buy_btn" id={styles.buy_btn}>
                Buy Now
              </button>
            </Link>

            <button
              name="cart_btn"
              id={styles.cart_btn}
              onClick={addToCart}
              className={animationActive ? styles.animate : ""}
            >
              Add Cart
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ margin: "24px", fontWeight: "400" }}>Related products</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {Array.isArray(relatedProducts) ? relatedProducts.map((product) => (
            <Link key={product._id} href={{
              pathname: './Detail',
              query: {
                ID: product._id,
                title: product.title,
                category: product.category,
                image: product.imagePath,
                detail: product.details,
                price: product.price
              }
            }} style={{textDecoration:'none', color:'#000'}}>
            <div className={styles.reventProductContainer}
              style={{ marginBottom: "20px", textAlign: "center" }}
            >
              <Image
              width={200}
              height={200}
                src={`http://localhost:3001/uploads/${product.imagePath}`}
                alt={product.title}
              />
                <p style={{ fontSize: "18px", fontWeight: "bold", margin: "0" }}>
                {product.title}
              </p>
              <p style={{ fontSize: "18px", fontWeight: "bold", margin: "0" }}>
                {product.price}
              </p>
            </div>
            </Link>
          )): <h3>Loading</h3>}
        </div>
      </div>

      <div style={{ padding: "10px" }} id="disqus_thread"></div>

      <footer className={styles.footer}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "84%",
          }}
        >
        <Image src="/images/footerimg.png" alt="footer" width={2000} height={500} style={{ position:'relative', top:'100%', zIndex:'-1'}} />

          <h2 style={{ margin: "16px", fontSize: "2.5rem" }}>Subscribe</h2>
          <form action="https://formspree.io/f/myyovnja" method="post">
            <input
              name="Email"
              style={{
                width: "300px",
                height: "40px",
                fontSize: "14px",
                marginBottom: "14px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                paddingLeft: "6px",
              }}
              type="email"
              placeholder="Email Address"
            />
            <br />
            <button
              type="submit"
              value="submit"
              style={{
                width: "140px",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "40px",
                border: "1px solid #fff",
                backgroundColor: "#ff5517",
                color: "#fff",
              }}
            >
              Submit
            </button>
          </form>
        </div>
        <div>
          <a
            style={{ color: "#fff", textDecoration: "none", margin: "4px" }}
            href="/"
          >
            Home
          </a>
          <a
            style={{
              color: "#fff",
              textDecoration: "none",
              margin: "4px",
              fontSize: "14px",
            }}
            href="#"
          >
            Contact
          </a>
          <a
            style={{
              color: "#fff",
              textDecoration: "none",
              margin: "4px",
              fontSize: "14px",
            }}
            href="#"
          >
            Service
          </a>
          <a
            style={{
              color: "#fff",
              textDecoration: "none",
              margin: "4px",
              fontSize: "14px",
            }}
            href="#"
          >
            Top of page
          </a>
        </div>
        <div style={{ fontSize: "12px", marginTop: "10px" }}>
          Copyright © <span id="spanyear"> </span> Noor, LLC. All rights
          reserved.
        </div>
      </footer>
      </div>
    </>
  );
};

export default Page;
