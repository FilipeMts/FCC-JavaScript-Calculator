import React, { useState } from 'react';
import './App.scss';

const App = () => {
  const [calculator, setState] = useState({
    input: '0',
    output: ''
  });

  const handleClick = e => {
    const { id, value } = e.target;

    switch(id) {
      case 'zero':
      case 'one':
      case 'two':
      case 'three':
      case 'four':
      case 'five':
      case 'six':
      case 'seven':
      case 'eight':
      case 'nine':
        handleNumber(value);
        break;
      case 'decimal':
        handleDecimal();
        break;
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
        handleOperators(value);
        break;
      case 'equals':
        handleCalculation();
        break;  
      case 'clear':
        handleResetCalculator();
        break;    
      default:
        return;
    };
  };

  const handleNumber = num => {
    const { input } = calculator;

    setState({
      ...calculator,
      input: input !== '0' ? `${input}${num}` : num,
    });
  };

  const handleOperators = operator => {
    const { input, output } = calculator;

    if (/[+\-*/]/.test(input)) {
      if (/[+\-*/]/.test(input[input.length -1])) {
        if (operator !== '-') {
          setState({
            ...calculator,
            input: operator,
          })
        } 
        else if (!/-/.test(input)) {
          setState({
            ...calculator,
            input: `${input}${operator}`
          })
        }
      } 
      else {
        setState({
          ...calculator,
          input: operator,
          output: Math.round(eval(`${output}${input}`) * 10000) / 10000,
        })
      }
    } 
    else {
      setState({
        ...calculator,
        input: operator,
        output: input,
      })
    };
  };


  const handleDecimal = () => {
    const { input } = calculator;   

    if (!/\./.test(input)) {
      setState({
        ...calculator,
        input: `${input}.`
      })
    };
  };
  
  const handleCalculation = () => {
    const { input, output } = calculator;

    if (!/[+\-*/]/.test(input[input.length -1])) {
      setState({
        ...calculator,
        input:  Math.round(eval(`${output}${input}`) * 10000) / 10000,
        output: '',
      })
    };
  };

  const handleResetCalculator = () => {
    setState({
      ...calculator,
      input: '0',
      output: '',
    });
  };

  return (
    <div className="App">
      <div className="calculator">
        <div id="display">
          <div className='input-history'>{calculator.output}</div>        
          <h3 className='input-display'>{calculator.input}</h3>          
        </div>
        <div className="pad">
          <div className="top-row">
            <button id="clear" onClick={() => handleResetCalculator()}>C</button>            
            <button id="add" value="+" onClick={e => handleClick(e)}>+</button>            
          </div>
          <div className="middle-row">
            <div className="middle-row-top">
              <button id="seven" value="7" onClick={e => handleClick(e)}>7</button>
              <button id="eight" value="8" onClick={e => handleClick(e)}>8</button>
              <button id="nine" value="9" onClick={e => handleClick(e)}>9</button>
              <button id="subtract" value="-" onClick={e => handleClick(e)}>-</button>              
            </div>
            <div className="middle-row-center">
              <button id="four" value="4" onClick={e => handleClick(e)}>4</button>
              <button id="five" value="5" onClick={e => handleClick(e)}>5</button>
              <button id="six" value="6" onClick={e => handleClick(e)}>6</button>
              <button id="multiply" value="*" onClick={e => handleClick(e)}>x</button>
            </div>
            <div className="middle-row-bottom">
              <button id="one" value="1" onClick={e => handleClick(e)}>1</button>
              <button id="two" value="2" onClick={e => handleClick(e)}>2</button>
              <button id="three" value="3" onClick={e => handleClick(e)}>3</button>
              <button id="divide" value="/" onClick={e => handleClick(e)}>/</button>
            </div>            
          </div>
          <div className="bottom-row">
          <button id="zero" value="0" onClick={e => handleClick(e)}>0</button> 
          <button id="decimal"  value="." onClick={e => handleClick(e)}>.</button>         
          <button id="equals" value="=" onClick={e => handleClick(e)}>=</button></div>        
        </div>      
      </div>  
      <div className="code">
      <a href="/" target="_blank" rel="noopener noreferrer">code is available here</a>
    </div>    
    </div>
  );
};

export default App;
