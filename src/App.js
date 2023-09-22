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
        style={{backgroundColor: buttonColor}} 
        onClick={()=> setButtonColor(newButtonColor)}
        disabled={checked}
      >
        Change to {newButtonColor}
      </button>
      <input type="checkbox" value={checked} onClick={()=> setChecked(!checked)}/>
    </>
  );
}

export default App;
