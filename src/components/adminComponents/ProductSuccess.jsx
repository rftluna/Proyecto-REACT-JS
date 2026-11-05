import { Link, useParams } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap"; // Importamos Bootstrap
import "./ProductSuccess.css";

export const ProductSuccess = () => {
    const { id } = useParams();

    return (
        <Container className="d-flex align-items-center justify-content-center my-5" style={{ minHeight: "60vh" }}>
            <Card className="shadow p-5 text-center border-0 rounded-4" style={{ maxWidth: "450px", backgroundColor: "#f8f9fa" }}>
                {/* Usamos las etiquetas de alerta oficiales de tu documentación para el icono */}
                <div className="alert alert-success d-inline-flex align-items-center justify-content-center rounded-circle mx-auto p-3 mb-4" style={{ width: "70px", height: "70px" }}>
                    <svg xmlns="http://w3.org" width="35" height="35" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                </div>

                <h2 className="fw-bold text-success mb-3">Producto Cargado con Éxito</h2>

                <div className="bg-white p-3 rounded-3 border mb-4 shadow-sm text-start">
                    <p className="mb-1 text-muted small fw-bold text-uppercase">Identificador único (Firestore):</p>
                    <code className="text-dark d-block text-break fs-6 bg-light p-2 rounded">{id}</code>
                </div>

                <p className="text-secondary mb-4 small">Las especificaciones, precio e imagen se guardaron correctamente en la base de datos distribuida.</p>

                <div className="success-actions">
                    <Link to="/admin" className="w-100 btn btn-success fw-bold py-2 shadow-sm">
                        ➕ Cargar otro producto
                    </Link>
                </div>
            </Card>
        </Container>
    );
};
