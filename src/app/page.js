"use client"
import React, { useEffect } from 'react'

const Page = () => {
  useEffect(() => {
    window.location.href = '/Home'; 
  }, [])
  
  return (
    <div>
        Redirecting To Home Page ..
    </div>
  )
}

export default Page