import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Carrusel = ({ imagenes, intervalo = 3000 }) => {
  const [indiceActual, setIndiceActual] = useState(0);
  const [itemsPorPagina, setItemsPorPagina] = useState(4);

  // Escuchar los cambios en el tamaño de la ventana para ajustar las imágenes mostradas
  useEffect(() => {
    const ajustarItemsPorPagina = () => {
      if (window.innerWidth < 800) {
        setItemsPorPagina(2); // Mostrar dos imágenes en pantallas pequeñas en columna
      } else {
        setItemsPorPagina(4); // Mostrar cuatro imágenes en pantallas grandes (2x2)
      }
    };

    // Ajustar inicialmente
    ajustarItemsPorPagina();

    // Escuchar los cambios de tamaño de pantalla
    window.addEventListener("resize", ajustarItemsPorPagina);

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", ajustarItemsPorPagina);
    };
  }, []);

  // Función para avanzar en el carrusel
  const avanzar = () => {
    setIndiceActual((prevIndice) =>
      prevIndice + itemsPorPagina >= imagenes.length ? 0 : prevIndice + itemsPorPagina
    );
  };

  // Función para retroceder en el carrusel
  const retroceder = () => {
    setIndiceActual((prevIndice) =>
      prevIndice === 0 ? imagenes.length - itemsPorPagina : prevIndice - itemsPorPagina
    );
  };

  // Movimiento automático del carrusel
  useEffect(() => {
    const intervaloID = setInterval(avanzar, intervalo);
    return () => clearInterval(intervaloID); // Limpia el intervalo al desmontar el componente
  }, [indiceActual, intervalo, itemsPorPagina]);

  // Obtener las imágenes que se muestran actualmente
  const imagenesEnPantalla = imagenes.slice(indiceActual, indiceActual + itemsPorPagina);

  return (
    <div className="carrusel flex items-center justify-center my-8">
      <button onClick={retroceder} className="p-2 rounded-md hover:bg-gray-400">
        <IoIosArrowBack />
      </button>

      <div
        className={`grid ${itemsPorPagina === 2 ? "grid-cols-1" : "grid-cols-2"} grid-rows-2 gap-4 w-full max-w-6xl h-96`}
      >
        {imagenesEnPantalla.map((imagen, index) => (
          <div key={index} className="imagen-carrusel">
            <img
              src={imagen.image}
              alt={imagen.title}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>

      <button onClick={avanzar} className="p-2 rounded-md hover:bg-gray-400">
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Carrusel;
