import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Inicio from './paginas(router)/Inicio';
import NuevoCliente from './paginas(router)/NuevoCliente';
import EditarCliente from './paginas(router)/EditarCliente';
import VerCliente from './paginas(router)/VerCliente';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        { /* Los siguientes son grupos de rutas anidadas */ }

        <Route path="/clientes" element={<Layout />} > { /* Master Page que contiene las rutas anidadas*/}
          { /* Las rutas que coloques dentro seran las rutas anidadas en este grupo */ }
          <Route index element={<Inicio />} /> {/* index indica que componente se va a cargar cuando se visita /clientes*/}
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
          <Route path=":id" element={<VerCliente />} />
        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App
