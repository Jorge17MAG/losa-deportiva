import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <header className=''>
        <nav className='flex text-slate-700 items-center justify-between px-5 py-5'>
          <h1 className='text-xl font-bold'>Losa Deportiva</h1>
          <ul className='hidden md:flex justify-evenly gap-10'>
            <li>Informes</li>
            <li>Gastos</li>
            <li>Usuarios</li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Navbar;
