import React from 'react'

export default function Header() {
  return (
    <header className='header'>
        <span className='logo'>Converter</span>
        <div className='login-block'>
          <button className='sign-in-btn'>Sign in</button>
          <button className='sign-up-btn'>Sign up</button>
        </div>
    </header>
  )
}
