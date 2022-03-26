import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from './Alerta';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {

    const navigate = useNavigate()

  /*schema de yup. basicamente es un objeto que tiene toda la forma con 
  todos los campos que vas a tener y que frma van a tener esos campos */
  const nuevoClienteSchema = Yup.object().shape({ //shape va a ser la forma que tendran los datos cuando creamos un nuevo cliente, recibe los datos del formulario, en este caso de formik
    nombre: Yup.string()
               .min(3, 'El nombre es muy corto')
               .max(40, 'El nombre es muy largo')
               .required('El nombre del cliente es Obligatorio'),
    empresa: Yup.string()
                .required('El nombre de la empresa es obligatorio'),
    email: Yup.string()
              .email('Email no valido')
              .required('El email es obligatorio'),
    telefono: Yup.number()
                 .positive('Número no valido')
                 .integer('Número no valido')
                 .typeError('El número no es valido')

    
  })
  //siempre iniciamos con Yup para validar porque es donde tiene todos los métodos

  // funcion para el submit usando formik y para hacer el CRUD
  const handeSubmit = async (valores) => {
      try {
        let respuesta;
        if(cliente.id) {
            //Editando un registro
            const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;

            respuesta = await fetch(url, {
                method: 'PUT', //PUT actualiza un registro, por eso en la URL se indica el ID para actualizar los datos
                body: JSON.stringify(valores),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            // Nuevo Registro de usuario
            const url = import.meta.env.VITE_API_URL;

            respuesta = await fetch(url, {
                method: 'POST', // POST crea un nuevo registro
                body: JSON.stringify(valores),
                headers: {
                    'Content-Type': 'application/json'
                }
            })            
        }

        await respuesta.json();
        // Despues de agregar/editar el cliente, redirigimos al usuario con useNavigate a la pagina de clientes
        navigate('/clientes');        
        
    } catch (error) {
        console.log(error);
    }
  }
  return (
    cargando ? <Spinner /> : (

        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}</h1>

            <Formik
                initialValues={{
                    nombre: cliente.nombre ? cliente.nombre : "", // forma con ternario más legible
                    empresa: cliente?.empresa ?? "", // forma más moderna, se llama Nullish coalescing operator (??)
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? ""
                }}
                // Para editar el cliente se necesita se necesita llenar el formulario con los datos, por eso se utsa lo siguiente
                enableReinitialize={true}
                onSubmit={ async (values, { resetForm }) => {
                    //manda a llamar la funcion
                    await handeSubmit(values);

                    //resetea el formulario cuando se haya culminado la peticion anterior
                    resetForm();
                }}
                validationSchema={nuevoClienteSchema} //aqui le decimos a formik donde va a encontrar el esquema de validacion y cual va a ser la forma que esperamos en los datos
            >
                {({errors, touched}) => {
                    return (

                    <Form
                    className='mt-10'
                    >
                        <div className='mb-4'>
                            <label 
                                className='text-gray-800'
                                htmlFor='nombre'
                                >Nombre:</label>
                            <Field 
                                id="nombre"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Nombre del Cliente"
                                name="nombre" 
                            />
                            {errors.nombre && touched.nombre ? (
                                <Alerta>{errors.nombre}</Alerta>
                            ) : null }
                        </div>

                        <div className='mb-4'>
                            <label 
                                className='text-gray-800'
                                htmlFor='empresa'
                            >Empresa:</label>
                            <Field 
                                id="empresa"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Empresa del Cliente"
                                name="empresa"
                            />
                            {errors.empresa && touched.empresa ? (
                                <Alerta>{errors.empresa}</Alerta>
                            ) : null }
                        </div>

                        <div className='mb-4'>
                            <label 
                                className='text-gray-800'
                                htmlFor='email'
                            >E-mail:</label>
                            <Field 
                                id="email"
                                type="email"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Email del Cliente"
                                name="email"
                            />
                            {errors.email && touched.email ? (
                                <Alerta>{errors.email}</Alerta>
                            ) : null }
                        </div>

                        <div className='mb-4'>
                            <label 
                                className='text-gray-800'
                                htmlFor='telefono'
                            >Telefono:</label>
                            <Field 
                                id="telefono"
                                type="tel"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Teléfono del Cliente"
                                name="telefono"
                            />
                            {errors.telefono && touched.telefono ? (
                                <Alerta>{errors.telefono}</Alerta>
                            ) : null }
                        </div>

                        <div className='mb-4'>
                            <label 
                                className='text-gray-800'
                                htmlFor='notas'
                            >Notas:</label>
                            <Field 
                                as="textarea"
                                id="telefono"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50 h-40"
                                placeholder="Notas del Cliente"
                                name="notas"
                            />
                        </div>

                        <input 
                            type="submit"
                            value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                            className='mt-4 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg rounded' 
                            />
                    </Form>
                )}}
            </Formik>
        </div>
    )
  )
}

// Default props para la pagina de editar cliente
/* funcionan como los parametros por default, si no estan presente los props, se utilizaran estos por 
defecto, si los props estan presentes entoces tomaran los que estan arriba */
Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario