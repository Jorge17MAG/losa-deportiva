import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Informes from './components/Informes'
import NuevoInforme from './components/NuevoInforme'

function App() {
  const [mostrarModal, setMostrarModal] = useState(false);
  return (
    <div className=''>
      <Navbar />
      <Informes setMostrarModal={setMostrarModal} />
      <NuevoInforme mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} />
    </div>
  );
}

export default App
