import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className='flex relative bg-neutral-700 rounded-lg mt-4 mb-4 text-neutral-900 z-10 dark:text-slate-50 items-center justify-between p-5'>
        <Link to="/" className='text-xl font-semibold '>Losa Deportiva</Link>
        
        <button onClick={toggleMenu} className='md:hidden text-xl'>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`md:flex justify-evenly gap-6 font-semibold ${isOpen ? 'flex' : 'hidden'} flex-col md:flex-row absolute rounded-lg md:relative top-20 left-0 right-0 md:top-0 bg-neutral-700 md:bg-transparent p-5 md:p-0 z-20`}>
          <li className='hover:bg-neutral-800 rounded-lg text-center p-2 transition-colors'>
            <Link to="/" className='block' onClick={toggleMenu}>Inicio</Link>
          </li>
          <li className='hover:bg-neutral-800 transition-colors rounded-lg text-center p-2'>
            <Link to="/informes" className='block' onClick={toggleMenu}>Informes</Link>
          </li>
          <li className='hover:bg-neutral-800 transition-colors rounded-lg text-center p-2'>
            <Link to="/gastos" className='block' onClick={toggleMenu}>Gastos</Link>
          </li>
          <li className='hover:bg-neutral-800 transition-colors rounded-lg text-center p-2'>
            <Link to="/usuarios" className='block' onClick={toggleMenu}>Usuarios</Link>
          </li>
        </ul>
      </nav>

      {isOpen && <div className='fixed inset-0 bg-black opacity-70 z-0'></div>}
    </header>
  );
}

export default Navbar;
