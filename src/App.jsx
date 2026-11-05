// 1. ESTILOS GLOBALES Y LIBRERÍAS DE TERCEROS (Siempre van primero)
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify"; // Importamos el contenedor de alertas

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

// Componentes Públicos
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/Cart/CartView";

// Componentes de Administración
import { ProductFormContainer } from "./components/adminComponents/ProductForm/ProductFormContainer";
import { ProductSuccess } from "./components/adminComponents/ProductSuccess";
import { Dashboard } from "./components/adminComponents/Dashboard/Dashboard";
import { ProductAdminListContainer } from "./components/adminComponents/ProductAdminListContainer/ProductAdminListContainer";

// Autenticación y Layouts
import { Login } from "./components/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";

function App() {
    return (
        <>
            {/* EL CONTENEDOR DE ALERTAS DEBE ESTAR ACÁ PARA QUE ESCUCHE A TODA LA APP */}
            <ToastContainer 
                position="top-right" 
                autoClose={2500} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
                theme="colored"
            />

            <Routes>
                {/*-------------------------------- RUTAS PUBLICAS -------------------------------- */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<ItemListContainer />} />

                    {/* Ruta opcional para filtrar categorias */}
                    <Route path="/category/:category" element={<ItemListContainer />} />

                    <Route path="/product/:id" element={<ItemDetailContainer />} />

                    <Route path="/cart" element={<CartView />} />
                </Route>

                {/* LOGIN DE ADMINISTRACIÓN */}
                <Route path="/admin/login" element={<Login />} />

                {/*-------------------------------- RUTAS PROTEGIDAS DE ADMINISTRACION  -------------------------------- */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    {/* RUTAS ADMINISTRACIÓN */}
                    <Route index element={<Navigate to="dashboard" replace />} />

                    <Route path="dashboard" element={<Dashboard />} />

                    <Route path="products/new" element={<ProductFormContainer />} />

                    <Route path="products/success/:id" element={<ProductSuccess />} />

                    {/* Nueva ruta para ver el listado completo con opciones de Editar y Eliminar */}
                    <Route path="products" element={<ProductAdminListContainer />} />

                    {/* Agrego esta línea para que la edición en dashboard funcione */}
                    <Route path="products/edit/:id" element={<ProductFormContainer />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;

