// ACTIONS
import { crearNuevoProductoAction } from "../actions/productoActions"
import { useDispatch, useSelector } from "react-redux/es/exports"
import { useState } from "react"
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions"

const NuevoProductos = ({history}) => {

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState(0)

  const dispatch = useDispatch()

  // Para acceder al state de Redux
  const cargando = useSelector(state => state.productos.loading)
  const error = useSelector(state => state.productos.error)
  const alerta = useSelector(state => state.alerta.alerta)

  const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) )

  const submitNuevoProducto = e => {
    e.preventDefault()

    // Validar formulario
    if(nombre.trim() === '' || precio <= 0){
      const alerta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }

      dispatch( mostrarAlerta(alerta) )
      return
    }

    // Si no hay errores
    dispatch(ocultarAlertaAction())

    // Crear el nuevo producto
    agregarProducto({
      nombre, precio
    })

    history.push('/')
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4 font-weight-bold'>
              Agregar nuevo producto
            </h2>

            {alerta && <p className={alerta.classes}>{alerta.msg}</p>}

            <form
              onSubmit={submitNuevoProducto}
            >
              <div className='form-group'>
                <label>Nombre de producto</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Nombre producto'
                  name='nombre' 
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
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
                  onChange={e => setPrecio(Number(e.target.value))}
                />
              </div>

              <button
                type='submit'
                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
              >
                Agregar
              </button>
            </form>

            {cargando ? 'Cargando...' : null}
            {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}

          </div>
        </div>
      </div>
    </div>
  )
}

export default NuevoProductos
