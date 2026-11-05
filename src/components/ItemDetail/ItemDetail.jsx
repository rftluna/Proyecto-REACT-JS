import { useState } from "react";
import { Item } from "../Item/Item";
import { useCart } from "../../context/CartContext";
import { ProgressBar } from "react-bootstrap";
import { toast } from "react-toastify";
import "./ItemDetail.css";

export const ItemDetail = ({ item }) => {
    const { addItem, cart } = useCart();

    // Estados para controlar la barra de carga interna del producto
    const [progreso, setProgreso] = useState(0);
    const [subiendo, setSubiendo] = useState(false);

    const manejarAgregarConCarga = () => {
        if (subiendo) return; // Evita doble clic mientras carga

        setSubiendo(true);
        setProgreso(0);

        // Comprobamos si el producto ya existe en el carrito
        const yaExiste = cart.some((element) => element.id === item.id);

        const intervalo = setInterval(() => {
            setProgreso((prev) => {
                if (prev >= 100) {
                    clearInterval(intervalo);
                    setSubiendo(false);

                    // 1. Agregamos el producto de forma real al contexto global
                    addItem(item);

                    // 🔥 EL ESCUDO DEFINITIVO: Limpiamos la cola de espera de Toastify
                    // Esto destruye instantáneamente cualquier duplicado provocado por el StrictMode en localhost
                    toast.clearWaitingQueue();

                    // 2. Disparamos la alerta correspondiente una única vez usando toastId fijo
                    if (yaExiste) {
                        toast.info("✨ Se agregó una unidad más del producto 🛒", {
                            position: "top-right",
                            autoClose: 2000,
                            theme: "colored",
                            toastId: `info-${item.id}` // Bloquea duplicación por ID idéntico
                        });
                    } else {
                        toast.success(`🛒 ¡${item.name || "Producto"} añadido al carrito con éxito!`, {
                            position: "top-right",
                            autoClose: 2000,
                            theme: "colored",
                            toastId: `success-${item.id}` // Bloquea duplicación por ID idéntico
                        });
                    }

                    return 100;
                }
                return prev + 25;
            });
        }, 120);
    };

    return (
        <div className="detail-wrapper d-flex flex-column align-items-center">
            <Item {...item}>
                <button className="btn btn-primary w-100 fw-bold mt-2" onClick={manejarAgregarConCarga} disabled={subiendo}>
                    {subiendo ? "Procesando..." : "Agregar al carrito"}
                </button>
            </Item>

            {/* BARRA DE ESTADO DE CARGA ANIMADA */}
            {subiendo && (
                <div style={{ width: "100%", maxWidth: "300px", marginTop: "12px" }}>
                    <small className="text-muted d-block text-center mb-1" style={{ fontSize: "11px" }}>
                        Conectando con el carrito... {progreso}%
                    </small>
                    <ProgressBar animated now={progreso} variant="success" style={{ height: "10px", borderRadius: "4px" }} />
                </div>
            )}
        </div>
    );
};
