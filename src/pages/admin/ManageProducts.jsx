import { toast } from "react-toastify";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../../redux/adminSlice";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.admin);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({ name: "", price: "", stock: "" });
    const [product, setProduct] = useState({
        name: "",
        description: "",
        priceRetail: "",
        priceWholesale: "",
        stock: "",
        image: "",
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

        if (!product.name || !product.priceRetail || !product.priceWholesale || !product.stock) {
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
                name: "",
                description: "",
                priceRetail: "",
                priceWholesale: "",
                stock: "",
                image: "",
                category: "",
                minPurchase: "",
            });
        } catch (err) {
            toast.error(`Error al agregar producto: ${err.message || "Ocurrió un error"}`);
        }
    };

    const handleSave = useCallback(() => {
        dispatch(updateProduct({ id: selectedProduct._id, product: selectedProduct }))
            .unwrap()
            .then(() => {
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
            <li key={product._id} className="mb-4 p-4 bg-white shadow-lg rounded-lg flex justify-between items-center hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100">
                <span className="font-semibold text-gray-800">{product.name} - ${product.priceRetail}</span>
                <div className="flex gap-2">
                    <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 transform hover:scale-105"
                        onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }}
                        aria-label={`Editar ${product.name}`}
                    >
                        Editar
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 transform hover:scale-105"
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
        <div className="p-8 bg-gray-50 min-h-screen">
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
            <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg mb-6 transition-all duration-300 transform hover:scale-105 hover:bg-gray-100">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Agregar Nuevo Producto</h3>
                <div className="grid grid-cols-2 gap-4">
                    <label className="flex flex-col">
                        <span className="text-sm text-gray-600 mb-1">Nombre</span>
                        <input type="text" name="name" value={product.name} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" required />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-sm text-gray-600 mb-1">Descripción</span>
                        <input type="text" name="description" value={product.description} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-sm text-gray-600 mb-1">Precio minorista</span>
                        <input type="number" name="priceRetail" value={product.priceRetail} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" required />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-sm text-gray-600 mb-1">Precio mayorista</span>
                        <input type="number" name="priceWholesale" value={product.priceWholesale} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" required />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-sm text-gray-600 mb-1">Categoría</span>
                        <input type="text" name="category" value={product.category} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-sm text-gray-600 mb-1">Stock</span>
                        <input type="number" name="stock" value={product.stock} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" required />
                    </label>
                    <label className="flex flex-col col-span-2">
                        <span className="text-sm text-gray-600 mb-1">Imagen (URL)</span>
                        <input type="text" name="image" value={product.image} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-sm text-gray-600 mb-1">Compra mínima</span>
                        <input type="number" name="minPurchase" value={product.minPurchase} onChange={handleChanges} className="p-3 border rounded-lg transition duration-300 ease-in-out hover:bg-gray-100" />
                    </label>
                </div>
                <button type="submit" className="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105" disabled={loading}>
                    {loading ? "Agregando..." : "Agregar Producto"}
                </button>
            </form>

            {/* Lista de productos */}
            <ul className="space-y-4">{productList}</ul>

            {/* Modal de Edición */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Editar Producto" onSave={handleSave}>
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
