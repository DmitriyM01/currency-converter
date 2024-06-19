import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import React, { useState, useEffect } from 'react';

function App() {
  const [currentValute, setCurrentValute] = useState('USD');
  const [currentValue, setCurrentValue] = useState(1);
  const [countValute, setCountValute] = useState(1);
  const [convertedValute, setConvertedValute] = useState('EUR');
  const [currentPairConvertation, setCurrentPairConvertation] = useState(0);
  const [supportedCodes, setSupportedCodes] = useState([]);

  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/9b90c864809809361d5df968/codes')
      .then(res => res.json())
      .then(
        (result) => {
          setSupportedCodes(result);
        },
      )
  }, []);

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/9b90c864809809361d5df968/pair/${currentValute}/${convertedValute}`)
      .then(res => res.json())
      .then(
        (result) => {
          setCurrentPairConvertation(result.conversion_rate.toFixed(2));
        },
      )
  }, []);

  const changeCurrentValute = (valute) => {
    fetch(`https://v6.exchangerate-api.com/v6/9b90c864809809361d5df968/pair/${valute}/${convertedValute}`)
      .then(res => res.json())
      .then(
        (result) => {
          setCurrentValute(valute);
          setCurrentPairConvertation(result.conversion_rate.toFixed(2));
        },
      )
  };

  const changeConvertedValute = (valute) => {
    fetch(`https://v6.exchangerate-api.com/v6/9b90c864809809361d5df968/pair/${currentValute}/${valute}`)
      .then(res => res.json())
      .then(
        (result) => {
          setConvertedValute(valute);
          setCurrentPairConvertation(result.conversion_rate.toFixed(2));
        },
      )
  }
  
  return (
    <div className='wrapper'>
      <Header />
      <Main 
        currentValute={currentValute}
        currentValue={currentValue}
        convertedValute={convertedValute}
        countValute={countValute}
        currentPairConvertation={currentPairConvertation}
        setCurrentValute={changeCurrentValute}
        setConvertedValute={changeConvertedValute}
        setCountValute={setCountValute}
        setCurrentPairConvertation={setCurrentPairConvertation}
        allValutes={supportedCodes}
      />
      <Footer />
    </div>
  )
}

export default App;
