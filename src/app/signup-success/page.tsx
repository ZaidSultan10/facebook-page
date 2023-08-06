"use client";
import React from 'react'
import { useEffect } from 'react';

const page = () => {
  if (typeof window !== 'undefined'){
    return (
      <div>{`Thank you!. You have successfully created your account`}</div>
    )
  }
}

export default page