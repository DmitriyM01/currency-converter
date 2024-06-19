import React from 'react';
import { SiConvertio } from "react-icons/si";
import ConvertBox from './ConvertBox.jsx';

export default function Main(props) {
  return (
    <main className='main'>
      <div className='main-text'>
        <h1>Currency Converter</h1>
        <p>Choose a currency for input and output and convert them.</p>
      </div>
      <div className='convert-box'>

        <div className="amount-box">
          <p className='amount-text'>Amount</p>
        </div>

        <ConvertBox className={'current-convert-box'} setCountValute={props.setCountValute} currentValute={props.currentValute} setCurrentValute={props.setCurrentValute} allValutes={props.allValutes} />

        <div className='line-between-currency'><SiConvertio className='convert-btn'/></div>

        <div className="converted-amount-box">
          <p className='converted-amount-text'>Converted Amount</p>
        </div>

        <ConvertBox className={'converted-convert-box'} currentPairConvertation={props.currentPairConvertation} countValute={props.countValute} currentValute={props.convertedValute} setCurrentValute={props.setConvertedValute} allValutes={props.allValutes} />

      </div>
      <div className='result-box'>
        <h3 className='result-desc'>Indicative Exchange Rate</h3>
        <div className='result-text'><h2>{`1 ${props.currentValute} = ${props.currentPairConvertation} ${props.convertedValute}`}</h2></div>
      </div>
    </main>
  )
}
