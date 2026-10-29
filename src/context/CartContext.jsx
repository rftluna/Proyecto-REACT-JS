import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

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

        if (alreadyExists) {
            alert("Se agregó una unidad más del producto 🛒");
        } else {
            alert("Producto agregado al carrito 🎉");
        }
    };

    // Eliminar completamente un producto del carrito.
    const removeItem = (id) => {
        setCart((previousCart) => previousCart.filter((element) => element.id !== id));

        alert("Producto eliminado ✅");
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
        alert("Su compra ha sido realizada 🎉");
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
