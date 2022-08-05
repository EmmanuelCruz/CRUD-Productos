import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux/es/exports"
import { editarProductoAction } from "../actions/productoActions"
import { useNavigate } from 'react-router-dom';

const EditarProducto = () => {

  const dispatch = useDispatch()

  const [producto, setProducto] = useState({
    nombre: '',
    precio: ''
  })

  const history = useNavigate()
  
  const productoEditar = useSelector(state => state.productos.productoEditar)

  useEffect(() => {
    setProducto(productoEditar)
  }, [productoEditar])

  const onChangeFormulario = e => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }

  if(!producto) return null

  const {nombre, precio} = producto

  const handleEditar = e => {
    e.preventDefault()
    dispatch(editarProductoAction(producto))
    history('/')
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>
              Editar producto
            </h2>

            <form
              onSubmit={handleEditar}
            >
              <div className='form-group'>
                <label>Nombre de producto</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Nombre producto'
                  name='nombre' 
                  value={nombre}
                  onChange={onChangeFormulario}
                />
              </div>

              <div className='form-group'>
                <label>Precio de producto</label>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Nombre producto'
                  name='precio' 
                  value={precio}
                  onChange={onChangeFormulario}
                />
              </div>

              <button
                type='submit'
                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
              >
                Guardar cambios
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarProducto
