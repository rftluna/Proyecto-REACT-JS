
import { Nav } from "../Nav/Nav";
import { Link } from "react-router-dom";
import logo from "../../assets/react.svg";
import "./Header.css";

export const Header = () => {
    return (
        <header className="site-header">

            {/* LOGO ORIGINAL */}
            <div className="logo-container">
                <Link to="/">
                    <img src={logo} alt="Logo Reactiva" />
                    <span>TIENDA DEPORTIVA 🚀</span>
                </Link>
            </div>

            {/* NAVEGACIÓN */}
            <Nav />

        </header>
    );
};
