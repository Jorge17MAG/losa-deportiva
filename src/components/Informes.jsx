import React, { Component } from 'react';
import NuevoInforme from './AgregarEditarInforme';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import * as XLSX from 'xlsx';
import { FaFileExcel } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

class Informes extends Component {
    state = {
        informes: [],
        mostrarModal: false,
        informeSeleccionado: null,
        selectedMonth: 'Todos',
        selectedYear: '2024'
    }

    componentDidMount() {
        this.fetchInformes();
    }


    fetchInformes = () => {
        fetch(`http://192.168.18.182:8000/reports`)
            .then(response => response.json())
            .then(data => {
                console.log('Datos recibidos:', data);
                this.setState({ informes: data }, this.calculateTotalAmount);
            })
            .catch(error => console.error('Error al obtener informes:', error));
    }
    
    fetchInformesFiltrados = () => {
        const { selectedMonth, selectedYear } = this.state;
        let monthNumber = this.convertirMesANumero(selectedMonth);
        console.log(monthNumber)
    
        fetch(`http://192.168.18.182:8000/reports_month_year?month=${monthNumber}&year=${selectedYear}`)
            .then(response => response.json())
            .then(data => {
                console.log('Datos recibidos (filtrados):', data);
                this.setState({ informes: data }, this.calculateTotalAmount);
            })
            .catch(error => console.error('Error al obtener informes filtrados:', error));
    }

    calculateTotalAmount = () => {
        const { informes } = this.state;
        return informes.reduce((total, informe) => total + parseFloat(informe.amount), 0);
    }

    convertirMesANumero = (nombreMes) => {
        const meses = {
            'Todos' : '00',
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

    handleReiniciarClick = () => {
        this.fetchInformes();
    }

    deleteInforme = (id) => {
        fetch(`http://192.168.18.182:8000/reports/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    this.setState((prevState) => ({
                        informes: prevState.informes.filter(informe => informe.id !== id)
                    }));
                } else {
                    console.error('Error al borrar el informe');
                }
            })
            .catch(error => console.error('Error al borrar el informe:', error));
    }

    render() {
        const { selectedMonth, selectedYear } = this.state;
        const totalAmount = this.calculateTotalAmount();

        return (
            <div className='text-neutral-900 dark:text-neutral-50'>
                <h2 className='text-start text-3xl uppercase mb-4'> Informes</h2>
                <div className='flex mb-2 flex-col sm:flex-row gap-4'>
                    <div className='flex gap-4 items-center flex-wrap flex-1'>
                        <select className='p-2 border-neutral-500 border-[1px] bg-transparent text-slate-50 dark:text-slate-50 rounded-lg text-sm cursor-pointer' value={selectedMonth} onChange={this.handleMonthChange}>
                            <option className='text-black' value='Todos'>Todos los meses</option>
                            <option className='text-black' value='Enero'>Enero</option>
                            <option className='text-black' value='Febrero'>Febrero</option>
                            <option className='text-black' value='Marzo'>Marzo</option>
                            <option className='text-black' value='Abril'>Abril</option>
                            <option className='text-black' value='Mayo'>Mayo</option>
                            <option className='text-black' value='Junio'>Junio</option>
                            <option className='text-black' value='Julio'>Julio</option>
                            <option className='text-black' value='Agosto'>Agosto</option>
                            <option className='text-black' value='Septiembre'>Septiembre</option>
                            <option className='text-black' value='Octubre'>Octubre</option>
                            <option className='text-black' value='Noviembre'>Noviembre</option>
                            <option className='text-black' value='Diciembre'>Diciembre</option>
                        </select>

                        <select className='p-2 dark:border-neutral-500 border-[1px] bg-transparent text-slate-950 dark:text-slate-50 rounded-lg text-sm cursor-pointer' value={selectedYear} onChange={this.handleYearChange}>
                            <option className='text-black' value='2024'>2024</option>
                            <option className='text-black' value='2023'>2023</option>
                        </select>

                        <button
                            className='dark:bg-neutral-700 dark:text-white p-2 rounded-md dark:border-neutral-500 border-[1px] dark:hover:bg-neutral-800'
                            onClick={this.handleFiltrarClick}
                        >
                            Filtrar
                        </button>

                        <button
                            className='dark:bg-neutral-700 dark:text-white p-2 rounded-md dark:border-neutral-500 border-[1px] dark:hover:bg-neutral-800'
                            onClick={this.handleReiniciarClick}
                        >
                            Reiniciar
                        </button>

                        
                    </div>

                    <div className='flex gap-2 justify-end'>
                        <button
                            className='flex items-center gap-1 dark:bg-neutral-700 dark:text-white p-2 rounded-md dark:border-neutral-500 border-[1px] dark:hover:bg-neutral-800'
                            onClick={this.generarExcel}
                        >   
                            <FaFileExcel/>Generar Excel
                        </button>

                        <button
                            className='flex items-center gap-1  dark:bg-neutral-700 dark:text-white p-2 rounded-md dark:border-neutral-500 border-[1px] dark:hover:bg-neutral-800'
                            onClick={() => this.setMostrarModal(true)}
                        >
                            <FaPlus/>
                            Nuevo Informe
                        </button>
                    </div>
                </div>

                <div className='mt-4 '>
                    <p className='text-start'>Total Importe: S/. {totalAmount}</p>
                </div>

                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full py-2">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-base">
                                    <thead className="bg-neutral-100 dark:bg-neutral-500 border-slate-50 font-medium  dark:text-neutral-50 text-neutral-900">
                                        <tr className='uppercase'>
                                            <th scope="col" className="px-6 py-4">ID</th>
                                            <th scope="col" className="px-6 py-4">Cliente</th>
                                            <th scope="col" className="px-6 py-4">Fecha</th>
                                            <th scope="col" className="px-6 py-4">Día</th>
                                            <th scope="col" className="px-6 py-4">Descripción</th>
                                            <th scope="col" className="px-6 py-4">Importe</th>
                                            <th scope="col" className="px-6 py-4">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.informes.map(informe => (
                                            <tr key={informe.id} className=" text-neutral-700 dark:text-neutral-50 even:bg-neutral-50 odd:bg-neutral-200 dark:even:bg-neutral-700 dark:odd:bg-neutral-800">
                                                <td className="px-6 py-4">{informe.id}</td>
                                                <td className="px-6 py-4">{informe.client}</td>
                                                <td className="px-6 py-4">{informe.date}</td>
                                                <td className="px-6 py-4">{this.obtenerDiaDeLaSemana(informe.date)}</td>
                                                <td className="px-6 py-4">{informe.description}</td>
                                                <td className="px-6 py-4">{informe.amount}</td>
                                                <td className='px-6 py-4 flex gap-2 text-white'>
                                                    <button
                                                        className='border-[1px] border-blue-400 p-2 rounded-md hover:bg-blue-400 transition-colors'
                                                        onClick={() => this.setMostrarModal(true, informe)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className='border-[1px] border-red-400 p-2 rounded-md hover:bg-red-400 transition-colors'
                                                        onClick={() => this.deleteInforme(informe.id)}
                                                    >
                                                        Borrar
                                                    </button>
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
