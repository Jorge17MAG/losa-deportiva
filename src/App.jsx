import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Informes from './components/Informes';
import NuevoInforme from './components/AgregarEditarInforme';
import Gastos from './components/Gastos';
import Usuarios from './components/Usuarios';
import Inicio from './components/Inicio';

function App() {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <Router>
        <Navbar/>
        <main className=''>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/informes" element={<Informes setMostrarModal={setMostrarModal} />} />
            <Route path="/gastos" element={<Gastos />} />
            <Route path="/usuarios" element={<Usuarios />} />
          </Routes>
          <NuevoInforme mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} />
        </main>
    </Router>
  );
}

export default App;
