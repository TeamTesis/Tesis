"use client"
import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import InputGroup from "@/components/ui/InputGroup";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Checkbox from "@/components/ui/Checkbox";
const steps = [
  {
    id: 1,
    title: "Account Details",
  },
  {
    id: 2,
    title: "Registro de usuario",
  },
  ,
];

let stepSchema = yup
  .object()
  .shape({
    nombre: yup.string().required("El nombre es requerido"),
    apellido: yup.string().required("El apellido es requerido"),
    email: yup.string().required("Email is Required"),
    password: yup
      .string()
      .min(6, "Password must be at least 8 characters")
      .max(20, "Password shouldn't be more than 20 characters")
      .required("Please enter password"),
    // confirm password
    confirmpass: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

let empresaSchema = yup.object().shape({
  nombre_empresa: yup.string().required("El nombre de la empresa es requerido"),
  rfc: yup.string().required(" el rfc es requerido").min(12).max(13),
  num_int: yup.string().required(" Last name is required"),
  num_ext: yup.string().required(" Last name is required"),
});

const url =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

const FormWizard = () => {
  const [checked, setChecked] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);

  // find current step schema
  let currentStepSchema;
  switch (stepNumber) {
    case 0:
      currentStepSchema = stepSchema;
      break;
    case 1:
      currentStepSchema = empresaSchema;
      break;
    case 2:
      currentStepSchema = addressSchema;
      break;
    case 3:
      currentStepSchema = socialSchema;
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
    const isLastStep = stepNumber === totalSteps - 1;
    if (isLastStep) {
      console.log(data);
    } else {
      setStepNumber(stepNumber + 1);
    }
  };

  const handlePrev = () => {
    setStepNumber(stepNumber - 1);
  };

  return (
    <div>
      <Card title="Horizontal">
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
                    <Textinput
                      name="nombre"
                      label="Nombre prueba"
                      type="text"
                      placeholder="Ingresa tu(s) nombre(s)"
                      register={register}
                      //error={errors.name}
                    />{" "}
                    <Textinput
                      name="apellido"
                      label="Apellido"
                      type="text"
                      placeholder="Ingresa tu(s) apellido(s)"
                      register={register}
                      //error={errors.name}
                    />{" "}
                    <Textinput
                      name="correo"
                      label="correo"
                      type="email"
                      placeholder="Ingresa tu correo electronico"
                      register={register}
                      
                    />
                    <Textinput
                      label="Contraseña"
                      type="password"
                      placeholder="8+ caracteres"
                      name="password"
                      //error={errors.password}
                      register={register}
                      hasicon
                    />
                    <Textinput
                      label="Confirmar contraseña"
                      type="password"
                      placeholder="Password"
                      name="confirmpass"
                      //error={errors.confirmpass}
                      hasicon
                      register={register}  
                    />
                    
               
                  </div>
          
              )}

              {stepNumber === 1 && (
                <div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <div className="md:col-span-2 col-span-1 mt-8">
                      <h4 className="text-base text-slate-800 dark:text-slate-300 my-6">
                        ¡Registra tu empresa!
                      </h4>
                    </div>
                    <Textinput
                      label="Nombre de la empresa"
                      type="text"
                      placeholder="Ej. Elysium"
                      name="nombre_empresa"
                      //error={errors.nombre_empresa}
                      register={register}
                    />
                    <Textinput
                      label="RFC"
                      type="text"
                      placeholder="XXXX-XXXXXX-XXX"
                      name="rfc"
                      //error={errors.rfc}
                      register={register}
                    />
                     <Textinput
                      label="num_int"
                      type="text"
                      placeholder="# 0000"
                      name="num_int"
                      //error={errors.num_int}
                      register={register}
                    />
                      <Textinput
                      label="num_ext"
                      type="text"
                      placeholder="# 0000"
                      name="num_ext"
                      //error={errors.num}
                      register={register}
                    />
                      <Textinput
                      label="cp"
                      type="text"
                      placeholder="Ej. 00000"
                      name="cp"
                      //error={errors.num}
                      register={register}
                    />
                      <Textinput
                      label="colonia"
                      type="text"
                      placeholder="Ej. Valle de las garzas"
                      name="colonia"
                      //error={errors.num}
                      register={register}
                    />
                    <Textinput
                      label="estado"
                      type="text"
                      placeholder="Ej. Jalisco"
                      name="estado"
                      //error={errors.num}
                      register={register}
                    />
                    <Textinput
                      label="municipio"
                      type="text"
                      placeholder="Ej. Jalisco"
                      name="municipio"
                      //error={errors.num}
                      register={register} 
                    />
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
                    onClick={console.log("prev")}
                  />
                )}
                <Button
                  text={stepNumber !== steps.length - 1 ? "next" : "submit"}
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
