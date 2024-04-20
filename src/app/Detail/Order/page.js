"use client";
import React, { useEffect, useState } from "react";
import styles from './page.module.css';
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";

const Page = ({ searchParams }) => {
  const router = useRouter();
  const [clientdata, setclientdata] = useState();
  useEffect(() => {
    try {
      setclientdata(JSON.parse(Cookies.get("clientinfo")));
    } catch (error) {
      console.log("Cookies is not set or defiend yet !!", error);
    }
  }, []);

  const userId = clientdata?.objectId;
  const [data, setdata] = useState({
    orderId: searchParams.orderId,
    title: searchParams.title,
    price: searchParams.price,
    image: searchParams.image,
    name: "",
    email: "",
    address: "",
    city: "",
    quantity: "",
    zipcode: "",
    userId: "",
  });
  useEffect(() => {
    if (clientdata) {
      setdata({ ...data, userId: userId });
    } else {
      setdata({ ...data, userId: 'undefined' });
    }
  }, [clientdata,userId,data]);
  const OrderHandler = async (e) => {
    e.preventDefault();
    if (!data) {
      alert("fill the fields ");
    } else {
      try {
        console.log("Data being sent:", data);
        const response = await axios.post("http://localhost:3001/order", data);
        console.log("Form submitted successfully", response.data);
        if (response.data.redirectTo) {
          document.getElementById("show").style.display = "block";
          console.log(data);
        } else {
          console.log("Form submitted successfully", response.data);
        }
      } catch (error) {
        console.log("Erro while handling Orders: ", error);
      }
    }
  };

  // Define your form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // Add your form submission logic here
  };

  const gotohome = () => {
    router.push('../Home')
  }
  return (
    <>
  <div id="show" className={styles.hidden}>
  <div className={styles.alertmain}>
  <div class={styles.subcontainer}>
    <div class={styles.success_message}>
      <h2 className={styles.h2}>Your Order Has Been successfully!</h2>
      <button onClick={gotohome}>Go to Home</button>
    </div>
  </div>
  </div>
    </div>

      <div method="POST" onSubmit={handleSubmit} >
        <div className={styles.main}>
          <div className={styles.left_container} >
            <div className={styles.container}>
              <h1 className={styles.h1}>Checkout</h1>
              <form id={styles.check_out_form}>
                <h2 className={styles.h2}>Billing Address</h2>
                <input className={styles.input}
                  type="hidden"
                  name="productID"
                  value={searchParams.orderId}
                />
                <input className={styles.input}
                  type="hidden"
                  name="productName"
                  value={searchParams.title}
                />
                <input className={styles.input}
                  type="hidden"
                  name="productPrice"
                  value={searchParams.price}
                />

                <label htmlFor="name">Full Name</label>
                <input className={styles.input}
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => setdata({ ...data, name: e.target.value })}
                  required
                />

                <label htmlFor="email">Email Address</label>
                <input className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setdata({ ...data, email: e.target.value })}
                  required
                />

                <label htmlFor="address">Address</label>
                <input className={styles.input}
                  type="text"
                  id="address"
                  name="address"
                  onChange={(e) =>
                    setdata({ ...data, address: e.target.value })
                  }
                  required
                />

                <label htmlFor="city">City</label>
                <input className={styles.input}
                  type="text"
                  id="city"
                  name="city"
                  onChange={(e) => setdata({ ...data, city: e.target.value })}
                  required
                />

                <label className={styles.lable} htmlFor="quantity">Quantity</label>
                <select className={styles.select}
                  name="quantity"
                  onChange={(e) =>
                    setdata({ ...data, quantity: e.target.value })
                  }
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>

                <label htmlFor="zip">Zip Code</label>
                <input className={styles.input}
                  type="text"
                  id="zip"
                  name="zip"
                  onChange={(e) =>
                    setdata({ ...data, zipcode: e.target.value })
                  }
                  required
                />
                  <button className={styles.button} onClick={OrderHandler}>Order Now</button>
              </form>
            </div>
          </div>
          <div className={styles.right_container}>
            <div className={styles.card}>
              <Image
              width={300}
              height={200}
                src={`http://localhost:3001/uploads/${searchParams.image}`}
                alt={searchParams.title}
              />
              <h1 className={styles.h1}>{searchParams.title}</h1>
              <p className={styles.price}>RS. {searchParams.price}</p>
              <p>
                <b>Details:</b> {searchParams.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
