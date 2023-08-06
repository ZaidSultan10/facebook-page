"use client";
import React from 'react'
import styles from '../page.module.css'
import Form from '../../components/Form'
import { useEffect } from 'react';

const page = () => {
  // useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(window.innerWidth);
      console.log(window.innerHeight);
    }
  // }, [])
  return (
    <main>
        <div className={styles.logoLeftLogo}>
          <img className={styles.logoLeftImage} src='	https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg' />
        </div>
        <div className={styles.mainRightFormContainer}>
          <Form isMain={false} isLogin={false} isSignUpPage={true}/>
        </div>
    </main>
  )
}

export default page