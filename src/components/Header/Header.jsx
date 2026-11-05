import { Nav } from "../Nav/Nav";
import { Link } from "react-router-dom";
import logo from "../../assets/react.svg";
import "./Header.css";

export const Header = () => {
    return (
        <header>
            <div className="logo-container">
                <Link to={"/"}>
                    <img src={logo} alt="logo reactiva" />
                    <span>TIENDA DEPORTIVA 🚀</span>
                </Link>
            </div>
            <Nav />
        </header>
    );
};
