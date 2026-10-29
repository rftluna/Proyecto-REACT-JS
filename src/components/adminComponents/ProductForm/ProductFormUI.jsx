export const ProductFormUI = ({
    product,
    errors,
    loading,
    isEditing, // Recibimos esta prop para saber si estamos editando o creando
    onChange,
    onFileChange,
    onSubmit
}) => {
    return (
        <section>
            <form className="product-form" onSubmit={onSubmit}>
                <h2>{isEditing ? "Modificar producto" : "Agregar nuevo producto"}</h2>

                <div>
                    <label>Nombre:</label>
                    <input type="text" name="name" value={product.name} onChange={onChange} />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <div>
                    <label>Precio:</label>
                    <input type="number" name="price" value={product.price} onChange={onChange} min="0" />
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>

                <div>
                    <label>Categoría:</label>
                    <input type="text" name="category" value={product.category} onChange={onChange} />
                    {errors.category && <p className="error">{errors.category}</p>}
                </div>

                <div>
                    <label>Descripción:</label>
                    <textarea name="description" value={product.description} onChange={onChange} />
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>

                <div>
                    <label>Imagen:</label>
                    {/* Vista previa de la imagen actual si estamos editando */}
                    {product.image && (
                        <div style={{ margin: "8px 0" }}>
                            <p style={{ fontSize: "12px", color: "#aaa" }}>Imagen actual:</p>
                            <img src={product.image} alt="Vista previa" style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "4px" }} />
                        </div>
                    )}
                    <input type="file" accept="image/*" onChange={onFileChange} />
                    <small style={{ display: "block", fontSize: "11px", color: "#888", marginTop: "3px" }}>
                        {isEditing ? "Deja este campo vacío si deseas conservar la imagen actual." : ""}
                    </small>
                    {errors.file && <p className="error">{errors.file}</p>}
                </div>

                <button className="btn bg-primary" type="submit" disabled={loading}>
                    {loading ? "Guardando..." : isEditing ? "Actualizar producto" : "Guardar"}
                </button>

                {errors.general && <p className="error">{errors.general}</p>}
            </form>
        </section>
    );
};
