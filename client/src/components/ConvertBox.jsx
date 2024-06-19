
export default function ConvertBox({currentPairConvertation, countValute, setCountValute, currentValute, allValutes, setCurrentValute, className}) {
    return (
      <div className={className}>
        <div className="currency-img"><img src="" alt="" /></div>
        <select className="currency" value={currentValute} onChange={(e) => setCurrentValute(e.target.value)}>
          {allValutes.result === 'success' &&
            allValutes.supported_codes.map((currency) => {
              return <option value={currency[0]}>{currency[0]}</option>
            })
          }
        </select>
        <div className="count-money-box">
          {setCountValute !== undefined ?
            <input onChange={({target: {value}}) => setCountValute(value)} className="count-money"></input>
            : <div>{countValute * currentPairConvertation}</div>
          }
            {/* <input onChange={({target: {value}}) => setCountValute(value)} className="count-money"></input> */}
        </div>
      </div>
    )
}
