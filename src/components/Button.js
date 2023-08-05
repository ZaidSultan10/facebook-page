import React from 'react'

const Button = ({handleClick, buttonClass, title}) => {
  return (
    <button onClick={handleClick} className={buttonClass}>{title}</button>
  )
}

export default Button