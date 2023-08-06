"use client";
import React from 'react'
import styles from '../page.module.css'
import Form from '../../components/Form'
import { useEffect } from 'react';

const page = () => {
    return (
      <main className={styles.loginContainer}>
          <div className={styles.logoLeftLogo}>
            <img className={styles.logoLeftImage} src='	https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg' />
          </div>
          <div className={styles.mainRightFormContainer}>
            <Form isMain={false} isLogin={true} isSignUpPage={false}/>
          </div>
          <div className={styles.mainRightPara}>
            <h4>{`Create a Page`}</h4> <p>{` `}{`for a celebrity, brand or business.`}</p>
          </div>
      </main>
    )
}

export default page