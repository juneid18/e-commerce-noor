"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter();
    router.push("./Home")
  return (
    <>
        Redirecting To Home Page ..
    </>
  )
}

export default Page