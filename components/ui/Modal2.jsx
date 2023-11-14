import { useEffect, useState } from "react";
import axios from "axios";

export const Modal2 = ({ onClose, truckId }) => {
  const [truckData, setTruckData] = useState(null);

  useEffect(() => {
    const loadTruckData = async () => {
      if (truckId) {
        try {
          const response = await axios.get(`/api/camiones/${truckId}`);
          setTruckData(response.data);
          console.log("Datos del camión:", response.data);
        } catch (error) {
          console.error("Error al cargar los datos del camión:", error);
        }
      }
    };

    loadTruckData();
  }, [truckId]); // Asegúrate de incluir truckId aquí para que el efecto se ejecute cuando cambie

  return (
    <>
      <div className="fixed inset-0 bg-black backdrop-blur-[2px] bg-opacity-20 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
          <div className="bg-sky-900 text-white p-4">
            <h1 className="text-2xl font-medium">
              {truckData
                ? `Unidad No. ${truckData.nombre_camion}`
                : "Cargando..."}
            </h1>
          </div>
          <div className="bg-white overflow-y-auto h-96">
            <div className="p-2 flex flex-col justify-start gap-2 h-full">
              {/* Aqui va el contenido */}

              <div className="flex flex-col gap-2 justify-center items-start ">
                <h2 className="text-xl font-medium text-gray-700">
                  Estadisticas del camion:
                </h2>
                <p className="text-justify">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Ullam iure ea ducimus facere recusandae impedit, saepe illum.
                  Quo, inventore et!
                </p>
              </div>

              <div className="flex flex-col gap-2 justify-center items-start ">
                <h2 className="text-xl font-medium text-gray-700">
                  Resumen del camion:
                </h2>
                {/* Render condicional para mostrar datos del camión o mensaje de carga */}
                {truckData ? (
                  <>
                    <p>Placa: {truckData.placa}</p>
                    <p>Marca: {truckData.marca}</p>
                    <p>Modelo: {truckData.año}</p>
                  </>
                ) : (
                  <p>Cargando datos del camión...</p> // Mensaje mientras truckData es null
                )}
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right">
            <button
              className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
