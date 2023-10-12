import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import InputGroup from "@/components/ui/InputGroup";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Select from "@/components/ui/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

const steps = [
  {
    id: 1,
    title: "Configuracion de Unidad",
  },
  {
    id: 2,
    title: "Configuracion de Dispositivo",
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
    value: "operador1",
    label: "Juan Pérez",
  },
  {
    value: "operador2",
    label: "Carlos García",
  },
  {
    value: "operador3",
    label: "Luis Hernández",
  },
  {
    value: "operador4",
    label: "Miguel González",
  },
  {
    value: "operador5",
    label: "Roberto Martínez",
  },
  {
    value: "operador6",
    label: "Ricardo Sánchez",
  },
  {
    value: "operador7",
    label: "Pedro Ramírez",
  },
  {
    value: "operador8",
    label: "Alejandro Torres",
  },
  {
    value: "operador9",
    label: "Jorge Guerrero",
  },
  {
    value: "operador10",
    label: "Fernando Guzmán",
  },
];



let stepSchema = yup.object().shape({
  placa: yup.string().required("La placa de la unidad es requerida"),
  numeroeco: yup.string().required("El numero economico de la unidad es requerido"),
});

let personalSchema = yup.object().shape({
  codigoDispositivo: yup.string().required("Ingrese el codigo del dispositivo"),
});



const FormWizard = () => {
  const router = useRouter();
  const [stepNumber, setStepNumber] = useState(0);

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

  const onSubmit = (data) => {
    // next step until last step . if last step then submit form
    let totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 2;
    if (isLastStep) {
      console.log(data);
      setTimeout(() => {
        router.push("/unidades");
      }, 1500);
      toast.success("Unidad Guardada con exito", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setStepNumber(stepNumber + 1);
    }
  };

  const handlePrev = () => {
    setStepNumber(stepNumber - 1);
  };

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleChange2 = (e) => {
    setValue2(e.target.value);
  };

  return (
    <div>
      <Card title="Agregar Nueva Unidad">
        <div>
          <div className="flex z-[5] items-center relative justify-center md:mx-8">
            {steps.map((item, i) => (
              <div
                className="relative z-[1] items-center item flex flex-start flex-1 last:flex-none group"
                key={i}
              >
                <div
                  className={`${stepNumber >= i
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
                  className={`${stepNumber >= i
                    ? "bg-slate-900 dark:bg-slate-900"
                    : "bg-[#E0EAFF] dark:bg-slate-700"
                    } absolute top-1/2 h-[2px] w-full`}
                ></div>
                <div
                  className={` ${stepNumber >= i
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
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pt-10">
                    <div className="lg:col-span-3 md:col-span-2 col-span-1">
                      <h4 className="text-base text-slate-800 dark:text-slate-300 my-6">
                        Enter Your Account Details
                      </h4>
                    </div>
                    <Textinput
                      label="Placa"
                      type="text"
                      placeholder="43-JKE-23"
                      name="placa"
                      error={errors.placa}
                      register={register}
                    />
                    <Textinput
                      label="Numero economico"
                      type="text"
                      placeholder="93"
                      name="numeroeco"
                      error={errors.numeroeco}
                      register={register}
                    />
                    <Textinput
                      label="Nombre de la Unidad"
                      type="text"
                      placeholder=""
                      name="nombreoperador"
                      register={register}
                    />
                    <Select
                      label="Marca"
                      placeholder="Seleccione la marca de la unidad"
                      options={options}
                      onChange={handleChange}
                      value={value}
                    />
                    <Select
                      label="Operador"
                      placeholder="Seleccione el operador de la unidad"
                      options={operadores}
                      onChange={handleChange2}
                      value={value2}
                    />
                  </div>
                </div>
              )}

              {stepNumber === 1 && (
                <div>
                  <div className="grid md:grid-cols-1 grid-cols-1 gap-5">
                    <div className="md:col-span-2 col-span-1 mt-8">
                      <h4 className="text-base text-slate-800 dark:text-slate-300 my-6">
                        Nuevo despositivo
                      </h4>
                    </div>
                    <Textinput
                      label="Codigo del dispositivo"
                      type="text"
                      className="text-center"
                      placeholder="0000-0000-0000"
                      name="codigoDispositivo"
                      error={errors.codigoDispositivo}
                      register={register}
                    />
                  </div>
                </div>
              )}
              <div
                className={`${stepNumber > 0 ? "flex justify-between" : " text-right"
                  } mt-10`}
              >
                {stepNumber !== 0 && (
                  <Button
                    text="Regresar"
                    className="btn-dark"
                    onClick={handlePrev}
                  />
                )}
                <Button
                  text={stepNumber !== steps.length - 2 ? "Siguiente" : "Guardar"}
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
