import React from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const FormValidationSchema = yup
  .object({
    nombre: yup.string().required("El nombre de la empresa es requerido"),
    rfc: yup.string().required("Ingrese el RFC de la empresa").min(12).max(13),
    calle: yup.string().required("La calle de la empresa es requerido"),
    cp: yup.string().required("El codigo postal de la empresa es requerido"),
    colonia: yup.string().required("La colonia de la empresa es requerido"),
    estado: yup.string().required("El estado de la empresa es requerido"),
    municipio: yup.string().required("El municipio de la empresa es requerido"),
    confirmpassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")]),
  })
  .required();

const MultiValidation = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    //console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:grid-cols-3 grid gap-5 grid-cols-1 "
      >
        <Textinput
          name="nombre"
          label="nombre de la empresa"
          placeholder="nombre de la empresa"
          type="text"
          register={register}
          error={errors.nombre}
        />
        <Textinput
          name="rfc"
          placeholder="XXXX-XXXXXX-XXX"
          label="RFC de la empresa"
          type="text"
          register={register}
          error={errors.rfc}
        />
        <Textinput
          name="calle"
          placeholder="Avenida Palomares"
          label="Calle" 
          type="text"
          register={register}
          error={errors.calle}
        />
         <Textinput
          name="num_int"
          placeholder="# 00"
          label="Numero interior" 
          type="text"
          register={register}
        />
         <Textinput
          name="num_ext"
          placeholder="# 00"
          label="Numero exterior" 
          type="text"
          register={register}
          
        />
        <Textinput
          name="cp"
          label="Codigo postal"
          type="text"
          register={register}
          error={errors.cp}
        />
          <Textinput
          name="colonia"
          label="Colonia"
          type="text"
          register={register}
          error={errors.colonia}
        />
         <Textinput
          name="estado"
          label="Estado"
          type="text"
          register={register}
          error={errors.estado}
        />
         <Textinput
          name="municipio"
          label="Municipio"
          type="text"
          register={register}
          error={errors.municipio}
        />

        <div className="lg:col-span-3 col-span-1">
          <div className="text-center">
            <button className="btn btn-dark text-center">Registrar empresa</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MultiValidation;
