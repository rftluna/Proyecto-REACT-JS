import { useState } from "react"; // Importamos useState para controlar el Modal
import { useCart } from "../../context/CartContext";
import "./Cart.css";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Modal } from "react-bootstrap"; // Importamos Modal de Bootstrap
import { toast } from "react-toastify";
import { FaTrash, FaArrowLeft } from "react-icons/fa";

export const CartView = () => {
    const { cart, clearCart } = useCart();

    // Estado para controlar la apertura y cierre de la ventana de confirmación avanzada
    const [mostrarModal, setMostrarModal] = useState(false);

    const abrirConfirmacion = () => setMostrarModal(true);
    const cerrarConfirmacion = () => setMostrarModal(false);

    const confirmarVaciar = () => {
        clearCart(); // Vacía el carrito de forma real
        cerrarConfirmacion(); // Cierra el modal estilizado
        toast.info("🗑️ El carrito ha sido vaciado por completo.", {
            position: "top-right",
            autoClose: 2000,
            theme: "colored"
        });
    };

    return (
        <>
            {/* SÍMBOLOS SVG DE BOOTSTRAP (Oficiales de tu documentación con el xmlns corregido) */}
            <svg xmlns="http://w3.org" style={{ display: "none" }}>
                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </symbol>
                <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </symbol>
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </symbol>
            </svg>

            <Container className="cart-container my-5 p-4 rounded shadow-sm bg-white" style={{ maxWidth: "900px" }}>
                <h1 className="text-center mb-4 fw-bold text-dark">🛒 Tu Carrito de Compras </h1>

                {cart.length ? (
                    <>
                        <Row className="mb-4">
                            <Col>
                                <CartList />
                            </Col>
                        </Row>

                        <Row className="align-items-center bg-light p-3 rounded border g-3">
                            <Col md={8}>
                                <CartSummary />
                            </Col>
                            <Col md={4} className="text-md-end text-center">
                                {clearCart && (
                                    <Button variant="outline-danger" className="fw-bold d-inline-flex align-items-center gap-2" onClick={abrirConfirmacion}>
                                        <FaTrash /> Vaciar carrito
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </>
                ) : (
                    <div className="text-center py-5 d-flex flex-column align-items-center justify-content-center">
                        <div className="alert alert-warning d-flex align-items-center justify-content-center px-4 py-3 shadow-sm rounded-pill mb-4" role="alert">
                            <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                                <use xlinkHref="#exclamation-triangle-fill" />
                            </svg>
                            <div className="fw-bold">El carrito está vacío 😕</div>
                        </div>

                        <div>
                            <Link className="btn btn-primary fw-bold px-4 py-2 d-inline-flex align-items-center gap-2 shadow-sm" to={"/"}>
                                <FaArrowLeft /> Volver a la Tienda
                            </Link>
                        </div>
                    </div>
                )}
            </Container>

            {/* VENTANA EMERGENTE AVANZADA (MODAL DE BOOTSTRAP) */}
            <Modal show={mostrarModal} onHide={cerrarConfirmacion} centered backdrop="static">
                <Modal.Body className="p-4 text-center">
                    {/* Alerta de peligro oficial con icono SVG */}
                    <div className="alert alert-danger d-flex align-items-center justify-content-center px-3 py-2 mb-4 rounded-3" role="alert">
                        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                            <use xlinkHref="#exclamation-triangle-fill" />
                        </svg>
                        <div className="fw-bold fs-5">Atención Requerida</div>
                    </div>

                    <p className="fs-6 text-secondary mb-4">¿Estás seguro de que deseas quitar todos los productos del carrito? Esta acción no se puede deshacer.</p>

                    <div className="d-flex justify-content-center gap-3">
                        {/* 🔥 CORRECCIÓN: Agregamos variant="outline-dark" y estilos para asegurar texto negro legible */}
                        <Button variant="outline-dark" className="text-red fw-bold px-4 shadow-sm" onClick={cerrarConfirmacion} style={{ color: "#ec0d0d", borderColor: "#6c757d" }}>
                            Cancelar
                        </Button>
                        <Button variant="danger" className="fw-bold px-4 shadow-sm" onClick={confirmarVaciar}>
                            Aceptar
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};
