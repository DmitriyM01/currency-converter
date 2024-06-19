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
  const [profileModal, setProfileModal] = useState(false);

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

    try {
      const response = await fetch(`http://localhost:3001/auth/` + (isSignInModal ? 'login' : 'register'), {
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
      sessionStorage.setItem('auth', true);
      setModalActive(false);
    } catch (error) {
      console.error(error);
      setLoggedIn(false);
      sessionStorage.setItem('auth', false);
    }
  };

  return (
    <>
      <header style={{overflow: 'hidden'}} className='header'>
          <span className='logo'>Converter</span>
          <div className='login-block'>
          {sessionStorage.getItem('auth') === 'true' ? (
            <button style={{borderRadius: '50%', outline: 'none', border: 'none', cursor: 'pointer', position: 'absolute', top: '-18px', right: '-54px'}} onClick={() => setProfileModal(true)}>
              <img style={{width: '32px', height: '32px'}} src='user.png' />
            </button>
          ) : (
            <div>
              <button onClick={() => changeModalActive('signIn')} className='sign-in-btn'>Sign in</button>
              <button onClick={() => changeModalActive('pohuy')} className='sign-up-btn'>Sign up</button>
            </div>
          )}
          </div>
      </header>

        <Modal active={modalActive} setActive={setModalActive}>
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

      {sessionStorage.getItem('auth') === 'true' && (
        <Modal active={profileModal} setActive={setProfileModal}>
          <div style={{display: 'flex', flexDirection: 'column', height: '300px'}}>
            <h2 style={{marginBottom: '20px', fontSize: '32px'}}>name: {data.username}</h2>
            <h2 style={{marginBottom: '20px', fontSize: '32px'}}>email: {data.email}</h2>
            <button style={{width: '100%', height: '48px', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer', fontSize: '32px'}} onClick={() => {setProfileModal(false); setLoggedIn(false); sessionStorage.setItem('auth', false)}}>Log out</button>
          </div>
        </Modal>
      )}
    </>
  )
}
