import { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { obtenerProductos } from '../actions/productoActions'
import Producto from './Producto'

const Productos = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const cargarProductos = () => dispatch(obtenerProductos())
    cargarProductos()

    // eslint-disable-next-line
  }, [])

  const productos = useSelector(state => state.productos.productos)
  const error = useSelector(state => state.productos.error)
  const cargando = useSelector(state => state.productos.loading)
  return (
    <Fragment>
      <h2 className='text-center my-5'>Listado de productos</h2>

      {error && <p className='font-weight-bold alert alert-danger text-center mt-4'>Error de sistema</p>}
      {cargando && <p className='text-center'>Cargando...</p>}
      <table className='table table-striped'>
        <thead className='bg-primary table-dark'>
          <tr>
            <th scope='col'>Nombre</th>
            <th scope='col'>Precio</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? <tr><td>No hay productos</td></tr> : (
            productos.map(producto => (
              <Producto key={producto.id} producto={producto} />
            ))
          )}
        </tbody>
      </table>
    </Fragment>
  )
}

export default Productos
