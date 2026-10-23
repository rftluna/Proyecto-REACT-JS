import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/Cart/CartView";
import { ProductFormContainer } from "./components/adminComponents/ProductForm/ProductFormContainer";
import { ProductSuccess } from "./components/adminComponents/ProductSuccess";

function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<ItemListContainer />} />
                    <Route /* Carrito */ path="/cart" element={<CartView />} />
                    <Route /* Productos del carrito */
                        path="/product/:id"
                        element={<ItemDetailContainer />}
                    />
                    <Route
                        path="/category/:category"
                        element={<ItemListContainer />}
                    />

                    {/* Administración de productos */}
                    <Route path="/admin" element={<ProductFormContainer />} />

                    {/* Confirmación de producto */}
                    <Route path="/admin/success" element={<ProductSuccess />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
