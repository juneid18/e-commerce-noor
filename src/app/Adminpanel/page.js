'use client'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


const Page = () => {
    const router = useRouter();
const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    try {
      const storedAdminLogged = Cookies.get("adminlogged");
      setIsLoggedIn(storedAdminLogged);
    } catch (error) {
      console.log("Cookies is not set or defined yet !!", error);
    }
  }, []);
  useEffect(() => {
    if (isLoggedIn === false || isLoggedIn === undefined) {
      // Redirect or display message indicating the user needs to log in
      router.push('/AdminLogin');
    }else{
      router.push('/Adminpanel/Dashboard');
    }
  }, [isLoggedIn,router]);
  console.log(isLoggedIn);
  return (
    <div>
    {isLoggedIn ? (
        <h3>Login Checking!</h3>
      ) : (
        <h3>You are not logged in.</h3>
    )}
    </div>
  )
}

export default Page