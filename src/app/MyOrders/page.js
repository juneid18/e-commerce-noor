'use client'
import Head from 'next/head';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';

const Page = () => {
  const [order, setOrder] = useState([]);
  const [clientdata, setClientData] = useState();
  
  useEffect(() => {
    try {
      const clientInfo = JSON.parse(Cookies.get("clientinfo"));
      setClientData(clientInfo);
    } catch (error) {
      console.log("Cookies are not set or defined yet:", error);
    }
  }, []);
  
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/finduserorder", {
          params: { userId: clientdata?.objectId }
        });
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching Cart data:", error);
      }
    };

    if (clientdata) {
      fetchOrderData();
    }
  }, [clientdata]);
  

  

  const handleDeleteItem = async (itemId) => {
    console.log(itemId);

    try {
      const response = await axios.post(
        "http://localhost:3001/deleteuserorder",
        { itemId }
      );
      console.log(itemId);
      console.log("Product deleted from the User Order successfully:");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product from User Order:", error);
    }
  };

  
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <div className={styles.shopping_cart}>
        <div className={styles.title}>
          My Orders
        </div>
        {order.map((item) => (       
          <div key={item.orderID} className={styles.item}>

            <div className={styles.image}>
              <Image src={`http://localhost:3001/uploads/${item.image}`} width={100} height={100} alt="Product Image" />
            </div>
            <div className={styles.description}>
              <span>{item.title}</span>
              <span>{item.category}</span>
            </div>

            <div className={styles.total_price}>{item.price}</div>

            <div className={styles.buttons}>
              <span className={styles.delete_btn} onClick={() => handleDeleteItem(item.orderID)}>Cancle Order</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
