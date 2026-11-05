import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // IMPORTAMOS TOASTIFY

/* -------------------------------------------------------------------------- */
/*                              CREAMOS CONTEXTO                              */
/* -------------------------------------------------------------------------- */

const CartContext = createContext();

/* -------------------------------------------------------------------------- */
/*                                 CUSTOM HOOK                                */
/* -------------------------------------------------------------------------- */

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }

    return context;
};

/* -------------------------------------------------------------------------- */
/*                         CONVERSION DE PRECIOS                              */
/* -------------------------------------------------------------------------- */

const parsePrice = (price) => {
    if (typeof price === "number") {
        return Number.isFinite(price) ? price : 0;
    }

    if (price == null || String(price).trim() === "") {
        return 0;
    }

    let normalizedPrice = String(price)
        .trim()
        .replace(/[^\d,.-]/g, "");

    // Formato argentino con coma decimal: 12.500,50
    if (normalizedPrice.includes(",")) {
        normalizedPrice = normalizedPrice.replace(/\./g, "").replace(",", ".");
    } else {
        // Separador de miles argentino: 12.500
        normalizedPrice = normalizedPrice.replace(/\.(?=\d{3}(?:$|[^0-9]))/g, "");
    }

    const parsedPrice = Number(normalizedPrice);

    return Number.isFinite(parsedPrice) ? parsedPrice : 0;
};

/* -------------------------------------------------------------------------- */
/*                                  PROVEEDOR                                 */
/* -------------------------------------------------------------------------- */

export const CartProvider = ({ children }) => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    // Agregar productos o incrementar la cantidad si ya existen.
    const addItem = (item) => {
        // Mantenemos esta constante viva para que no tire error de referencia de JavaScript
        const alreadyExists = cart.some((element) => element.id === item.id);

        setCart((previousCart) => {
            const existingProduct = previousCart.find((element) => element.id === item.id);

            if (existingProduct) {
                return previousCart.map((element) =>
                    element.id === item.id
                        ? {
                              ...element,
                              quantity: (Number(element.quantity) || 1) + 1
                          }
                        : element
                );
            }

            return [
                ...previousCart,
                {
                    ...item,
                    quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1
                }
            ];
        });

        // 🔥 CORRECCIÓN CLAVE: Dejamos la lógica limpia. Ya no lanzamos alertas duplicadas acá adentro
        // porque de eso se encarga exclusivamente ItemDetail.jsx al finalizar la barra de carga.
    };

    // Eliminar completamente un producto del carrito.
    const removeItem = (id) => {
        setCart((previousCart) => previousCart.filter((element) => element.id !== id));

        // Mantenemos la alerta de eliminación ya que solo ocurre en el carrito
        toast.warn("🗑️ Producto eliminado del carrito", {
            position: "top-right",
            autoClose: 2000,
            theme: "colored"
        });
    };

    // Vaciar el carrito.
    const clearCart = () => {
        setCart([]);
    };

    // Contar todas las unidades, incluyendo productos repetidos.
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + (Number(item.quantity) || 1), 0);
    };

    // Calcular el total numérico de la compra.
    const getCartTotal = () => {
        return cart.reduce((total, item) => {
            const price = parsePrice(item.price);
            const quantity = Number(item.quantity) || 1;

            return total + price * quantity;
        }, 0);
    };

    // Checkout.
    const checkout = () => {
        toast.success("🥳 ¡Su compra ha sido realizada con éxito!", {
            position: "top-right",
            autoClose: 3500,
            theme: "colored"
        });
        clearCart();
        navigate("/");
    };

    const values = {
        cart,
        addItem,
        clearCart,
        removeItem,
        getCartTotal,
        getTotalItems,
        checkout
    };

    return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
