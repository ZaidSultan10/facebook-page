"use client";
import React from 'react'
import { useEffect } from 'react';

const page = () => {
  // useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(window.innerWidth);
      console.log(window.innerHeight);
    }
  // }, [])
  return (
    <div>{`Thank you!. You have successfully created your account`}</div>
  )
}

export default page