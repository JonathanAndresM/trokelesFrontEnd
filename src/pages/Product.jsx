import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../redux/productSlice";
import NavBar from "../components/NavBar";
import { getUsers } from "../redux/userSlice";


const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products)
    const { user } = useSelector((state) => state.auth);
    const { users } = useSelector((state) => state.users)
    useEffect(() => { dispatch(getProducts()) }, [dispatch]);
    useEffect(() => { dispatch(getUsers()) }, [dispatch]);
    console.log(users);

    const product = products?.find((product) => product._id === id);
    const formattedDate = new Date(product?.discount?.validUntil).toLocaleDateString();
    const UserComment = ({data}) => {
        const userComment = users.find((user) => user._id === data);
        if (!userComment) return null; // Manejar el caso en que no se encuentra el usuario
        return (
            <p className="font-bold border-b">{userComment.name} {userComment.lastName}</p>
        );
    }
    return (
        <div>
            <NavBar />
            <h1 className="text-2xl text-center font-black my-5">{product?.name}</h1>
            <div className="flex flex-col md:flex-row mx-auto rounded-2xl p-4 bg-gray-100 w-[96vw] min-h-[60vh] items-center justify-center md:justify-around">
                <img className="w-96 h-96 mb-3 sm:w-[30vw] sm:h-[50vh] object-contain bg-white rounded-2xl" src={product?.images} alt={product?.name} />
                <div>
                    <p className="text-center text-lg">{product?.description}</p>
                    <p className="text-center text-lg">Categoría: {product?.category}</p>
                    <p className="text-center text-lg">Valoración: {product?.ratings?.average || 0}</p>
                    <p className="text-center text-lg">Medidas</p>
                    <p className="text-center text-lg">Alto: {product?.dimensions.height} / Ancho: {product?.dimensions.width} / Espesor: {product?.dimensions.depth}</p>
                    {product?.weight > 0 && <p className="text-center text-lg">Peso: {product?.weight}</p>}
                    {product?.discount.percentage > 0 && <p className="text-center text-lg">Descuento: {product?.discount.percentage}% Hasta: {formattedDate}</p>}
                    {user.isWholesale === false ?
                        <p className="text-gray-600">${product?.price}</p> : <p className="text-gray-600">${product?.priceWholesale}</p>}
                    {!user.isWholesale || <p className="text-gray-600">{product?.minQuantityWholesale}</p>}
                </div>
            </div>
            <div>
                <p className="text-center text-lg font-black my-5">Comentarios</p>
                <div className="flex flex-col md:flex-row items-center justify-center bg-gray-100 w-[96vw] min-h-[20vh] mx-auto rounded-2xl p-4">
                    {product?.ratings?.reviews?.length > 0 ? product?.ratings?.reviews.map((data) => (
                        <div key={data._id} className="bg-white shadow-lg rounded-xl p-4 w-full sm:w-[60vw] mb-2">
                            <UserComment data={data.userId} />
                            <p className="text-gray-600">{data.comment}</p>
                        </div>
                    )) : <p className="text-lg">No hay comentarios</p>}
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-100 w-[96vw] min-h-[20vh] mx-auto mt-2 rounded-2xl px-4 py-2">
                    <p className="text-lg font-black mb-2">Deja tu comentario</p>
                    <textarea className="w-full md:w-[50vw] h-24 p-2 rounded-xl border" placeholder="Escribe tu comentario..."></textarea>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-xl mt-3">Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default Product