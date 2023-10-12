import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "@/components/ui/Icon";
import InputGroup from "@/components/ui/InputGroup";
import Card from "@/components/ui/Card";
import DropZone from "@/components/partials/froms/DropZone";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const FormValidationSchema = yup.object({
    fullname: yup.string().required("Ingrese en nombre del Operador"),
    numero: yup.string().required("Ingrese un numero de telefono valido").min(10),
    numero2: yup.string().required("Ingrese un numero de telefono valido").min(10),
  })

const FormOperador = () => {
  const router = useRouter();
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    console.log(data);
    setTimeout(() => {
      router.push("/operadores");
    }, 1500);
    toast.success("Operador Guardado con exito", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:grid-cols-2 grid gap-5 grid-cols-1 " >
        <div>
          <div className="mb-4">
            <InputGroup
              name="fullname"
              placeholder="Nombre Completo "
              label="Nombre"
              type="text"
              prepend={<Icon icon="heroicons-outline:user" />}
              merged
              error={errors.fullname}
              register={register}

            />
          </div>
          <div className="mb-4">
            <InputGroup
              name="rfc"
              placeholder="XXXX-XXXXXX-XXX"
              label="RFC"
              type="text"
              prepend={<Icon icon="heroicons-outline:document-text" />}
              merged
              register={register}
            />
          </div>

          <div className="mb-4">

            <InputGroup
              name="numero"
              id="hi_nuemero"
              placeholder="(000)-000-0000"
              label="Numero de Telefono"
              type="text"
              prepend={<Icon icon="heroicons-outline:phone" />}
              merged
              error={errors.numero}
              register={register}
            
            />
          </div>

          <div className="mb-4">

            <InputGroup
              name="numero2"
              id="hi_numero_emergencia"
              placeholder="(000)-000-0000"
              label="Numero de Telefono de Emergencia"
              type="text"
              prepend={<Icon icon="heroicons-outline:phone" />}
              merged
              error={errors.numero2}
              register={register}
            />
          </div>

        </div>
        <div>
          <Card title="Subir Foto">
            <DropZone />
          </Card>
        </div>

        <div className="ltr:text-right rtl:text-left">
          <Button
            text="guardar"
            className="btn-dark"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default FormOperador;
