import React, { Component } from 'react';
import imagen from '../assets/foto.jpg'
import { FaSearch } from "react-icons/fa";


class Usuarios extends Component {
  render() {
    return (
      <div>
        <h2 className='text-start text-3xl uppercase mb-4'>Usuarios</h2>

        <div className='flex flex-col md:flex-row mb-4 justify-between'>
          <input className='py-2 px-2 border-[1px] outline-0 ring-0 border-neutral-600 text-slate-50 placeholder:text-slate-50 bg-neutral-800' placeholder='Buscar usuarios...'></input>

          <div className='flex flex-wrap gap-4 items-center text-neutral-300'>
            <button>Especimen</button>
            <button>Especimen</button>
            <button>Especimen</button>
            <button>Especimen</button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
          <div className='flex bg-neutral-800 px-6 pt-6 pb-12 rounded-lg gap-6 hover:shadow-neutral-600 hover:shadow-md transition-all'>
            <div className='w-56'>
              <img className='rounded-full' src={imagen}></img>
            </div>
            <div>
              <div>
                <h4 className='font-semibold text-2xl text-start'>Jorge Arellano</h4>
                <p className='text-start'>Perú, Lima</p>
              </div>
              <div className='flex justify-start flex-wrap gap-2 mt-2'>
                <span className='border-[1px] border-slate-100 px-2 rounded-md'>
                  Backend
                </span>

                <span className='border-[1px] border-slate-100 px-2 rounded-md'>
                  Frontend
                </span>
                <span className='border-[1px] border-slate-100 px-2 rounded-md'>
                  Design
                </span>
                <span className='border-[1px] border-slate-100 px-2 rounded-md'>
                  Junior
                </span>
                <span className='border-[1px] border-slate-100 px-2 rounded-md'>
                  API Rest
                </span>
                <span className='border-[1px] border-slate-100 px-2 rounded-md'>
                  JavaScript
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Usuarios;
