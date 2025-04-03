import { toast } from "react-toastify";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../../redux/productSlice";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import { create } from "framer-motion/client";

const ManageProducts = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({ name: "", price: "", stock: "" });
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        priceWholesale: "",
        stock: "",
        images: "",
        category: "",
        minPurchase: "",
    });

    const navigate = useNavigate();

    const handlerBackToDashboard = () => {
        navigate("/dashboard");
    };

    useEffect(() => {
        if (!products.length) dispatch(getProducts());
    }, [dispatch, products.length]);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value || "",
        }));
    };

    const handleChangeModal = (e) => {
        const { name, value } = e.target;
        setSelectedProduct((prev) => ({
            ...prev,
            [name]: value || "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.name || !product.price || !product.priceWholesale || !product.stock) {
            toast.error("Todos los campos obligatorios deben ser completados");
            return;
        }

        try {
            await dispatch(createProduct(product)).unwrap();
            toast.success("✅ Producto creado correctamente", {
                icon: "🛒",
                style: { backgroundColor: "#2196F3", color: "white" },
            });

            setProduct({
                sku: "",
                name: "",
                description: "",
                category: "",
                price: "",
                priceWholesale: "",
                stock: "",
                images: "",
                colors: "",
                sizes: "",
                weight: "",
                dimensions: {
                    depth: "",
                    width: "",
                    height: "",
                },
                isActive: true,
                isFeatured: false,
                isNewProduct: true,
                discount: {
                    porcentage: 0,
                    validUntil: "",
                },
                ratings: {
                    average: 0,
                    reviews: [
                        {
                            user: "",
                            comment: "",
                            rating: 0,
                            createdAt: "",
                        },
                    ],
                },
            });
        } catch (err) {
            toast.error(`Error al agregar producto: ${err.message || "Ocurrió un error"}`);
        }
    };

    const handleSave = useCallback(() => {
        dispatch(updateProduct({ id: selectedProduct._id, ...selectedProduct }))
            .unwrap()
            .then(() => {
                dispatch(getProducts()); // 🔄 Refrescar productos
                toast.success("✅ Producto actualizado correctamente", {
                    icon: "🛒",
                    style: { backgroundColor: "#2196F3", color: "white" },
                });
                setIsModalOpen(false);
            })
            .catch((err) => {
                toast.error(`Error al actualizar producto: ${err.message || "Ocurrió un error"}`);
            });

    }, [dispatch, selectedProduct]);

    const handleDelete = useCallback((id) => {
        dispatch(deleteProduct(id))
            .unwrap()
            .then(() => {
                toast.error("❌ Producto eliminado", {
                    icon: "⚠️",
                    style: { backgroundColor: "#FF9800", color: "white" },
                });
            })
            .catch((err) => {
                toast.error(`Error al eliminar producto: ${err.message || "Ocurrió un error"}`);
            });
    }, [dispatch]);

    const productList = useMemo(() => (
        products.map((product) => (
            <li key={product._id} className="p-4 mx-auto w-full md:w-[40vw] lg:w-[33,3vw] bg-white shadow-lg rounded-lg flex-col sm:flex-none justify-between items-center hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100">
                <span className="font-semibold text-gray-800">{product.name} - ${product.price}</span>
                <div className="flex gap-2">
                    <button
                        className="bg-yellow-500 text-white px-3 py-0.5 rounded-lg hover:bg-yellow-600 transition duration-200 transform hover:scale-105"
                        onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }}
                        aria-label={`Editar ${product.name}`}
                    >
                        Editar
                    </button>
                    <button
                        className="bg-red-500 text-white px-3 py-0.5 rounded-lg hover:bg-red-600 transition duration-200 transform hover:scale-105"
                        onClick={() => handleDelete(product._id)}
                        aria-label={`Eliminar ${product.name}`}
                    >
                        Eliminar
                    </button>
                </div>
            </li>
        ))
    ), [products, handleDelete]);

    return (
        <div className="p-8 bg-gray-50 min-h-screen max-w-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 animate__animated animate__fadeIn animate__delay-1s">Gestión de Productos</h1>
            <button
                onClick={handlerBackToDashboard}
                className="bg-blue-500 text-white p-3 rounded-lg mb-6 transition-all duration-300 transform hover:scale-105 hover:bg-blue-600"
            >
                Volver al Dashboard
            </button>
            {/* Estado de carga y errores */}
            {loading && <p className="text-gray-500 animate__animated animate__fadeIn animate__delay-2s">Cargando productos...</p>}
            {error && <p className="text-red-500 animate__animated animate__fadeIn animate__delay-2s">{error?.message || "Ocurrió un error"}</p>}

            {/* Formulario para agregar productos */}
            <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 mx-auto scale-95 rounded-lg mb-6 transition-all duration-300 transform hover:scale-100 hover:bg-gray-100">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Agregar Nuevo Producto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex flex-col col-span-2 md:col-span-1">
                        <span className="text-sm text-gray-600 mb-1">Nombre</span>
                        <input type="text" name="name" value={product.name} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" required />
                    </label>
                    <label className="flex flex-col col-span-2 md:col-span-1">
                        <span className="text-sm text-gray-600 mb-1">Descripción</span>
                        <input type="text" name="description" value={product.description} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                    </label>
                    <label className="flex flex-col col-span-2 md:col-span-1">
                        <span className="text-sm text-gray-600 mb-1">Precio minorista</span>
                        <input type="number" name="price" value={product.price} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" required />
                    </label>
                    <label className="flex flex-col col-span-2 md:col-span-1">
                        <span className="text-sm text-gray-600 mb-1">Precio mayorista</span>
                        <input type="number" name="priceWholesale" value={product.priceWholesale} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" required />
                    </label>
                    <label className="flex flex-col col-span-2 md:col-span-1">
                        <span className="text-sm text-gray-600 mb-1">Categoría</span>
                        <input type="text" name="category" value={product.category} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                    </label>
                    <label className="flex flex-col col-span-2 md:col-span-1">
                        <span className="text-sm text-gray-600 mb-1">Stock</span>
                        <input type="number" name="stock" value={product.stock} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" required />
                    </label>
                    <label className="flex flex-col col-span-2">
                        <span className="text-sm text-gray-600 mb-1">Imagen (URL)</span>
                        <input type="text" name="images" value={product.images} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                    </label>
                    <label className="flex flex-col col-span-2 md:col-span-1">
                        <span className="text-sm text-gray-600 mb-1">Compra mínima</span>
                        <input type="number" name="minPurchase" value={product.minPurchase} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                    </label>
                    <label className="flex flex-col col-span-2 md:col-span-1">
                        <span className="text-sm text-gray-600 mb-1">SKU</span>
                        <input type="text" name="sku" value={product.sku} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                    </label>
                    <label className="flex flex-col col-span-2 md:col-span-1">
                        <span className="text-sm text-gray-600 mb-1">Colores</span>
                        <input type="text" name="colors" value={product.colors} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                    </label>
                    <label className="flex flex-col col-span-2 md:col-span-1">
                        <span className="text-sm text-gray-600 mb-1">Tamaños</span>
                        <input type="text" name="sizes" value={product.sizes} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                    </label>
                    <label className="flex flex-col col-span-2 md:col-span-1">
                        <span className="text-sm text-gray-600 mb-1">Peso</span>
                        <input type="number" name="weight" value={product.weight} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                    </label>
                    <label className="flex flex-col col-span-2 md:col-span-1">
                        <span className="text-sm text-gray-600 mb-1">Descuento</span>
                        <input type="number" name="porcentage" value={product.discount?.porcentage} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100 mb-2" />
                        <input type="date" name="validUntil" value={product.discount?.validUntil} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                    </label>
                    <label className="flex flex-col col-span-2 md:col-span-1 md:-translate-y-15">
                        <span className="text-sm text-gray-600 mb-1">Dimensiones</span>
                        <input type="number" name="width" value={product.dimensions?.width} placeholder="Ancho" onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                        <input type="number" name="height" value={product.dimensions?.height} placeholder="Alto" onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100 my-2" />
                        <input type="number" name="depth" value={product.dimensions?.depth} placeholder="Espesor" onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                    </label>
                    <label className="flex flex-col col-span-2 md:col-span-1">
                        <span className="text-sm text-gray-600 mb-1">Estado</span>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <span className="text-sm text-gray-600 mb-1">Activo</span>
                            <input type="checkbox" name="isActive" checked={product.isActive} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                            <span className="text-sm text-gray-600 mb-1">Destacado</span>
                            <input type="checkbox" name="isFeatured" checked={product.isFeatured} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                            <span className="text-sm text-gray-600 mb-1">Nuevo</span>
                            <input type="checkbox" name="isNewProduct" checked={product.isNewProduct} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                        </div>
                    </label>
                </div>
                <button type="submit" className="w-auto bg-blue-500 text-white py-3 px-5 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105" disabled={loading}>
                    {loading ? "Agregando..." : "Agregar Producto"}
                </button>
            </form>

            {/* Lista de productos */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">{productList}</ul>

            {/* Modal de Edición */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Editar Producto" onSave={handleSave}>
                    <label className="flex flex-col">
                        <span className="text-sm text-gray-600 mb-1">Imagen</span>
                        <input type="text" name="images" value={selectedProduct.images} onChange={handleChangeModal} className="p-3 border rounded-lg mb-4" />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-sm text-gray-600 mb-1">Nombre</span>
                        <input type="text" name="name" value={selectedProduct.name} onChange={handleChangeModal} className="p-3 border rounded-lg mb-4" />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-sm text-gray-600 mb-1">Precio</span>
                        <input type="number" name="price" value={selectedProduct.price} onChange={handleChangeModal} className="p-3 border rounded-lg mb-4" />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-sm text-gray-600 mb-1">Stock</span>
                        <input type="number" name="stock" value={selectedProduct.stock} onChange={handleChangeModal} className="p-3 border rounded-lg" />
                    </label>
                </Modal>
            )}
        </div>
    );
};

export default ManageProducts;
