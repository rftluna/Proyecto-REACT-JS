import { Form, Button, ProgressBar, Card, Container } from "react-bootstrap";

export const ProductFormUI = ({ product, errors, loading, isEditing, onChange, onFileChange, onSubmit }) => {
    return (
        <Container className="my-4" style={{ maxWidth: "600px" }}>
            <Card className="shadow p-4">
                <Form onSubmit={onSubmit}>
                    <h2 className="text-center mb-4 text-secondary">{isEditing ? "⚙️ Modificar Producto" : "📦 Agregar Nuevo Producto"}</h2>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Nombre:</Form.Label>
                        <Form.Control type="text" name="name" value={product.name} onChange={onChange} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Precio:</Form.Label>
                        <Form.Control type="number" name="price" value={product.price} onChange={onChange} min="0" isInvalid={!!errors.price} />
                        <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Categoría:</Form.Label>
                        <Form.Control type="text" name="category" value={product.category} onChange={onChange} isInvalid={!!errors.category} />
                        <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Descripción:</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={product.description} onChange={onChange} isInvalid={!!errors.description} />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-bold">Imagen del producto:</Form.Label>

                        {/* Vista previa de la imagen actual con diseño de tarjeta pulido */}
                        {product.image && (
                            <div className="d-flex align-items-center gap-3 my-2 p-2 border rounded bg-light">
                                <img src={product.image} alt="Vista previa" style={{ width: "65px", height: "65px", objectFit: "cover", borderRadius: "6px" }} />
                                <div>
                                    <small className="text-muted d-block">Miniatura actual archivada</small>
                                </div>
                            </div>
                        )}

                        <Form.Control type="file" accept="image/*" onChange={onFileChange} isInvalid={!!errors.file} />
                        <Form.Text className="text-muted">{isEditing ? "Deja este campo vacío si deseas conservar la imagen actual." : "Selecciona un archivo de imagen nítido."}</Form.Text>
                        {errors.file && <div className="text-danger small mt-1">{errors.file}</div>}
                    </Form.Group>

                    {/* BARRA DE PROGRESO DE CARGA/GUARDADO (Solo visible al procesar) */}
                    {loading && (
                        <div className="mb-3">
                            <small className="text-primary d-block mb-1 fw-bold text-center">Subiendo y guardando especificaciones...</small>
                            <ProgressBar animated now={100} variant="success" style={{ height: "10px" }} />
                        </div>
                    )}

                    <Button variant="primary" type="submit" className="w-100 fw-bold py-2 mt-2" disabled={loading}>
                        {loading ? "Procesando cambios..." : isEditing ? "Actualizar Producto" : "Guardar Producto"}
                    </Button>

                    {errors.general && <p className="text-danger text-center small mt-3 fw-bold">{errors.general}</p>}
                </Form>
            </Card>
        </Container>
    );
};
