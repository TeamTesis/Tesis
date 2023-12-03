"use client";

import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { estadosMunicipios } from "@/constant/estadosMunicipios";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

const styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const steps = [
  {
    id: 1,
    title: "Detalles de la cuenta",
  },
  {
    id: 2,
    title: "Agregar empresa",
  },
  ,
];

let stepSchema = yup.object().shape({
  nombre: yup.string().required("El/los nombre(s) es requerido"),
  apellido: yup.string().required("El/los apellido(s) es requerido"),
  email: yup
    .string()
    .email("Correo electronico es invalido")
    .required("Correo electronico es requerido"),
  //.matches(/^[0-9]{12}$/, "Phone number is not valid"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmpass: yup
    .string()
    .required("La confirmacion de contraseña es requerida")
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir"),
});

let personalSchema = yup.object().shape({
  nombre_empresa: yup.string().required("El nombre de la empresa es requerido"),
  rfc: yup.string().required(" el rfc es requerido").min(12).max(13),
  cp: yup.string().required(" Codigo postal es requerido").min(5).max(5),
  calle: yup.string().required(" La calle es requerida"),
  colonia: yup.string().required(" La colonia es requerida"),
});

const url =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

const FormWizard = () => {

  const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState(null);
  const [municipios, setMunicipios] = useState([]);
  const [stepNumber, setStepNumber] = useState(0);
  const router = useRouter();

  const [registros, setRegistro] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmpass: "",
    nombre_empresa: "",
    rfc: "",
    num_int: "",
    num_ext: "",
    cp: "",
    calle: "",
    colonia: "",
    estado: "",
    municipio: "",
  });
 
  const handleEstadoChange = (opcionEstado, actionMeta) => {
    setEstadoSeleccionado(opcionEstado);
    setMunicipios(estadosMunicipios[opcionEstado.value]);
    setMunicipioSeleccionado(null); // Resetea la selección de municipio al cambiar de estado
    console.log(opcionEstado);
    const fieldName = actionMeta.name;
    setRegistro({
      ...registros,
      [fieldName]: opcionEstado.value,
    });
  };

  const handleMunicipioChange = (opcionMunicipio, actionMeta) => {
    setMunicipioSeleccionado(opcionMunicipio);
    console.log(opcionMunicipio);
    const fieldName2 = actionMeta.name;
    setRegistro({
      ...registros,
      [fieldName2]: opcionMunicipio.value,
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
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(currentStepSchema),
    // keep watch on all fields
    mode: "all",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    // Actualiza el estado de trucks basado en el nombre del input y su valor.
    setRegistro({
      ...registros,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (data) => {
    
    try {
      let totalSteps = steps.length;
      const isLastStep = stepNumber === totalSteps - 1;
      if (isLastStep) {
        console.log(data);
        let response;

        response = await axios.post("/api/auth/register", registros);
        console.log(response);

        if (response.status === 200) {
          // El código 200 indica que se ha creado un nuevo recurso.
          toast.success("Registro creado con éxito!", {
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
            router.push("/"); // Redirige al usuario a la página de 'unidades'.
            router.refresh(); // Refresca la página actual.
          }, 1500);
        }
      } else {
        setStepNumber(stepNumber + 1);
      }
    } catch (error) {
      // Si ocurre un error en la solicitud, capturamos el error y mostramos una notificación de error.
      console.error("Hubo un error al enviar los datos: ", error);
      toast.error(
        "Error al procesar el registro. Por favor, inténtelo de nuevo.",
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

  /**
   * // next step until last step . if last step then submit form
    let totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;
    if (isLastStep) {
      console.log(data);
    } else {
      setStepNumber(stepNumber + 1);
    } */

  const handlePrev = () => {
    setStepNumber(stepNumber - 1);
  };

  return (
    <div>
      <Card>
        <div>
          <div className="flex z-[5] items-center relative justify-center md:mx-8">
            {steps.map((item, i) => (
              <div
                className="relative z-[1] items-center item flex flex-start flex-1 last:flex-none group"
                key={i}
              >
                <div
                  className={`${
                    stepNumber >= i
                      ? "bg-slate-900 text-white ring-slate-900 ring-offset-2 dark:ring-offset-slate-500 dark:bg-slate-900 dark:ring-slate-900"
                      : "bg-white ring-slate-900 ring-opacity-70  text-slate-900 dark:text-slate-300 dark:bg-slate-600 dark:ring-slate-600 text-opacity-70"
                  }  transition duration-150 icon-box md:h-12 md:w-12 h-7 w-7 rounded-full flex flex-col items-center justify-center relative z-[66] ring-1 md:text-lg text-base font-medium`}
                >
                  {stepNumber <= i ? (
                    <span> {i + 1}</span>
                  ) : (
                    <span className="text-3xl">
                      <Icon icon="bx:check-double" />
                    </span>
                  )}
                </div>

                <div
                  className={`${
                    stepNumber >= i
                      ? "bg-slate-900 dark:bg-slate-900"
                      : "bg-[#E0EAFF] dark:bg-slate-700"
                  } absolute top-1/2 h-[2px] w-full`}
                ></div>
                <div
                  className={` ${
                    stepNumber >= i
                      ? " text-slate-900 dark:text-slate-300"
                      : "text-slate-500 dark:text-slate-300 dark:text-opacity-40"
                  } absolute top-full text-base md:leading-6 mt-3 transition duration-150 md:opacity-100 opacity-0 group-hover:opacity-100`}
                >
                  <span className="w-max">{item.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="conten-box ">
            <form onSubmit={handleSubmit(onSubmit)}>
              {stepNumber === 0 && (
                <div>
                  <div className="grid  grid-cols-1 gap-5 pt-10">
                    <Textinput
                      name="nombre"
                      label="Nombre"
                      type="text"
                      placeholder="Ingresa tu(s) nombre(s)"
                      register={register}
                      error={errors.name}
                      onChange={handleChange}
                    />{" "}
                    <Textinput
                      name="apellido"
                      label="Apellido"
                      type="text"
                      placeholder="Ingresa tu(s) apellido(s)"
                      register={register}
                      error={errors.apellido}
                      onChange={handleChange}
                    />{" "}
                    <Textinput
                      label="Correo electronico"
                      type="email"
                      placeholder="Ingresa tu correo electronico"
                      name="email"
                      error={errors.email}
                      register={register}
                      onChange={handleChange}
                    />
                    <Textinput
                      label="Password"
                      type="password"
                      placeholder="8+ characters, 1 capitat letter "
                      name="password"
                      error={errors.password}
                      hasicon
                      register={register}
                      onChange={handleChange}
                    />
                    <Textinput
                      label="Confirm Password"
                      type="password"
                      placeholder="Password"
                      name="confirmpass"
                      error={errors.confirmpass}
                      register={register}
                      onChange={handleChange}
                      hasicon
                    />
                  </div>
                </div>
              )}

              {stepNumber === 1 && (
                <div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-5 pt-14">
                    <Textinput
                      label="Nombre de la empresa"
                      type="text"
                      placeholder="Ej. Elysium"
                      name="nombre_empresa"
                      error={errors.nombre_empresa}
                      register={register}
                      onChange={handleChange}
                    />
                    <Textinput
                      label="RFC"
                      type="text"
                      placeholder="XXXX-XXXXXX-XXX"
                      name="rfc"
                      error={errors.rfc}
                      register={register}
                      onChange={handleChange}
                    />
                    <Textinput
                      label="Numero interior"
                      type="text"
                      placeholder="# 0000"
                      name="num_int"
                      register={register}
                      onChange={handleChange}
                    />
                    <Textinput
                      label="Numero exterior"
                      type="text"
                      placeholder="# 0000"
                      name="num_ext"
                      register={register}
                      onChange={handleChange}
                    />
                    <Textinput
                      label="Calle"
                      type="text"
                      placeholder="Ej. Avenida Elias Zamora Verduzco"
                      name="calle"
                      error={errors.calle}
                      register={register}
                      onChange={handleChange}
                    />
                    <Textinput
                      label="Codigo postal"
                      type="text"
                      placeholder="Ej. 00000"
                      name="cp"
                      error={errors.cp}
                      register={register}
                      onChange={handleChange}
                    />
                    <Textinput
                      label="Colonia"
                      type="text"
                      placeholder="Ej. Valle de las garzas"
                      name="colonia"
                      error={errors.colonia}
                      register={register}
                      onChange={handleChange}
                    />
                    <div>
                      <label htmlFor="hh0" className="form-label ">
                        Estado
                      </label>
                      <Select
                        id="hh1"
                        placeholder="Seleccione el estado"
                        name="estado"
                        className="react-select"
                        classNamePrefix="select"
                        options={Object.keys(estadosMunicipios).map(
                          (estado) => ({ value: estado, label: estado })
                        )}
                        onChange={handleEstadoChange}
                        value={estadoSeleccionado}
                        styles={styles}
                        error={errors.estado}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="hh0" className="form-label ">
                        Municipio
                      </label>
                      <Select
                        id="hh2"
                        placeholder="Seleccione el municipio"
                        name="municipio"
                        className="react-select"
                        classNamePrefix="select"
                        options={municipios.map((municipio) => ({
                          value: municipio,
                          label: municipio,
                        }))}
                        onChange={handleMunicipioChange}
                        value={municipioSeleccionado}
                        isDisabled={!estadoSeleccionado}
                        styles={styles}
                        error={errors.municipio}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              <div
                className={`${
                  stepNumber > 0 ? "flex justify-between" : " text-right"
                } mt-10`}
              >
                {stepNumber !== 0 && (
                  <Button
                    text="prev"
                    className="btn-dark"
                    onClick={handlePrev}
                  />
                )}
                <Button
                  text={stepNumber !== steps.length - 1 ? "Siguiente" : "Guardar"}
                  className="btn-dark"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FormWizard;
