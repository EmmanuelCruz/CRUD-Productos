import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Productos from "./components/Productos";
import NuevoProductos from "./components/NuevoProductos";
import ProductoLayout from "./layout/ProductoLayout";
import EditarProducto from "./components/EditarProducto";

// Redux
import { Provider } from 'react-redux';
import store from "./store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />

        <div className="container">
          <Routes>
            <Route exact path='/' element={<ProductoLayout />}>
              <Route index element={<Productos />} />
              <Route path="/productos/nuevo" element={<NuevoProductos />} />
              <Route path="/productos/editar/:id" element={<EditarProducto />} />
            </Route>
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
