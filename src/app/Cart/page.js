'use client'
import Head from 'next/head';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';

const Page = () => {
  const [cart, setCart] = useState([]);
  const [clientdata, setClientData] = useState();
  
  useEffect(() => {
    try {
      const clientInfo = JSON.parse(Cookies.get("clientinfo"));
      setClientData(clientInfo);
      
      const fetchCartData = async () => {
        try {
          const response = await axios.get("http://localhost:3001/findcart", {
            params: { userId: clientInfo?.objectId }
          });
          setCart(response.data);
        } catch (error) {
          console.error("Error fetching Cart data:", error);
        }
      };
      
      if (clientInfo) {
        fetchCartData();
      }
    } catch (error) {
      console.log("Cookies are not set or defined yet:", error);
    }
  }, [clientdata]);
  
  const handleDeleteItem = async (itemId) => {
    console.log(itemId);

    try {
      const response = await axios.post(
        "http://localhost:3001/deletecart",
        { itemId }
      );
      console.log(itemId);
      console.log("Product deleted from the cart successfully:");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };

  
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <div className={styles.main}>

      <div className={styles.shopping_cart}>
        <div className={styles.title}>
          Shopping Bag
        </div>
        {Array.isArray(cart)
        ? cart.map((item) => (       
          <div key={item.cartID} className={styles.item}>

            <div className={styles.image}>
              <Image src={`http://localhost:3001/uploads/${item.image}`} width={100} height={100} alt="Product Image" />
            </div>
            <div className={styles.description}>
              <span>{item.title}</span>
              <span>{item.category}</span>
            </div>

            <div className={styles.total_price}>{item.price}</div>

            <div className={styles.buttons}>
              <span className={styles.delete_btn} onClick={() => handleDeleteItem(item.cartID)}>Remove</span>
              <Link className={styles.like_btn} href={{
                pathname: 'Detail/Order',
                query: {
                  ID: item.cartID,
                  title: item.title,
                  image: item.image,
                  detail: item.detail,
                  price: item.price
                }
              }}>Order</Link>
            </div>
          </div>
        )): <h1>Error</h1>}
      </div>
      </div>
    </>
  );
};

export default Page;
