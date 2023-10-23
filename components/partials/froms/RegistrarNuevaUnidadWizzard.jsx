"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import Select from "react-select";
import axios from 'axios';

const styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const steps = [
  {
    id: 1,
    title: "Configuracion de Unidad",
  },
  {
    id: 2,
    title: "Perosonalizacion de Unidad",
  },
  ,
];

const options = [
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
const operadores = [
  {
    value: "1",
    label: "Juan Pérez",
  },
  {
    value: "2",
    label: "Carlos García",
  },
  {
    value: "3",
    label: "Luis Hernández",
  },
  {
    value: "4",
    label: "Miguel González",
  },
  {
    value: "5",
    label: "Roberto Martínez",
  },
  {
    value: "6",
    label: "Ricardo Sánchez",
  },
  {
    value: "7",
    label: "Pedro Ramírez",
  },
  {
    value: "8",
    label: "Alejandro Torres",
  },
  {
    value: "9",
    label: "Jorge Guerrero",
  },
  {
    value: "10",
    label: "Fernando Guzmán",
  },
];

const years = [];

for (let year = 1990; year <= 2023; year++) {
  years.push({ value: year, label: String(year) });
}

let stepSchema = yup.object().shape({
  placa: yup.string().required("La placa de la unidad es requerida"),
  eco: yup.string().required("El numero economico de la unidad es requerido"),
});

let personalSchema = yup.object().shape({
  codigoDispositivo: yup.string().required("Ingrese el codigo del dispositivo"),
});

const FormWizard = () => {
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const [trucks, setTrucks] = useState({
    placa: "",
    eco: "",
    nombre_camion: "",
    marca: "",
    modelo: "",
    year: "",
    nombre_operador: "",
  });

  const [stepNumber, setStepNumber] = useState(0);

  //Aqui usamos el paramas que es el parametro que viene de la url y si existe, entonces llenamos la constante trucks con los datos del objeto.
  useEffect(() => {
    if (params.id) {
      axios.get("/api/camiones/" + params.id).then((res) => {
        setProduct({
          placa: res.data.placa,
          eco: res.data.eco,
          nombre_camion: res.data.nombre_camion,
          marca: res.data.marca,
          modelo: res.data.modelo,
          year: res.data.year,
          nombre_operador: res.data.nombre_operador,
        });
      });
    }
  }, []);

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

  // find current step schema
  let currentStepSchema;
  switch (stepNumber) {
    case 0:
      currentStepSchema = stepSchema;
      break;
    case 1:
      currentStepSchema = personalSchema;
      break;
    default:
      currentStepSchema = stepSchema;
  }
  useEffect(() => {
    //console.log("step number changed");
  }, [stepNumber]);

  const {
    register,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(currentStepSchema),
    // keep watch on all fields
    mode: "all",
  });

  // Define una función llamada handleSubmit que se ejecutará cuando se envíe el formulario.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga de la página al enviar el formulario.

    try {
      let response; // Esta variable almacenará la respuesta de la solicitud.

      if (!params.id) {
        // Si params.id no existe, estamos en modo creación y hacemos una solicitud POST.
        response = await axios.post("/api/camiones", trucks);

        // Si la solicitud fue exitosa, mostramos una notificación de éxito.
        if (response.status === 201) {
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


  const handlePrev = () => {
    setStepNumber(stepNumber - 1);
  };

  return (
    <div>
      <Card title="Agregar Nueva Unidad">
          <div className="conten-box ">
            <form onSubmit={handleSubmit} ref={form}>
                <div>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pt-10">
                    <div className="lg:col-span-3 md:col-span-2 col-span-1">
                      <h4 className="text-base text-slate-800 dark:text-slate-300 my-6">
                        Enter Your Account Details
                      </h4>
                    </div>
                    <Textinput
                      label="Placa"
                      type="text"
                      placeholder="43JKE23"
                      name="placa"
                      error={errors.placa}
                      onChange={handleChange} // Asigna la función handleChange al evento onChange.
                      register={register}
                    />
                    <Textinput
                      label="Numero economico"
                      type="text" // Cambiado a 'text' para que puedas usar el atributo 'pattern'. Si usas 'number', algunos navegadores permiten caracteres como 'e' y '-'.
                      placeholder="93"
                      name="eco"
                      error={errors.eco}
                      onChange={handleChange}
                      register={register}
                      pattern="\d*" // Esta expresión regular significa "permitir solo dígitos"
                    />
                    <Textinput
                      label="Nombre de la Unidad"
                      type="text"
                      placeholder="Ingrese el nombre o identificador de la unidad"
                      name="nombre_camion"
                      onChange={handleChange} // Asigna la función handleChange al evento onChange.
                      register={register}
                    />
                    <Textinput
                      label="Modelo de la unidad"
                      type="text"
                      placeholder="Ingrese el modelo de la unidad"
                      name="modelo"
                      onChange={handleChange} // Asigna la función handleChange al evento onChange.
                      register={register}
                    />

                    <div>
                      <label htmlFor="hh0" className="form-label ">
                        Año
                      </label>
                      <Select
                        id="hh0"
                        label="Year"
                        placeholder="Seleccione el año de la unidad"
                        name="year"
                        className="react-select"
                        classNamePrefix="select"
                        onChange={handleChangeSelect} // aquí pasamos la nueva función
                        options={years}
                        styles={styles}
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
                        options={options}
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
                        name="nombre_operador"
                        className="react-select"
                        classNamePrefix="select"
                        options={operadores}
                        onChange={handleChangeSelect} // aquí pasamos la nueva función
                        styles={styles}
                      />
                    </div>
                  </div>
                </div>
              
                <Button
                  text={
                    stepNumber !== steps.length - 2 ? "Siguiente" : "Guardar"
                  }
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

export default FormWizard;
