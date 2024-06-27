import React, { Component } from 'react';

class NuevoInforme extends Component {

    state = {
        client: '',
        date: '',
        description: '',
        num_receipt: '',
        amount: ''
    };

    componentDidMount() {
        const { informe } = this.props;
        if (informe) {
            this.setState({
                client: informe.client,
                date: informe.date,
                description: informe.description,
                num_receipt: informe.num_receipt,
                amount: informe.amount
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.informe && this.props.informe !== prevProps.informe) {
            const { informe } = this.props;
            this.setState({
                client: informe.client,
                date: informe.date,
                description: informe.description,
                num_receipt: informe.num_receipt,
                amount: informe.amount
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { informe } = this.props;
        const url = informe ? `http://localhost:8000/reports/${informe.id}` : 'http://localhost:8000/reports';
        const method = informe ? 'PUT' : 'POST';

        console.log('Datos del informe:', this.state);

        fetch(url, { 
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(response => {
            if (response.ok) {
                this.props.setMostrarModal(false);
                this.props.fetchInformes();
                console.log('Informe guardado exitosamente');
            } else {
                console.error('Error al guardar informe:', response.status);
            }
        })
        .catch(error => console.error('Error al guardar informe:', error));
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { mostrarModal, informe } = this.props;
        const modalClass = mostrarModal ? 'modal bg-opacity-15 bg-black fixed inset-0 flex justify-center items-start pt-10' : 'modal hidden bg-opacity-15 bg-black fixed inset-0 flex justify-center items-center';

        return (
            <div className={modalClass}>
                <form onSubmit={this.handleSubmit} className='shadow-md flex flex-col gap-2 py-10 px-5 bg-white text-slate-950 w-11/12 md:w-6/12 text-base'>
                    <header>
                        <h1 className='text-xl mb-5'>{informe ? 'Editar Informe' : 'Nuevo Informe'}</h1>
                    </header>
                    <div className='flex flex-col gap-2 text-start'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label>Cliente</label>
                                <input 
                                    className='px-2 py-1 border-2 border-slate-200 outline-blue-300' 
                                    type='text' 
                                    placeholder='Directiva...'
                                    name="client"
                                    value={this.state.client}
                                    onChange={this.handleChange}
                                />
                            </div>  
                            
                            <div className='flex flex-col gap-2'>
                                <label>Fecha</label>
                                <input 
                                    className='px-2 py-1 border-2 w-full border-slate-200 outline-blue-300' 
                                    type='date'
                                    name="date"
                                    value={this.state.date}
                                    onChange={this.handleChange}
                                />
                            </div>      
                        </div>
                        <label>Descripción</label>
                        <textarea 
                            className='px-2 py-1 border-2 border-slate-200 outline-blue-300' 
                            placeholder='Descripción...'
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                        <label>Importe</label>
                        <input 
                            className='px-2 py-1 border-2 border-slate-200 outline-blue-300' 
                            type='number' 
                            placeholder='Importe...'
                            name="amount"
                            value={this.state.amount}
                            onChange={this.handleChange}
                        />
                    </div>
                    <footer className='flex gap-2 text-white justify-end'>
                        <button type="button" className='bg-red-500 p-2 rounded-md' onClick={() => this.props.setMostrarModal(false)}>Cerrar</button> 
                        <button type="submit" className='bg-blue-500 p-2 rounded-md'>{informe ? 'Guardar' : 'Crear'}</button>
                    </footer>
                </form>
            </div>
        );
    }
}

export default NuevoInforme;
