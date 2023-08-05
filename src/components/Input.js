import React from 'react'

const Input = ({type, inputClass, handleChange, value, placeholder, field}) => {
  return (
    <input type={type} className={inputClass} onChange={(e) => handleChange(e, field)} value={value} placeholder={placeholder} />
  )
}

export default Input