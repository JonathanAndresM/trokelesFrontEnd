import { useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
    //const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);

    /*const handleButtonClick = () => {
        if (user) {
            navigate("/products");
        }else {
            navigate("/login");
        }
    }*/

  return (
    <div className="relative h-screen w-full">
      {/* Imagen de fondo con efecto Parallax */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/images/tienda-fondo.jpg')" }} />

      {/* Capa oscura para mejorar contraste */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        {/* Slogan con animación */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold drop-shadow-lg"
        >
          🎉 ¡Todo para tu fiesta en un solo lugar! 🎊
        </motion.h1>

        {/* Botón animado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link
            to={user ? "/products" : "/login"}
            className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105"
          >
            {user ? "Ver productos 🎁" : "Iniciar sesión 🔑"}
          </Link>
        </motion.div>
      </div>

      {/* Carrusel de productos destacados */}
      <div className="relative z-10 mt-10">
        <Carousel />
      </div>
    </div>
  )
}

export default Home