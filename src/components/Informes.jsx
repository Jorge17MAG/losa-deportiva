// Importar React
import React, { Component } from 'react';

// Definir el componente basado en clases
class Informes extends Component {
  render() {
    return (
        <div className='text-slate-900 p-5'>
            <div className='flex justify-end'>
                <button 
                className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded-md'
                onClick={() => this.props.setMostrarModal(true)}
            >
                Nuevo Informe
            </button>
            </div>

            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                            <th scope="col" className="px-6 py-4">ID</th>
                            <th scope="col" className="px-6 py-4">Cliente</th>
                            <th scope="col" className="px-6 py-4">Nro. Recibo</th>
                            <th scope="col" className="px-6 py-4">Fecha</th>
                            <th scope="col" className="px-6 py-4">Descripción</th>
                            <th scope="col" className="px-6 py-4">Importe</th>
                            <th scope="col" className="px-6 py-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>        
        </div>
    );
  }
}

export default Informes;