import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../redux/productSlice"
import NavBar from "../components/NavBar"
import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import axios from "axios"

const Products = () => {
    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.products)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => { dispatch(getProducts()) }, [dispatch])
    const categories = [...new Set(products.map((product) => product.category))];

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [sortBy, setSortBy] = useState("")

    // Función para manejar la calificación
    const StarRating = ({ productId, initialRating = 0 }) => {
        const [rating, setRating] = useState(initialRating);
        const [hover, setHover] = useState(null);

        const handleRating = async (newRating) => {
            setRating(newRating); // Actualiza el estado con la nueva calificación

            try {
                await axios.post(`http://localhost:8080/api/admin/${productId}/rate`, {
                    rating: newRating,
                    userId: user._id, // Asegúrate de enviar el ID del usuario que califica
                    comment: "Comentario de prueba" // Puedes cambiar esto según tus necesidades
                });
                console.log("Calificación enviada:", newRating);
            } catch (error) {
                console.error("Error al enviar la calificación", error);
            }
        };

        return (
            <div className="flex text-yellow-500">
                {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <FaStar
                            key={index}
                            className={`cursor-pointer transition-colors duration-200 ${(hover || rating) >= starValue ? "text-yellow-500" : "text-gray-300"
                                }`}
                            onClick={() => handleRating(starValue)}
                            onMouseEnter={() => setHover(starValue)}
                            onMouseLeave={() => setHover(null)}
                            size={24} // Ajusta el tamaño de las estrellas
                        />
                    );
                })}
            </div>
        );
    };

    const priceOffer = (product) => {
        if (product.discount?.percentage > 0) {
            const discount = (product.price * product.discount.percentage) / 100;
            return product.price - discount;
        }
        return product.price;
    };

    const filteredProducts = products
        .filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((product) => (category ? product.category === category : true))
        .sort((a, b) => {
            if (sortBy === "price-asc") return a.price - b.price;
            if (sortBy === "price-desc") return b.price - a.price;
            if (sortBy === "alpha-asc") return a.name.localeCompare(b.name);
            if (sortBy === "alpha-desc") return b.name.localeCompare(a.name);
            if (sortBy === "rating") return b.ratings.avarage - a.ratings.avarage;
            return 0;
        });

    return (
        <div className="p-4">
            <NavBar />
            <h1 className="text-3xl font-black text-center py-5">Productos</h1>
            <div className="space-y-2 flex-col items-center justify-center mx-auto lg:flex lg:flex-row lg:space-x-2 lg:space-y-0 lg:items-center lg:justify-center">
                {/* Barra de búsqueda */}
                <input type="text" placeholder="Buscar producto..." value={search}
                    onChange={(e) => setSearch(e.target.value)} className="border p-2 rounded-xl w-full sm:w-80 lg:w-96"
                />

                {/* Filtro por categoría */}
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 sm:ml-2 rounded-xl w-full sm:w-48 lg:w-96">
                    <option value="">Todas las categorías</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                {/* Ordenar productos */}
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border p-2 sm:ml-2 rounded-xl w-full sm:w-48 lg:w-96">
                    <option value="">Ordenar por...</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                    <option value="alpha-asc">Orden Alfabético</option>
                    <option value="rating">Mejor Valorados</option>
                </select>
            </div>

            <div className="grid grid-cols gap-4 sm:w-full sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="p-4 shadow-lg flex-col rounded-xl bg-white hover:shadow-xl transition-shadow duration-300">
                        <img src={product.images} alt={product.name} className="h-60 w-full sm:w-60 object-cover rounded-md mx-auto" />
                        <Link to={`/product/${product._id}`} className="text-center text-xl font-bold md:min-h-15 hover:underline">{product.name}</Link>
                        {/* Si el usuario no es mayorista, mostramos el precio con descuento */}
                        {user.isWholesale === false ? (
                            <div>
                                {product.discount?.percentage > 0 ? (
                                    <p className="text-red-600 font-bold text-lg">
                                        ${priceOffer(product).toFixed(2)}
                                        <span className="text-gray-500 line-through ml-2 text-sm">
                                            ${product.price.toFixed(2)}
                                        </span>
                                    </p>
                                ) : (
                                    <p className="text-gray-600 text-lg">${product.price.toFixed(2)}</p>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-lg">${product.priceWholesale.toFixed(2)}</p>
                        )}
                        {user.isWholesale || <p className="text-gray-600">{product.minQuantityWholesale}</p>}
                        {/* Estrellas clickeables */}
                        <StarRating productId={product._id} initialRating={product.ratings?.average || 0} />

                        {product.stock > 0 ? (
                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2 mx-auto">Agregar al carrito</button>
                        ) : (
                            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2 mx-auto" disabled>Sin stock</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products