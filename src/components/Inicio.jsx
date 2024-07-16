import React, { Component } from 'react';

class Inicio extends Component {
  render() {
    return (
      <div className='text-white'>
        <div className='mb-4'>
            <h2 className=' text-3xl uppercase'>Inicio</h2>
            <p className='text-xl mt-6'>Resumen financiero</p>
        </div>

        <div className='flex flex-wrap gap-2'>
            <div className='dark:bg-green-800 flex-1 rounded-lg min-w-60 px-4 py-2'>
                <h2 className='text-lg '>Ingresos</h2>
                <span className='block  text-3xl'>S/ 150.00</span>
            </div>

            <div className='bg-red-800 flex-1  rounded-lg min-w-60 px-4 py-2'>
                <h2 className='text-lg '>Gastos</h2>
                <span className='block  text-3xl'>S/ 150.00</span>
            </div>

            <div className='bg-gray-600 flex-1  rounded-lg min-w-60 px-4 py-2'>
                <h2 className='text-lg '>Diferencia</h2>
                <span className='block text-3xl'>S/ 150.00</span>
            </div>
        </div>
      </div>
    );
  }
}

export default Inicio;
