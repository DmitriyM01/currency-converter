import React, {useState} from 'react'
import Modal from '../Modal/Modal'

export default function Header() {
  const [modalActive, setModalActive] = useState(false);
  const [isSignInModal, setIsSignInModal] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState({});

  const changeModalActive = (type) => {
    setModalActive(true);
    setIsSignInModal(type === 'signIn');
  }

  const inputStyle = {
    width: '50%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px'
  }

  const inputElStyle = {
    width: '100%',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #000',
    borderRadius: '5px',
    height: '32px',
    fontSize: '24px'
  }

  const buttonStyle = {
    padding: '10px',
    border: '1px solid #000',
    borderRadius: '5px',
    height: '48px',
    fontSize: '24px',
    cursor: 'pointer',
    width: '50%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    zIndex: '10000'
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('dawdawdaw')
    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setData(data);
      setLoggedIn(true);
      setUsername("");
      setPassword("");
      setEmail("");
      sessionStorage.setItem('auth', loggedIn);
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
    }
  };

  return (
    <>
      <header style={{overflow: 'hidden'}} className='header'>
          <span className='logo'>Converter</span>
          <div className='login-block'>
          {sessionStorage.getItem('auth') ? <span>{data.username}</span> : (
            <div>
              <button onClick={() => changeModalActive('signIn')} className='sign-in-btn'>Sign in</button>
              <button onClick={() => changeModalActive('pohuy')} className='sign-up-btn'>Sign up</button>
            </div>
          )}
          </div>
      </header>
      <Modal active={modalActive} setActive={setModalActive} >
        <form onSubmit={handleSubmit}>
          <h1 style={{textAlign: 'center', marginBottom: '20px'}}>{isSignInModal ? 'Sign in' : 'Sign up'}</h1>
            {isSignInModal ? (
              <div style={inputStyle}>
                <input onChange={(e) => setEmail(e.target.value)} value={email} style={inputElStyle} name='email' type='email' placeholder='Email' />
                <input onChange={(e) => setPassword(e.target.value)} value={password} style={inputElStyle} name='password' type='password' placeholder='Password' />
              </div>
            ) : (
              <div style={inputStyle}>
                <input onChange={(e) => setUsername(e.target.value)} value={username} style={inputElStyle} name='username' type='text' placeholder='Username' />
                <input onChange={(e) => setEmail(e.target.value)} value={email} style={inputElStyle} name='email' type='email' placeholder='Email' />
                <input onChange={(e) => setPassword(e.target.value)} value={password} style={inputElStyle} name='password' type='password' placeholder='Password' />
              </div>
            )}
            <input style={buttonStyle} type="submit" value={isSignInModal ? 'Sign in' : 'Sign up'} />
        </form>
      </Modal>
    </>
  )
}
