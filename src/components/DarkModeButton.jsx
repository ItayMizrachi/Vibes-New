import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import React, { useState, useEffect } from 'react';

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem('darkMode')) || false
  );

  // On component mount, check if dark mode is already enabled
  useEffect(() => {
    const isDark = document.body.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  // When darkMode state changes, store it in localStorage and update body class
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? <SunIcon className='navBtn'/> : <MoonIcon className='navBtn'/>}
    </button>
  );
};

export default DarkModeButton;