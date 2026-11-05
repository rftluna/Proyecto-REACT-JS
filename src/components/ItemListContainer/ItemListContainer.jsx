import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"; 
import { Container, Spinner, Alert, Row, Col, Card } from "react-bootstrap";

export const ItemListContainer = () => {
    const [allProducts, setAllProducts] = useState([]); 
    const [loading, setLoading] = useState(true);
    const { category } = useParams(); 

    useEffect(() => {
        const productosRef = collection(db, "products");

        getDocs(productosRef)
            .then((snapshot) => {
                const listaCompleta = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setAllProducts(listaCompleta);
            })
            .catch((error) => {
                console.error("Error al conectar con Firestore: ", error);
            })
            .finally(() => setLoading(false));
    }, []); 

    const productosFiltrados = category
        ? allProducts.filter((p) => p.category?.toLowerCase() === category.toLowerCase())
        : allProducts;

    if (loading) {
        return (
            <Container className="text-center my-5 py-5">
                <Spinner animation="border" variant="primary" className="mb-2" />
                <p className="text-muted fw-bold">Actualizando catálogo deportivo...</p>
            </Container>
        );
    }

    return (
        <Container className="my-4">
            <h2 className="text-center text-uppercase mb-4 fw-bold text-dark border-bottom pb-2">
                {category ? `Sección: ${category}` : "Catálogo General de Productos"}
            </h2>
            
            {productosFiltrados.length > 0 ? (
                <Row className="g-4">
                    {productosFiltrados.map((prod) => (
                        <Col key={prod.id} xs={12} sm={6} md={4} className="d-flex justify-content-center">
                            <Card className="shadow-sm h-100 border-0 rounded-3 text-center" style={{ width: "18rem", overflow: "hidden" }}>
                                <div style={{ height: "250px", overflow: "hidden", backgroundColor: "#f8f9fa" }}>
                                    <Card.Img 
                                        variant="top" 
                                        src={prod.image} 
                                        alt={prod.name}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </div>
                                <Card.Body className="d-flex flex-column justify-content-between p-3" style={{ backgroundColor: "#2e384d", color: "#fff" }}>
                                    <div>
                                        <Card.Title className="fs-6 fw-bold mb-2 text-truncate text-uppercase text-white">{prod.name}</Card.Title>
                                        
                                        {/* 🔥 CORRECCIÓN: Quitamos text-muted y fijamos el texto en color blanco */}
                                        <Card.Text className="small mb-3 text-truncate-2" style={{ color: "#ffffff", opacity: 0.9, fontSize: "12px", height: "36px", overflow: "hidden" }}>
                                            {prod.description}
                                        </Card.Text>
                                    </div>
                                    <div>
                                        <h5 className="fw-bold mb-3 text-white">${prod.price}</h5>
                                        <Link to={`/product/${prod.id}`} className="btn btn-primary w-100 fw-bold rounded-pill btn-sm">
                                            Ver detalles del producto
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="text-center py-4">
                    <Alert variant="info" className="d-inline-block px-5 shadow-sm rounded-pill fw-bold">
                        No se encontraron artículos cargados en la sección "{category}" 😕
                    </Alert>
                </div>
            )}
        </Container>
    );
};
