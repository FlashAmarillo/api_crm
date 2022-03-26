import { useState, useEffect } from 'react';
import Cliente from '../components/Cliente';

const Inicio = () => {

  const [clientes, setClientes] = useState([]);

  //consultaremos la api una vez el componente este listo ya que se ejecuta una sola vez
  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = import.meta.env.VITE_API_URL;
        
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
    }

    //llamamos la funcion
    obtenerClientesAPI();
  }, [])

  const handleEliminar = async (id) => {

    const confirmar = confirm('¿Deseas eliminar este Cliente?');
    if(confirmar) {
      try {
        // Eliminar un registro 
        const url = `${import.meta.env.VITE_API_URL}/${id}`;

        const respuesta = await fetch(url, {
            method: 'DELETE', //DELETE elimina un registro, por eso en la URL se indica el ID para actualizar los datos
        })

        await respuesta.json();
        
        //de esta manera actualizamos el state y asi modificar en pantalla la lista de clientes
        const arrayClientes = clientes.filter( cliente => cliente.id !== id)
        setClientes(arrayClientes);
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3 '>Administra tus clientes</p>

      <table className='w-full mt-5 table-auto shadow bg-white'>
          <thead className='bg-blue-800 text-white'>
            <tr>
              <th className='p-2'>Nombre</th>
              <th className='p-2'>Contacto</th>
              <th className='p-2'>Empresa</th>
              <th className='p-2'>Acciones</th>
            </tr>
          </thead>

          <tbody>
              {clientes.map(cliente => (
                  <Cliente 
                    key={cliente.id}
                    cliente={cliente}
                    handleEliminar={handleEliminar}
                  />
              ))}
          </tbody>
      </table>
    </>
  )
}

export default Inicio