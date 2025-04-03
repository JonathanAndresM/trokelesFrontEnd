import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Carousel = () => {
  const { products } = useSelector((state) => state.products);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setFeaturedProducts(
      products.filter(
        (product) => product.isFeatured || product.isNew || product.discount?.percentage > 0
      )
    );
  }, [products]);

  // Función para obtener la cantidad de productos visibles según el tamaño de pantalla
  const getVisibleItems = () => {
    if (window.innerWidth < 640) return 1; // Móvil: 1 producto
    if (window.innerWidth < 1024) return 2; // Tablet: 2 productos
    if (window.innerWidth < 1280) return 3; // Laptop: 3 productos
    return 4; // Escritorio grande: 4 productos
  };

  const [visibleItems, setVisibleItems] = useState(getVisibleItems());

  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Función para calcular el índice del próximo slide
  const getNextIndex = () => {
    return (currentIndex + visibleItems) % featuredProducts.length;
  };

  // Auto-slide cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(getNextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, visibleItems, featuredProducts.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex / featuredProducts.length) * 100}%)`,
          width: `${(featuredProducts.length / visibleItems) * 100}%`,
        }}
      >
        {featuredProducts.concat(featuredProducts).map((product, index) => (
          <motion.div
            key={`${product._id || `product-${index}`}-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-shrink-0 w-full md:w-[50vw] lg:w-[33.3vw] xl:w-[25vw] px-2"
          >
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
