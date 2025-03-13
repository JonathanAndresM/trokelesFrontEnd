import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"


const Carousel = () => {
    const {products} = useSelector((state) => state.products)
    //const [featured, setFeatured] = useState([])
    const [featuredProducts, setFeaturedProducts] = useState([])

    /*useEffect(() => {
        setFeatured(products.filter((product) => product.featured))
    }, [products])*/
      useEffect(() => {
    setFeaturedProducts(products.filter((product) => product.isFeatured || product.isNew || product.discount.percentage > 0));
  }, [products]);

    return (
        <div className="flex gap-6 overflow-x-auto p-6 scrollbar-hide">
      {featuredProducts.length === 0 ? (
        <p className="text-center w-full text-gray-600">No hay productos aún.</p>
      ) : (
        featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="min-w-[250px] bg-white p-4 rounded-lg shadow-lg"
          >
            <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </motion.div>
        ))
      )}
    </div>
    )
}

export default Carousel