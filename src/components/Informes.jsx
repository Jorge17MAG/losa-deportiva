import React, { Component } from 'react';
import NuevoInforme from './NuevoInforme';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import * as XLSX from 'xlsx';

class Informes extends Component {
    state = {
        informes: [],
        mostrarModal: false,
        informeSeleccionado: null,
        selectedYear: '2024'
    }

    componentDidMount() {
        this.fetchInformes();
    }

    fetchInformes = () => {
        fetch(`http://localhost:8000/reports`)
            .then(response => response.json())
            .then(data => {
                console.log('Datos recibidos:', data);
                this.setState({ informes: data });
            })
            .catch(error => console.error('Error al obtener informes:', error));
    }

    fetchInformesFiltrados = () => {
        const { selectedMonth, selectedYear } = this.state;
        let monthNumber = this.convertirMesANumero(selectedMonth);
    
        fetch(`http://localhost:8000/reports_month_year?month=${monthNumber}&year=${selectedYear}`)
        .then(response => response.json())
        .then(data => {
            console.log('Datos recibidos (filtrados):', data);
            this.setState({ informes: data });
        })
        .catch(error => console.error('Error al obtener informes filtrados:', error));
    }

    convertirMesANumero = (nombreMes) => {
        const meses = {
            'Enero': '01',
            'Febrero': '02',
            'Marzo': '03',
            'Abril': '04',
            'Mayo': '05',
            'Junio': '06',
            'Julio': '07',
            'Agosto': '08',
            'Septiembre': '09',
            'Octubre': '10',
            'Noviembre': '11',
            'Diciembre': '12'
        };
        return meses[nombreMes];
    }

    setMostrarModal = (mostrar, informe = null) => {
        this.setState({ mostrarModal: mostrar, informeSeleccionado: informe });
    }

    obtenerDiaDeLaSemana = (fecha) => {
        return format(parseISO(fecha), 'EEEE', { locale: es });
    }

    generarExcel = () => {
        const { informes, selectedMonth, selectedYear } = this.state;
    
        const mes = selectedMonth ? `${selectedMonth}` : '';
        const año = selectedYear ? `_${selectedYear}` : '';
    
        let filename = `informes`;
        if (mes && año) {
            filename = `informes_${mes.toLowerCase()}_${año}`;
        } else if (mes) {
            filename = `informes_${mes.toLowerCase()}`;
        } else if (año) {
            filename = `informes${año}`;
        }
    
        const wb = XLSX.utils.book_new();
        const wsData = [
            ['Cliente', 'Nro. Recibo', 'Fecha', 'Día', 'Descripción', 'Importe']
        ];
    
        informes.forEach(informe => {
            const rowData = [
                informe.client,
                informe.num_receipt,
                informe.date,
                this.obtenerDiaDeLaSemana(informe.date),
                informe.description,
                informe.amount
            ];
            wsData.push(rowData);
        });
    
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, 'Informes');
    
        XLSX.writeFile(wb, `${filename}.xlsx`);
    }

    handleMonthChange = (event) => {
        this.setState({ selectedMonth: event.target.value });
    }

    handleYearChange = (event) => {
        this.setState({ selectedYear: event.target.value });
    }

    handleFiltrarClick = () => {
        this.fetchInformesFiltrados();
    }

    handleReiniciarClikc = () => {
        this.fetchInformes();
    }

    render() {
        const { selectedMonth, selectedYear } = this.state;

        return (
            <div className='text-slate-900 p-5'>
                <div className='flex justify-between mb-2'>
                    <div className='flex gap-4 items-center'>
                        <select className='p-2 border-gray-300 border-[1px] rounded-lg text-sm cursor-pointer' value={selectedMonth} onChange={this.handleMonthChange}>
                            <option value='Enero'>Enero</option>
                            <option value='Febrero'>Febrero</option>
                            <option value='Marzo'>Marzo</option>
                            <option value='Abril'>Abril</option>
                            <option value='Mayo'>Mayo</option>
                            <option value='Junio'>Junio</option>
                            <option value='Julio'>Julio</option>
                            <option value='Agosto'>Agosto</option>
                            <option value='Septiembre'>Septiembre</option>
                            <option value='Octubre'>Octubre</option>
                            <option value='Noviembre'>Noviembre</option>
                            <option value='Diciembre'>Diciembre</option>
                        </select>

                        <select className='p-2 border-gray-300 border-[1px] rounded-lg text-sm cursor-pointer' value={selectedYear} onChange={this.handleYearChange}>
                            <option>2024</option>
                            <option>2023</option>
                        </select>

                        <button
                            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                            onClick={this.handleFiltrarClick}
                        >
                            Filtrar
                        </button>

                        <button
                            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                            onClick={this.handleReiniciarClikc}
                        >
                            Reiniciar
                        </button>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <button
                            className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5   dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                            onClick={this.generarExcel}
                        >
                            Generar Excel
                        </button>

                        <button
                            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                            onClick={() => this.setMostrarModal(true)}
                        >
                            Nuevo Informe
                        </button>

                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-base">
                                    <thead className="border-b font-medium bg-slate-500 text-white">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">ID</th>
                                            <th scope="col" className="px-6 py-4">Cliente</th>
                                            <th scope="col" className="px-6 py-4">Nro. Recibo</th>
                                            <th scope="col" className="px-6 py-4">Fecha</th>
                                            <th scope="col" className="px-6 py-4">Día</th>
                                            <th scope="col" className="px-6 py-4">Descripción</th>
                                            <th scope="col" className="px-6 py-4">Importe</th>
                                            <th scope="col" className="px-6 py-4">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.informes.map(informe => (
                                            <tr key={informe.id} className="odd:bg-gray-100 even:bg-white">
                                                <td className="px-6 py-4">{informe.id}</td>
                                                <td className="px-6 py-4">{informe.client}</td>
                                                <td className="px-6 py-4">{informe.num_receipt}</td>
                                                <td className="px-6 py-4">{informe.date}</td>
                                                <td className="px-6 py-4">{this.obtenerDiaDeLaSemana(informe.date)}</td>
                                                <td className="px-6 py-4">{informe.description}</td>
                                                <td className="px-6 py-4">{informe.amount}</td>
                                                <td className='px-6 py-4 flex gap-2 text-white'>
                                                    <button
                                                        className='bg-blue-500 rounded-sm py-1 px-2'
                                                        onClick={() => this.setMostrarModal(true, informe)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button className='bg-red-500 rounded-sm py-1 px-2'>Borrar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.mostrarModal && (
                    <NuevoInforme
                        mostrarModal={this.state.mostrarModal}
                        setMostrarModal={this.setMostrarModal}
                        fetchInformes={this.fetchInformes}
                        informe={this.state.informeSeleccionado}
                    />
                )}
            </div>
        );
    }
}

export default Informes;
