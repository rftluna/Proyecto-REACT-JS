import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Nav.css";

export const Nav = () => {
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();
    const navigate = useNavigate();
    const { category } = useParams(); // Detecta la sección activa para marcarla

    // Estado para ocultar/mostrar las categorías horizontales con el botón
    const [menuAbierto, setMenuAbierto] = useState(true);

    return (
        <nav className="navbar navbar-dark bg-dark shadow-sm w-100 py-2" style={{ minHeight: "65px" }}>
            <div className="container-fluid row align-items-center m-0 p-0 w-100 flex-nowrap">
                {/* COLUMNA IZQUIERDA (10%): Botón de 3 rayitas SIEMPRE VISIBLE */}
                <div className="col-2 d-flex justify-content-start ps-3">
                    <button className="btn btn-dark p-2 border-0" type="button" onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Toggle navigation" style={{ background: "transparent" }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                {/* COLUMNA CENTRAL (70%): Categorías horizontales flotando de forma equilibrada */}
                <div className="col-8 d-flex justify-content-center text-center">
                    {menuAbierto && (
                        <ul className="navbar-nav d-flex flex-row gap-2 gap-sm-3 m-0 p-0 list-unstyled bg-dark border border-secondary rounded-3 px-3 py-1 shadow">
                            <li className="nav-item">
                                <button className={`btn btn-link text-white nav-link p-1 small ${!category ? "fw-bold text-info" : ""}`} onClick={() => navigate("/")}>
                                    Inicio
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`btn btn-link text-white nav-link p-1 small ${category === "dama" ? "fw-bold text-info" : ""}`} onClick={() => navigate("/category/dama")}>
                                    Dama
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`btn btn-link text-white nav-link p-1 small ${category === "caballero" ? "fw-bold text-info" : ""}`} onClick={() => navigate("/category/caballero")}>
                                    Caballero
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`btn btn-link text-white nav-link p-1 small ${category === "infantil" ? "fw-bold text-info" : ""}`} onClick={() => navigate("/category/infantil")}>
                                    Infantil
                                </button>
                            </li>
                        </ul>
                    )}
                </div>

                {/* COLUMNA DERECHA (20%): Carrito estático */}
                <div className="col-2 d-flex justify-content-end pe-3">
                    <button className="btn btn-link text-white position-relative p-2 text-decoration-none fw-bold small" onClick={() => navigate("/cart")}>
                        🛒 Carrito
                        {totalItems > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.75rem" }}>
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};
