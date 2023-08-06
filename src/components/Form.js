import React ,{useState}from 'react'
import Input from './Input'
import Button from './Button'
import style from '../app/page.module.css'
import { useRouter } from 'next/navigation'
import moment from 'moment'
import {addDoc, collection, getDoc, getDocs, doc,query,where} from 'firebase/firestore'
import {db} from '../app/firebaseConfig'

const Form = ({isLogin, isSignUpPage, isMain}) => {

    
    const [emailInput, setEmailInput] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dobDate, setDobDate] = useState(moment().format('DD'))
    const [dobMonth, setDobMonth] = useState(moment().format('MMM'))
    const [dobYear, setDobYear] = useState(moment().year())
    const [gender, setGender] = useState('Male')
    const [notValidEmail, setNotValidEmail] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    
    const router = useRouter();

    const sendDataToDob = async (user) => {
        const userCollectionRef = collection(db, 'users')
        if(user && await checkAccountExistance(user?.email)){
            setErrorMessage(``)
            await addDoc(userCollectionRef, user)
            router.push('/signup-success')
        } else{
            setErrorMessage(`Email already exists`)
        }
    }

    const checkAccountExistance = async (email) => {
        let getUsers = []
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            getUsers.push(doc.data())
          });
        return getUsers.length > 0 ? false : true
    }

    const validLogin = async(data) => {
        let getUsers = []
        const q = query(collection(db, "users"), where("email", "==", data.email), where("password", "==", data.password));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            getUsers.push(doc.data())
          });
        return getUsers.length > 0 ? true : false
    }

    const handleClick = async (route) => {
        if(route === 'signUpRoute'){
            setIsSubmit(false)
            setErrorMessage('')
            router.push('/signup')
        } else if(route == 'signuproute'){
            if((!emailInput || !password || !firstName || !lastName || !dobDate || !dobMonth || !dobYear || !gender)){
                setErrorMessage('Please fill all details')
            } else if(password && firstName && lastName && dobDate && dobMonth && dobYear && gender && emailInput && emailInput.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
                const userCreated = await sendDataToDob({firstName, lastName, email: emailInput, password, dateOfBirth: `${dobDate}/${dobMonth}/${dobYear}`,gender}, `signup`)
                if(userCreated){
                    setIsSubmit(false)
                    setNotValidEmail(false)
                    setErrorMessage('')
                }
            } else {
                setIsSubmit(true)
                setNotValidEmail(true)
                setErrorMessage('')
            }
        } else if(route == 'loginRoute'){
            if((!emailInput && !password)){
                setIsSubmit(false)
                setNotValidEmail(false)
                router.push('/login')
            } else if(emailInput && password && emailInput.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
                const isValid = await validLogin({email: emailInput, password})
                if(isValid){
                    setIsSubmit(false)
                    setNotValidEmail(false)
                    router.push('/login-success')
                } else{
                    setErrorMessage('Invalid credentials')
                }
            } else if(!emailInput || !password){
                setErrorMessage('Please fill all details')
            } else {
                setIsSubmit(true)
                setNotValidEmail(true)
                setErrorMessage('')
            }
        }
    }

    const handleChange = (e, field) => {
        e.preventDefault()
        if(field == 'email'){
            setEmailInput(e.target.value)
            if(notValidEmail && e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)){
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
        } else if(field =='dobdate'){
            setDobDate(e.target.value)
        } else if(field =='dobmonth'){
            setDobMonth(e.target.value)
        } else if(field =='dobyear'){
            setDobYear(e.target.value)
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
                    <select onChange={(e) => handleChange(e,'dobdate')} value={dobDate} style={{width: '100%', outline: 'none', borderRadius: '6px',border: '1px solid #dddfe2',padding: '12px 12px',fontSize: '14px',margin: '0 8px 12px 0px'}}>
                        {[...Array(moment(`${dobYear}-${dobMonth}`, "YYYY-MMM").daysInMonth())]?.map((item, i) => (
                            <option key={i}>{i+1}</option>
                        ))}
                    </select>
                    <select onChange={(e) => handleChange(e,'dobmonth')} value={dobMonth} style={{width: '100%', outline: 'none', borderRadius: '6px',border: '1px solid #dddfe2',padding: '12px 12px',fontSize: '14px',margin: '0 8px 12px 0px'}}>
                        {moment.monthsShort()?.map(item => (
                            <option key={item}>{item}</option>
                        ))}
                    </select>
                    <select onChange={(e) => handleChange(e,'dobyear')} value={dobYear} style={{width: '100%', outline: 'none', borderRadius: '6px',border: '1px solid #dddfe2',padding: '12px 12px',fontSize: '14px',margin: '0 8px 12px 0px'}}>
                        {[...Array(moment().diff('1923-01-01', 'years'))]?.map((item, i) => (
                            <option key={i}>{i+1924}</option>
                        ))}
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
        {(notValidEmail || errorMessage) && <p className={style.error}>{errorMessage ? errorMessage : `Invalid email`}</p>}
    </section>
  )
}

export default Form