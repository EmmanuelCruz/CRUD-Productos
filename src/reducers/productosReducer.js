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
  OBTENER_PRODUCTO_EDITAR
} from "../types";

const initialState = {
  productos: [],
  error: null,
  loading: false,
  productoEliminar: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: true
      }
    
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false, 
        productos: [...state.productos, action.payload]
      }

    case AGREGAR_PRODUCTO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    
    case COMENZAR_DESCARGA_PRODUCTOS:
      return {
        ...state,
        loading: action.payload
      }
    
    case DESCARGA_PRODUCTOS_EXITO:
      return {
        ...state,
        loading: false,
        error: false,
        productos: action.payload
      }

    case DESCARGA_PRODUCTOS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    
    case OBTENER_PRODUCTO_ELIMINAR:
      return {
        ...state,
        productoEliminar: action.payload
      }
    
    case PRODUCTO_ELIMINADO_EXITO:
      return {
        ...state,
        productos: state.productos.filter(product => product.id !== state.productoEliminar),
        productoEliminar: '',
        loading: false
      }

    case PRODUCTO_ELIMINADO_ERROR:
      return {
        ...state,
        error: action.payload,
        productoEliminar: '',
        loading: false
      }

    case OBTENER_PRODUCTO_EDITAR:
      return {
        ...state,
        productoEditar: action.payload
      }

    case PRODUCTO_EDITADO_EXITO:
      return {
        ...state,
        productoEditar: null,
        productos: state.productos.map(producto => producto.id === action.payload.id ? action.payload : producto)
      }

    case PRODUCTO_EDITADO_ERROR:
      return {
        ...state,
        error: true,
        loading: false
      }
  
    default:
      return state;
  }
}