'use client';
import React from 'react'
import { useEffect } from 'react';
import Form from '../components/Form'
import styles from './page.module.css'

export default function Home() {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(window.innerWidth);
      console.log(window.innerHeight);
    }
  }, [])
  return (
    <main className={styles.main}>
      <div className={styles.mainLeft}>
        <div className={styles.mainLeftLogo}>
          <img className={styles.mainLeftImage} src='	https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg' />
        </div>
        <div className={styles.mainLeftText}>
          <p>{`Connect with friends and the world around you on Facebook.`}</p>
        </div>
      </div>
      <div className={styles.mainRight}>
        <div className={styles.mainRightFormContainer}>
          <Form isMain={true} isLogin={false} isSignUpPage={false}/>
        </div>
        <div className={styles.mainRightPara}>
          <h4>{`Create a Page`}</h4> <p>{` `}{`for a celebrity, brand or business.`}</p>
        </div>
      </div>
    </main>
  )
}
