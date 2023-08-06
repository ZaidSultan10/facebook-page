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
    <div style={{color:'green'}}>i am logged in successfully</div>
  )
}

export default page