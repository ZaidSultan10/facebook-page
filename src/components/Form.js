import React ,{useState}from 'react'
import Input from './Input'
import Button from './Button'
import style from '../app/page.module.css'
import { useRouter } from 'next/navigation'

const Form = ({isLogin, isSignUpPage, isMain}) => {

    
    const [emailInput, setEmailInput] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('Male')
    const [notValidEmail, setNotValidEmail] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    
    const router = useRouter();

    const handleClick = (route) => {
        if(route === 'signUpRoute'){
            setIsSubmit(false)
            setErrorMessage('')
            router.push('/signup')
        } else if(route == 'signuproute'){
            if((!emailInput || !password || !firstName || !lastName || !dob || !gender)){
                setErrorMessage('Please fill all details')
            } else if(password && firstName && lastName && dob && gender && emailInput && emailInput.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
                setIsSubmit(false)
                setNotValidEmail(false)
                setErrorMessage('')
                router.push('/signup-success')
            } else {
                setIsSubmit(true)
                setNotValidEmail(true)
            }
        } else if(route == 'loginRoute'){
            if((!emailInput && !password)){
                setIsSubmit(false)
                setNotValidEmail(false)
                router.push('/login')
            } else if(emailInput && password && emailInput.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
                setIsSubmit(false)
                setNotValidEmail(false)
                router.push('/login-success')
            } else if(!emailInput || !password){
                setErrorMessage('Please fill all details')
            } else {
                setIsSubmit(true)
                setNotValidEmail(true)
            }
        }
    }

    const handleChange = (e, field) => {
        e.preventDefault()
        if(field == 'email'){
            setEmailInput(e.target.value)
            if(notValidEmail && e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
                setNotValidEmail(false)
            }else if(isSubmit){
                setNotValidEmail(true)
            }
        } else if(field=='password'){
            setPassword(e.target.value)
        } else if(field =='firstname'){
            setFirstName(e.target.value)
        } else if(field == 'lastname'){
            setLastName(e.target.value)
        } else if(field =='dob'){
            setDob(e.target.value)
        } else if(field == 'gender'){
            setGender(e.target.value)
        }
    }

  return (
    <section className={style.formContainer}>
        {isLogin && (
            <p className={style.loginHeading}>{`Login Into Facebook`}</p>
        )}
        {isSignUpPage && (
            <>
            <div className={style.signupHeading}>
                <h3>{`Create a new account`}</h3>
                <p>{`Its quick and easy`}</p>
                <hr className={style.lineBreak}/>
            </div>
            <div className={style.nameContainer}>
                <input style={{width: '100%', outline: 'none', borderRadius: '6px',border: '1px solid #dddfe2',padding: '12px 12px',fontSize: '14px',margin: '0 8px 12px 0px'}} type={`text`} value={firstName} onChange={(e)=> handleChange(e,'firstname')} placeholder={`First Name`}/>
                <input style={{width: '100%', outline: 'none', borderRadius: '6px',border: '1px solid #dddfe2',padding: '12px 12px',fontSize: '14px',margin: '0 0px 12px 8px'}} type={`text`} value={lastName} onChange={(e)=> handleChange(e,'lastname')} placeholder={`Last Name`}/>
            </div>
            </>
        )}
        <Input inputClass={notValidEmail ? style.inValidInput : isSignUpPage ? style.signupInputs : style.input} field={`email`} type={`text`} value={emailInput} handleChange={handleChange} placeholder={`Email or Phone number`}/>
        <Input inputClass={isSignUpPage ? style.signupInputs : style.input} field={`password`} type={`password`} value={password} handleChange={handleChange} placeholder={isSignUpPage ? `New Password` : `Password`}/>
        {isSignUpPage && (
            <>
            <div className={style.dobContainer}>
                <div className={style.signUpBirthday}>
                    <p>{`Birthday`}</p>
                    <p className={style.icon}>{`?`}</p>
                </div>
                <div className={style.dobOptionContainer}>
                    <select onChange={(e) => handleChange(e,'dob')} style={{width: '100%', outline: 'none', borderRadius: '6px',border: '1px solid #dddfe2',padding: '12px 12px',fontSize: '14px',margin: '0 8px 12px 0px'}}>
                        <option>{`Select...`}</option>
                        <option>{`Jan`}</option>
                    </select>
                    <select onChange={(e) => handleChange(e,'dob')} style={{width: '100%', outline: 'none', borderRadius: '6px',border: '1px solid #dddfe2',padding: '12px 12px',fontSize: '14px',margin: '0 8px 12px 0px'}}>
                        <option>{`Select...`}</option>
                        <option>{`1`}</option>
                    </select>
                    <select onChange={(e) => handleChange(e,'dob')} style={{width: '100%', outline: 'none', borderRadius: '6px',border: '1px solid #dddfe2',padding: '12px 12px',fontSize: '14px',margin: '0 8px 12px 0px'}}>
                        <option>{`Select...`}</option>
                        <option>{`2000`}</option>
                    </select>
                    {/* <input style={{width: '100%', outline: 'none', borderRadius: '6px',border: '1px solid #dddfe2',padding: '12px 12px',fontSize: '14px',margin: '0 8px 12px 0px'}} type={`text`} value={firstName} handleChange={(e)=> handleChange(e,'firstname')} placeholder={`First Name`}/>
                    <input style={{width: '100%', outline: 'none', borderRadius: '6px',border: '1px solid #dddfe2',padding: '12px 12px',fontSize: '14px',margin: '0 0px 12px 8px'}} type={`text`} value={lastName} handleChange={(e)=> handleChange(e,'lastname')} placeholder={`Last Name`}/> */}
                </div>
            </div>
            <div className={style.dobContainer}>
                <div className={style.signUpBirthday}>
                    <p>{`Gender`}</p>
                    <p className={style.icon}>{`?`}</p>
                </div>
                <div className={style.genderSignupOptionContainer}>
                    <div className={style.genderSignup}>
                        <label htmlFor='Male'>Male</label>
                        <input id='Male' type={`radio`} name='gender' value={gender} handleChange={(e)=> handleChange(e,'gender')}/>
                    </div>
                    <div style={{margin: '0 8px'}} className={style.genderSignup}>
                        <label htmlFor='Female'>Female</label>
                        <input id='Female' name='gender' type={`radio`} value={gender} handleChange={(e)=> handleChange(e,'gender')}/>
                    </div>
                    <div className={style.genderSignup}>
                        <label htmlFor='Others'>Others</label>
                        <input id='Others' name='gender' type={`radio`} value={gender} handleChange={(e)=> handleChange(e,'gender')}/>
                    </div>
                </div>
                <div className={style.signupPara}>
                    <p>{`People who use our service may have uploaded your contact information to Facebook. Learn more.`}</p>
                </div>
                <div className={style.signupPara}>
                    <p>{`By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.`}</p>
                </div>
            </div>
            </>
        )}
        <Button buttonClass={isSignUpPage ? style.createAccountbutton : style.loginButton} handleClick={() => handleClick(isSignUpPage ? `signuproute` : 'loginRoute')} title={isSignUpPage ? `Sign Up` : `Login`} />
        <p style={{marginBottom:isLogin ? '16px' : '0'}} className={style.forgotPasswordPara}>{isSignUpPage ? `Already have an account?` : `Forgot Password?`}</p>
        {isMain && (
            <>
                <hr className={style.lineBreak}/>
                <Button buttonClass={style.createAccountbutton} handleClick={() => handleClick('signUpRoute')} title={`Create Account`} />
            </>
        )}
        {(notValidEmail || errorMessage) && <p className={style.error}>{errorMessage || (`The email or mobile number you entered isn’t connected to an account.`(<h4 className={style.errorLink}>{`Find your account and log in.`}</h4>))}</p>}
    </section>
  )
}

export default Form