import React, { useState, useEffect } from 'react';
import { TextField, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'


const INITIAL_INPUT1 = 4000;
const INITIAL_INPUT2 = 20;

const Main = () => {
  const [input1, setInput1] = useState(INITIAL_INPUT1);
  const [input2, setInput2] = useState(INITIAL_INPUT2);
  const [result, setResult] = useState(null);


  const calculateResult = () => {
    const base_st = parseFloat(input1);
    const num2 = parseFloat(input2);
    
    if ((!isNaN(base_st)) && !isNaN(num2)) {
      const sum = base_st + num2;
      setResult(sum);
    } else {
      setResult('Пожалуйста, введите все обязательные поля или проверьте корректность ввода');
    }
  };

  useEffect(() => {
    calculateResult();
  }, [input1, input2]);

  return (
    <div>
      <Navbar />
      <Typography variant="h4" gutterBottom>
        Калькулятор
      </Typography>
      <TextField
        label="Базовая ставка "
        type="number"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Второе число"
        type="number"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
        margin="normal"
      />
      {result !== null && (
        <Typography variant="h6" gutterBottom style={{ marginTop: '16px' }}>
          Результат: {result}
        </Typography>
      )}
    </div>
  );
};



export default Main;