import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/Cart/CartView";

import { ProductFormContainer } from "./components/adminComponents/ProductForm/ProductFormContainer";
import { ProductSuccess } from "./components/adminComponents/ProductSuccess";
import { Dashboard } from "./components/adminComponents/Dashboard/Dashboard";

import { Login } from "./components/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";

function App() {
    return (
        <Routes>
            {/*-------------------------------- RUTAS PUBLICAS -------------------------------- */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<ItemListContainer />} />

                {/*-------------------------------- RUTAS PUBLICAS -------------------------------- */}
                {/* Ruta opcional para filtrar categorias */}

                <Route path="/category/:category" element={<ItemListContainer />} />

                <Route path="/product/:id" element={<ItemDetailContainer />} />

                <Route path="/cart" element={<CartView />} />
            </Route>
            {/* LOGIN DE ADMINISTRACIÓN */} {/* Login por fuera de AdminLayout para acceder si no estamos logueados */}
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
            </Route>
        </Routes>
    );
}

export default App;
