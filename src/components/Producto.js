import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux/es/exports"
import { eliminarProducto, obtenerProductoEditar } from "../actions/productoActions"
import Swal from 'sweetalert2';

const Producto = ({producto}) => {

  const { nombre, precio, id } = producto

  const dispatch = useDispatch()
  const history = useNavigate()

  const confirmarEliminar = id => {

    // Confirmación para eliminar

    Swal.fire({
      title: '¿Estás seguro?',
      text: "No se puede revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch( eliminarProducto(id) )
      }
    })
  }

  const redireccionarEdicion = producto => {
    dispatch( obtenerProductoEditar(producto) )
    history(`/productos/editar/${producto.id}`)
  }

  return (
    <tr>
      <td>{nombre}</td>
      <td><span className="font-weight-bold">${precio}</span></td>
      <td className="acciones">
        <button onClick={() => redireccionarEdicion(producto)} type="button" className='btn btn-primary mr-2'>
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminar(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default Producto
