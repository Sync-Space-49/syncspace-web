import React, { useState } from 'react';
import ReactSwitch from 'react-switch';

function ToggleAI() {
    const [checked, setChecked] = useState(true);
  
    const handleChange = val => {
      setChecked(val)
    }
  
    return (
      <div className="app">
        <ReactSwitch
          checked={checked}
          onChange={handleChange}
        />
      </div>
    );
  }
  
  export default ToggleAI;