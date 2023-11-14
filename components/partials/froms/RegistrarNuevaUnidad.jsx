"use client";
import React, { useRef, useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import Select from "react-select";
import axios from "axios";
import Card from "@/components/ui/Card";

const styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const marcas = [
  {
    value: "freightliner",
    label: "Freightliner",
  },
  {
    value: "kenworth",
    label: "Kenworth",
  },
  {
    value: "international",
    label: "International",
  },
  {
    value: "volvo",
    label: "Volvo",
  },
  {
    value: "peterbilt",
    label: "Peterbilt",
  },
  {
    value: "mack",
    label: "Mack",
  },
  {
    value: "scania",
    label: "Scania",
  },
  {
    value: "man",
    label: "MAN",
  },
  {
    value: "daf",
    label: "DAF",
  },
  {
    value: "iveco",
    label: "Iveco",
  },
];

const years = [];

for (let año = 1990; año <= 2023; año++) {
  years.push({ value: año, label: String(año) });
}

// Esquema de validación de Yup para el formulario
const FormValidationSchema = yup.object({
  placa: yup.string().required("La placa de la unidad es requerida"),
  eco: yup.string().required("El numero economico de la unidad es requerido"),
});

// Componente principal del formulario
const FormUnidad = () => {
  // Estados locales para operadores, información de trucks y el formulario
  const [operadores, setOperadores] = useState([]);

  const [trucks, setTrucks] = useState({
    placa: "",
    eco: "",
    nombre_camion: "",
    marca: "",
    año: "",
    id_operador: "",
  });

  // Referencia para manipular el formulario
  const form = useRef(null);
  // Para la navegación y parámetros de la URL
  const router = useRouter();
  const params = useParams();

  // Funciones para manejar la carga de operadores y la obtención de datos de trucks específicos (si se proporciona un ID)
  const handleLoadOperators = () => {
    // Realiza la solicitud HTTP para cargar los operadores
    axios.get("http://localhost:3000/api/operadores").then((response) => {
      console.log(response.data);

      // Convierte los operadores en opciones para el selector
      const options2 = response.data.map((operator) => ({
        value: operator.id,
        label: `${operator.nombre_completo}`,
      }));
      console.log(options2);

      // Asigna las opciones al selector
      setOperadores(options2);
    });
  };

  //Aqui usamos el paramas que es el parametro que viene de la url y si existe, entonces llenamos la constante trucks con los datos del objeto.
  useEffect(() => {
    // Carga los operadores
    handleLoadOperators();

    if (params.id) {
      axios.get("/api/camiones/" + params.id).then((res) => {
        setTrucks({
          placa: res.data.placa,
          eco: res.data.eco,
          nombre_camion: res.data.nombre_camion,
          marca: res.data.marca,
          año: res.data.año,
          id_operador: res.data.id_operador,
        });
      });
    }
  }, []);


  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    // Actualiza el estado de trucks basado en el nombre del input y su valor.
    setTrucks({
      ...trucks,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeSelect = (selectedOption, actionMeta) => {
    console.log(selectedOption); // Aquí puedes ver la opción seleccionada en la consola.
    const fieldName = actionMeta.name; // Esto obtiene el nombre del campo.

    // Actualiza el estado de 'trucks' basado en el nombre del campo y su valor.
    setTrucks({
      ...trucks,
      [fieldName]: selectedOption.value, // Aquí asumimos que quieres guardar solo el valor.
    });
  };
  // Encuentra el objeto que corresponde a la 'marca' actual en el estado de 'trucks'.
  const selectedBrand = marcas.find((option) => option.value === trucks.marca);

  // Encuentra el objeto que corresponde al 'id_operador' actual en el estado de 'trucks'.
  const selectedOperator = operadores.find((option) => option.value === trucks.id_operador);
  
  // Encontra el objeto que corresponde al año actual en los datos de la unidad.
  let selectedYearOption = years.find((option) => option.value === trucks.año);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga de la página al enviar el formulario.

    try {
      let response; // Esta variable almacenará la respuesta de la solicitud.

      if (!params.id) {
        // Si params.id no existe, estamos en modo creación y hacemos una solicitud POST.
        response = await axios.post("/api/camiones", trucks);

        // Si la solicitud fue exitosa, mostramos una notificación de éxito.
        
        if (response.status === 200) {
          // El código 201 indica que se ha creado un nuevo recurso.
          toast.success("Unidad creada con éxito!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // Después de un tiempo de espera, redirige al usuario y refresca la página.
          setTimeout(() => {
            form.current.reset();
            router.push("/unidades"); // Redirige al usuario a la página de 'unidades'.
            router.refresh(); // Refresca la página actual.
          }, 1500);
        }
      } else {
        // Si params.id existe, estamos en modo edición y hacemos una solicitud PUT.
        response = await axios.put(`/api/camiones/${params.id}`, trucks);

        // Si la solicitud fue exitosa, mostramos una notificación de éxito.
        if (response.status === 200) {
          toast.success("Unidad actualizada con éxito!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          // Aquí también puedes redirigir o refrescar la página si es necesario después de actualizar.
          setTimeout(() => {
            form.current.reset();
            router.push("/unidades"); // Redirige al usuario a la página de 'unidades'.
            router.refresh(); // Refresca la página actual.
          }, 1500);
        }
      }

      console.log(response); // Imprime la respuesta en consola.
    } catch (error) {
      // Si ocurre un error en la solicitud, capturamos el error y mostramos una notificación de error.
      console.error("Hubo un error al enviar los datos: ", error);
      toast.error(
        "Error al procesar la unidad. Por favor, inténtelo de nuevo.",
        {
          position: "top-right",
          autoClose: 3000, // Puede ajustar el tiempo antes de que la notificación se cierre automáticamente.
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  return (
    <div>
      <Card title="Agregar Nueva Unidad">
        <div className="conten-box ">
          <form onSubmit={handleSubmit} ref={form}>
            <div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                <Textinput
                  label="Placa"
                  type="text"
                  placeholder="43JKE23"
                  name="placa"
                  error={errors.placa}
                  onChange={handleChange} // Asigna la función handleChange al evento onChange.
                  register={register}
                  defaultValue={trucks.placa}
                />
                <Textinput
                  label="Numero economico"
                  type="text" // Cambiado a 'text' para que puedas usar el atributo 'pattern'. Si usas 'number', algunos navegadores permiten caracteres como 'e' y '-'.
                  placeholder="93"
                  name="eco"
                  error={errors.eco}
                  onChange={handleChange}
                  register={register}
                  defaultValue={trucks.eco}
                  pattern="\d*" // Esta expresión regular significa "permitir solo dígitos"
                />
                <Textinput
                  label="Nombre de la Unidad"
                  type="text"
                  placeholder="Ingrese el nombre o identificador de la unidad"
                  name="nombre_camion"
                  onChange={handleChange} // Asigna la función handleChange al evento onChange.
                  register={register}
                  defaultValue={trucks.nombre_camion}
                />
                <div>
                  <label htmlFor="hh0" className="form-label ">
                    Año
                  </label>
                  <Select
                    id="hh0"
                    label="año"
                    placeholder="Seleccione el año de la unidad"
                    name="año"
                    className="react-select"
                    classNamePrefix="select"
                    onChange={handleChangeSelect} // aquí pasamos la nueva función
                    options={years}
                    styles={styles}
                    value={selectedYearOption}
                  />
                </div>

                <div>
                  <label htmlFor="hh1" className="form-label ">
                    Marca
                  </label>
                  <Select
                    id="hh1"
                    label="Marca"
                    placeholder="Seleccione la marca de la unidad"
                    name="marca"
                    className="react-select"
                    classNamePrefix="select"
                    options={marcas}
                    value={selectedBrand} // pasa el objeto seleccionado aquí
                    onChange={handleChangeSelect} // aquí pasamos la nueva función
                    styles={styles}
                  />
                </div>

                <div>
                  <label htmlFor=" hh2" className="form-label ">
                    Operador
                  </label>
                  <Select
                    id="hh2"
                    placeholder="Seleccione el operador de la unidad"
                    name="id_operador"
                    className="react-select"
                    classNamePrefix="select"
                    options={operadores}
                    onChange={handleChangeSelect} // aquí pasamos la nueva función
                    styles={styles}
                    value={selectedOperator} // pasa el objeto seleccionado aquí
                  />
                </div>
              </div>
            </div>
            <div className=" text-right mt-4">
              <Button
                text={params.id ? "Actualizar unidad" : "Guardar Unidad"}
                className="btn-dark"
                type="submit"
              />
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default FormUnidad;
