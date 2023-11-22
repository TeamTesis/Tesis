import React, { useState } from "react";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";


const schema = yup
  .object({
    nombre: yup.string().required("El nombre es requerido"),
    apellido: yup.string().required("El apellido es requerido"),
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup
      .string()
      .min(6, "Password must be at least 8 characters")
      .max(20, "Password shouldn't be more than 20 characters")
      .required("Please enter password"),
    // confirm password
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

const RegForm = () => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const router = useRouter();

  const onSubmit = (data) => {
    dispatch(handleRegister(data));
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
      <Textinput
        name="nombre"
        label="Nombre"
        type="text"
        placeholder="Ingresa tu(s) nombre(s)"
        register={register}
        error={errors.name}
      />{" "}
       <Textinput
        name="apellido"
        label="Apellido"
        type="text"
        placeholder="Ingresa tu(s) apellido(s)"
        register={register}
        error={errors.name}
      />{" "}
      <Textinput
        name="correo"
        label="correo"
        type="email"
        placeholder="Ingresa tu correo electronico"
        register={register}
        error={errors.email}
      />
      <Textinput
        name="contraseña"
        label="Contraseña"
        type="password"
        placeholder=" Ingresa tu contraseña"
        register={register}
        error={errors.password}
      />
      <Checkbox
        label="Acepto los terminos y condiciones"
        value={checked}
        onChange={() => setChecked(!checked)}
      />
      <button className="btn btn-dark block w-full text-center">
        Registrarse 
      </button>
    </form>
  );
};

export default RegForm;
