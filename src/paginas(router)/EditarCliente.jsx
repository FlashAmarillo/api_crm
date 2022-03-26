import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formulario from '../components/Formulario';

const EditarCliente = () => {

  const { id } = useParams(); //utilizamos este hook para traer el id del cliente en la URL
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        
        // seteamos el cliente consultado en un objeto
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando);
    }
    obtenerClienteAPI();
  }, []) // para traer los datos del clientes segun su id, solo se ejecuta 1 vez

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3 '>Actualiza los siguientes campos para editar el cliente</p>

      {cliente?.nombre ? (
        <Formulario 
          cliente={cliente}
          cargando={cargando}
        />
      ) : <p>Cliente ID no válido</p>}
    </>
  )
}

export default EditarCliente