import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../redux/adminSlice"

const Products = () => {
    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.products)
    const { user } = useSelector((state) => state.auth)
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => { dispatch(getProducts()) }, [dispatch])

    useEffect(() => {
        if (user.type === "mayorista") {
            setFilteredProducts(
                products.map((product) => ({
                    ...product,
                    price: product.wholesalePrice,
                }))
            )
        } else {
            setFilteredProducts(products)
        }
    }, [products, user])

    return (
        <div className="grid grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
                <div key={product.id} className="p-4 shadow-lg">
                    <h2 className="text-xl font-bold">{product.name}</h2>
                    <p className="text-gray-600">${product.price}</p>
                </div>
            ))}
        </div>
    )
}

export default Products