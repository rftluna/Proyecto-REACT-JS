import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../../utils/validateProduct";
import { uploadImage } from "../../../services/uploadImage";
import { createProduct } from "../../../services/productsService";
import { toast } from "react-toastify"; // IMPORTAMOS TOASTIFY PARA LAS ALERTAS ANIMADAS
import "./ProductFormContainer.css";

/*------------------------------------------------------------------------------*/
/*----------            EDITAR el utils/validateProduct.js         -------------*/
/*------------------------------------------------------------------------------*/

//En el caso de utilizar este formulario con doble uso (carga y edicion) el archivo que valida las entradas
// del producto deberia evaluar el caso de la imagen existente.
//Evalua file, para la carga de foto nueva y product.image cuande viene de DB

export const ProductFormContainer = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Capturamos el ID de la URL si estamos editando

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState(null);
    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "" // Agregamos image por si viene de la base de datos al editar
    });

    // Si hay un ID, es porque es para editar. Buscamos el producto en Firestore para rellenar el formulario (Modo Edición)
    useEffect(() => {
        if (id) {
            const fetchProductToEdit = async () => {
                try {
                    setLoading(true);
                    const docRef = doc(db, "products", id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setProduct(docSnap.data());
                    } else {
                        toast.error("❌ El producto que intentas editar no existe.");
                    }
                } catch (error) {
                    console.error("Error al obtener el producto para editar: ", error);
                    toast.error("💥 Error de conexión al cargar datos del producto.");
                } finally {
                    setLoading(false);
                }
            };
            fetchProductToEdit();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0] || null;
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        // Validar inputs (si estás editando y no cambias la imagen, puedes ajustar tu validador si es necesario)
        const newErrors = validateProduct({ ...product, file });
        if (Object.keys(newErrors).length > 0 && !id) {
            setErrors(newErrors);
            setLoading(false);
            toast.warn("⚠️ Revisa los campos obligatorios del formulario.");
            return;
        }

        try {
            //Ahora maneja 2 casos: nuevo y edit. La imagen puede existir
            let imageUrl = product.image;

            // Si el usuario seleccionó una nueva imagen al editar o crear, la subimos
            if (file) {
                imageUrl = await uploadImage(file); //subir la imagen, con el retorno de imgBB (nueva URL)
            }
            // armar el producto completo
            const productData = {
                ...product,
                price: Number(product.price),
                image: imageUrl
            };

            if (id) {
                //este id viene se useParams para actualizar o modificar el producto
                // MODO EDICIÓN: Actualizamos el documento existente
                const docRef = doc(db, "products", id);
                await updateDoc(docRef, productData);

                // DISPARAMOS NOTIFICACIÓN FLOTANTE DE ÉXITO AL EDITAR
                toast.success("📝 ¡Producto actualizado con éxito!", {
                    position: "top-right",
                    autoClose: 2500
                });

                navigate("/admin/products", { replace: true });
            } else {
                // MODO CREACIÓN: Alta de un producto nuevo
                const newId = await createProduct(productData);

                // DISPARAMOS NOTIFICACIÓN FLOTANTE DE ÉXITO AL CREAR UNO NUEVO
                toast.success("🆕 ¡Producto creado y añadido al catálogo!", {
                    position: "top-right",
                    autoClose: 2500
                });

                // vaciar
                setProduct({ name: "", price: "", category: "", description: "", image: "" });
                setFile(null);
                navigate(`/admin/products/success/${newId}`, { replace: true });
            }
        } catch (error) {
            setErrors({ general: error.message });
            toast.error(`❌ Error al procesar el producto: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProductFormUI
            product={product}
            errors={errors}
            loading={loading}
            isEditing={Boolean(id)} // Indicador útil por si se quiere cambiar el título en la UI
            onChange={handleChange}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
        />
    );
};
