import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [buttonColor, setButtonColor] = useState('red');
  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';

  const [checked, setChecked] = useState(false)

  return (
    <>
      <button 
        style={ checked ? {backgroundColor: 'grey'} : {backgroundColor: buttonColor} } 
        onClick={()=> setButtonColor(newButtonColor)}
        disabled={checked}
      >
        Change to {newButtonColor}
      </button>
      
      <input type="checkbox" value={checked} onClick={()=> setChecked(!checked)} id="disabled-button-checkbox"/>
      <label htmlFor="disabled-button-checkbox">Disable button</label>
    </>
  );
}

export default App;
