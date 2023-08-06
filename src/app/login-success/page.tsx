"use client";
import React from 'react'
import { useEffect } from 'react';

const page = () => {
  if (typeof window !== 'undefined'){
    return (
      <div style={{color:'green'}}>i am logged in successfully</div>
    )
  }
}

export default page