// Importar React
import React, { Component } from 'react';

// Definir el componente basado en clases
class NuevoInforme extends Component {
  render() {

    const modalClass = this.props.mostrarModal ? 'modal bg-opacity-15 bg-black fixed inset-0 flex justify-center items-center' : 'modal hidden bg-opacity-15 bg-black fixed inset-0 flex justify-center items-center';

    return (
        <div className={modalClass}>
            <form className='shadow-md flex flex-col gap-2 p-5 bg-white text-slate-950 w-11/12 md:w-6/12 text-base'>
                <header>
                    <h1 className='text-xl'>Nuevo Informe</h1>
                </header>
                <div className='flex flex-col gap-2 text-start'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label>Cliente</label>
                            <input className='px-2 py-1 border-2 border-slate-200 outline-blue-300' type='text' placeholder='Directiva...'></input>
                        </div>  
                        
                        <div className='flex flex-col gap-2'>
                            <label>Fecha</label>
                            <input className='px-2 py-1 border-2 w-full border-slate-200 outline-blue-300' type='date'></input>
                        </div>      
                    </div>

                    <label>Descripción</label>
                    <textarea className='px-2 py-1 border-2 border-slate-200 outline-blue-300' placeholder='Descripción...'></textarea>

                    <label>Importe</label>
                    <input className='px-2 py-1 border-2 border-slate-200 outline-blue-300' type='number' placeholder='Importe...'></input>
                </div>
                <footer className='flex gap-2 text-white justify-end'>
                    <button type="button" className='bg-red-500 p-2 rounded-md' onClick={() => this.props.setMostrarModal(false)}>Cerrar</button> 
                    <button className='bg-blue-500 p-2 rounded-md'>Crear</button>
                </footer>
            </form>
        </div>
    );
  }
}

export default NuevoInforme;