import { 
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_ERROR,
  AGREGAR_PRODUCTO_EXITO,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  PRODUCTO_ELIMINADO_ERROR,
  PRODUCTO_ELIMINADO_EXITO,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_EDITADO_ERROR,
  PRODUCTO_EDITADO_EXITO,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO
} from "../types";
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2';

// Crear nuevo producto
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch( agregarProducto() )

    try {
      // Insertar en la api
      await clienteAxios.post('/productos', producto)
      dispatch( agregarProductoExito(producto))

      Swal.fire(
        'Correcto', 'El producto se agregó correctamente', 'success'
      )
    } catch (error) {
      console.error(error);
      dispatch( agregarProductoError(true))
    }
  }
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO
})

// Si se guarda en la base
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
})

// Hay un error al guardar
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
})

// Descarga productos
export function obtenerProductos() {
  return async dispatch => {
    dispatch(descargarProductos())

    try {
      const { data } = await clienteAxios('/productos')
      dispatch( descargarProductosExitoso(data))
    } catch (error) {
      console.error(error);
      dispatch( descargarProductosError())
    }
  }
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
})

const descargarProductosExitoso = productos => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos
})

const descargarProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR
})

// Seleciona y elimina el producto
export function eliminarProducto(id) {
  return async dispatch => {
    dispatch(obtenerProductoEliminar(id))

    try {
      await clienteAxios.delete(`/productos/${id}`)

      dispatch( eliminarProductoExito() )

      Swal.fire(
        'Eliminado',
        'El producto ha sido eliminado',
        'success'
      )
    } catch (error) {
      console.error(error);
      dispatch( eliminarProductoError() )
    }
  }
}

const obtenerProductoEliminar = id => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
})

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true
})

// Colocar en activo
export function obtenerProductoEditar(producto) {
  return dispatch => {
    dispatch( obtenerProductoAction(producto))
  }
}

const obtenerProductoAction = producto => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
})

// Edita un producto
export function editarProductoAction(producto) {
  return async dispatch => {
    dispatch(editarProducto())

    try {
      await clienteAxios.put(`productos/${producto.id}`, producto)

      dispatch(editarProductoExito(producto))
    } catch (error) {
      dispatch(productoEditarError())
    }
  }
}

const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
})

const productoEditarError = () =>({
  type: PRODUCTO_EDITADO_ERROR
})