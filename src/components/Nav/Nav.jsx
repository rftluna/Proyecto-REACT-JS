
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Navbar, Nav as BootstrapNav, Container } from "react-bootstrap";
import "./Nav.css";

export const Nav = () => {
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();

    const navigate = useNavigate();
    const { category } = useParams();

    const [expanded, setExpanded] = useState(false);

    const manejarNavegacion = (ruta) => {
        navigate(ruta);
        setExpanded(false);
    };

    return (
        <Navbar
            expanded={expanded}
            onToggle={setExpanded}
            expand={false}
            variant="dark"
            className="nav-ecommerce"
        >
            <Container fluid className="nav-container">

                {/* BOTÓN HAMBURGUESA */}
                <Navbar.Toggle
                    aria-controls="navbar-ecommerce"
                    aria-label="Abrir menú de navegación"
                />

                {/* MENÚ */}
                <Navbar.Collapse
                    id="navbar-ecommerce"
                    className="nav-collapse"
                >
                    <BootstrapNav className="nav-items">

                        <BootstrapNav.Link
                            active={!category}
                            onClick={() => manejarNavegacion("/")}
                        >
                            Inicio
                        </BootstrapNav.Link>

                        <BootstrapNav.Link
                            active={category === "dama"}
                            onClick={() => manejarNavegacion("/category/dama")}
                        >
                            Dama
                        </BootstrapNav.Link>

                        <BootstrapNav.Link
                            active={category === "caballero"}
                            onClick={() => manejarNavegacion("/category/caballero")}
                        >
                            Caballero
                        </BootstrapNav.Link>

                        <BootstrapNav.Link
                            active={category === "infantil"}
                            onClick={() => manejarNavegacion("/category/infantil")}
                        >
                            Infantil
                        </BootstrapNav.Link>

                        {/* CARRITO */}
                        <BootstrapNav.Link
                            onClick={() => manejarNavegacion("/cart")}
                            className="cart-link"
                        >
                            🛒 Carrito

                            {totalItems > 0 && (
                                <span className="badge-cart-custom">
                                    {totalItems}
                                </span>
                            )}
                        </BootstrapNav.Link>

                    </BootstrapNav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
};
