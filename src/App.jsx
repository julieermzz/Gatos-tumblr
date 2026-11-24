import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function GaleriaGatos() {
  const [gatos, setGatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarGatos = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch('https://api.thecatapi.com/v1/images/search?limit=12');
      const datos = await respuesta.json();
      console.log("Datos obtenidos de The Cat API:", datos); // <-- Esto es para tu captura del Punto 3
      setGatos(datos);
    } catch (error) {
      console.error('Error al traer los gatitos:', error);
    }
    setCargando(false);
  };

  useEffect(() => {
    cargarGatos();
  }, []);

  return (
    <div>
      <header className="encabezado">
        <h1>🐱 Gatos Tumblr</h1>
        <p>Un rincón aesthetic lleno de michis aleatorios</p>
        <button onClick={cargarGatos} className="boton-recargar">
          {cargando ? 'Buscando michis...' : '🔄 Ver nuevos gatos'}
        </button>
      </header>

      <main className="galeria">
        {gatos.map((gato) => (
          <div key={gato.id} className="tarjeta-gato">
            <img src={gato.url} alt="Un gato lindo" loading="lazy" />
          </div>
        ))}
      </main>
    </div>
  );
}

function AcercaDe() {
  return (
    <div style={{ textAlign: 'center', padding: '50px', color: '#ffb7b2' }}>
      <h2>Acerca de este proyecto</h2>
      <p>Página web desarrollada con React, Vite y React Router para mostrar gatitos aleatorios.</p>
    </div>
  );
}

// <-- Esta parte de abajo es la configuración de React Router para tu captura del Punto 4
function App() {
  return (
    <BrowserRouter basename="/Gatos-tumblr">
      <div className="contenedor">
        <nav style={{ marginBottom: '20px', textAlign: 'center' }}>
          <Link to="/" style={{ color: '#ffb7b2', marginRight: '20px', textDecoration: 'none', fontWeight: 'bold' }}>Inicio</Link>
          <Link to="/acerca" style={{ color: '#ffb7b2', textDecoration: 'none', fontWeight: 'bold' }}>Acerca de</Link>
        </nav>
        <Routes>
          <Route path="/" element={<GaleriaGatos />} />
          <Route path="/acerca" element={<AcercaDe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;