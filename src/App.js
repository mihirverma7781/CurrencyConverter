import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [ fromCurrency, setFromCurrency ] = useState();
  const [ toCurrency, setToCurrency ] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  // console.log(exchangeRate)

  let toAmount, fromAmount

  if(amountInFromCurrency){
    fromAmount=amount
    toAmount=amount*exchangeRate
  }
  else{
    toAmount=  amount
    fromAmount=amount/exchangeRate 
  }
useEffect(() => {
if(fromCurrency!=null &&toCurrency!=null){
  fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
  .then(res=>res.json())
  .then(data=>setExchangeRate(data.rates[toCurrency]) )

}
}, [fromCurrency,toCurrency])
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency])
      });
  }, []);

  function handleFromAmountChange(e){
setAmount(e.target.value)
setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e) {
setAmount(e.target.value)
setAmountInFromCurrency(false)
  }
  return (
    <>
    <div className="box">
      <h1><text className="name">Cu</text>rrency</h1>
      <h1 className="head"><text className="colored big">Co</text><text className="big">nvertor</text></h1>
      <CurrencyRow
       currencyOptions={currencyOptions}
       selectedCurrency={fromCurrency}
       onChangeCurrency={e=> setFromCurrency(e.target.value)}
       amount={fromAmount}
       onChangeAmount={handleFromAmountChange}
      />
      <br/>
      <div></div>
      <br/>
      <CurrencyRow 
      currencyOptions={currencyOptions}
      selectedCurrency={toCurrency}
      onChangeCurrency={e=> setFromCurrency(e.target.value)}
      amount={toAmount}
      onChangeAmount={handleToAmountChange}

      />
      </div>
    </>
  );
}

export default App;
