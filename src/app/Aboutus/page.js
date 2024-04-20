'use client'
import React from 'react'
import Head from 'next/head'
import './style.css'
import Image from 'next/image'

const page = () => {
  return (
    <>
    <Head>
  <title>About us</title>
    </Head>

    <div className="container">
  <div className="contentLeft">
    <div className="row">
        <div className="imgWrapper">
            <Image width={200} height={200} src="/images/m1.jpg" alt="" />
        </div>
        <div className="imgWrapper">
            <Image width={200} height={200} src="/images/m2.webp" alt=""/>
        </div>
        <div className="imgWrapper">
            <Image width={200} height={200} src="/images/m3.webp" alt=""/>
        </div>
        <div className="imgWrapper">
            <Image width={200} height={200} src="/images/m4.avif" alt=""/>
        </div>
    </div>
  </div>
  <div className="contentRight">
    <div className="content">
      <h4>Welcome To</h4>
      <h2>About Us ...</h2>
      <p>Discover our exquisite online bag store, curated by the talented trio of Juneid Shaikh, Abid Attar, and Krish Udhani. Offering a diverse range of stylish bags, our platform ensures a seamless shopping experience. From trendy backpacks to elegant handbags, we cater to all tastes and preferences. Explore our collection today and find the perfect accessory to elevate your look.
</p>
      <a href="#">Read More...</a>
    </div>
  </div>
</div>
    </>
  )
}

export default page