import { RiDropdownList } from "react-icons/ri"

export default function ConvertBox({currentPairConvertation, countValute, setCountValute, currentValute, allValutes, setCurrentValute, className}) {
    return (
      <div className={className}>
        <select className="currency" value={currentValute} onChange={(e) => setCurrentValute(e.target.value)}>
          {allValutes.result === 'success' &&
            allValutes.supported_codes.map((currency) => {
              return <option value={currency[0]}>{currency[0]}</option>
            })
          }
        </select>
        <div className="count-money-box">
          {setCountValute !== undefined 
            ? <input defaultValue={1} onChange={({target: {value}}) => setCountValute(value)} className="count-money"></input>
            : <input disabled className="count-money" value={(countValute * currentPairConvertation).toFixed(2)}></input>
          }
        </div>
      </div>
    )
}
