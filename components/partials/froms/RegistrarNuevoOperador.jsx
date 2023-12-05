import React, { useRef, useState, useEffect } from "react";
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
import { useRouter, useParams } from "next/navigation";
import axios from "axios";


const FormValidationSchema = yup.object({
    nombre_completo: yup.string().required("Ingrese en nombre del Operador").max(255),
    rfc: yup.string().required("Ingrese el RFC del Operador").min(12).max(13),
    telefono: yup.string().required("Ingrese un numero de telefono valido").min(10).max(10),
    telefono_2: yup.string().required("Ingrese un numero de telefono valido").min(10).max(10),
  })

const FormOperador = () => {
  const router = useRouter();

  const [operator, setOperators] = useState({
    nombre_completo: "",
    rfc : "",
    telefono: "",
    telefono_2: "",
  });

    // Referencia para manipular el formulario
    const form = useRef(null);
    // Para la navegación y parámetros de la URL
    const params = useParams();

     //Aqui usamos el paramas que es el parametro que viene de la url y si existe, entonces llenamos la constante operators con los datos del objeto.
  useEffect(() => {

    if (params.id) {
      axios.get("/api/operadores/" + params.id).then((res) => {
        setOperators({
          nombre_completo: res.data.nombre_completo,
          rfc : res.data.rfc,
          telefono: res.data.telefono,
          telefono_2: res.data.telefono_2,
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
    // Actualiza el estado de operator basado en el nombre del input y su valor.
    setOperators({
      ...operator,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga de la página al enviar el formulario.

    try {
      let response; // Esta variable almacenará la respuesta de la solicitud.

      if (!params.id) {
        // Si params.id no existe, estamos en modo creación y hacemos una solicitud POST.
        response = await axios.post("/api/operadores", operator);

        // Si la solicitud fue exitosa, mostramos una notificación de éxito.
        if (response.status === 200) {
          // El código 201 indica que se ha creado un nuevo recurso.
          toast.success("Operador creado con éxito!", {
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
            router.push("/operadores"); // Redirige al usuario a la página de 'unidades'.
            router.refresh(); // Refresca la página actual.
          }, 1500);
        }
      } else {
        // Si params.id existe, estamos en modo edición y hacemos una solicitud PUT.
        response = await axios.put(`/api/operadores/${params.id}`, operator);

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
            router.push("/operadores"); // Redirige al usuario a la página de 'unidades'.
            router.refresh(); // Refresca la página actual.
          }, 1500);
        }
      }

      console.log(response); // Imprime la respuesta en consola.
    } catch (error) {
      // Si ocurre un error en la solicitud, capturamos el error y mostramos una notificación de error.
      console.error("Hubo un error al enviar los datos: ", error);
      toast.error(
        "Error al procesar la unidad. Por favor, inténtelo de nuevo." + error,
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
      <form onSubmit={handleSubmit} ref={form} className="space-y-4  grid gap-5 grid-cols-1 " >
        <div>
          <div className="mb-4">
            <InputGroup
              name="nombre_completo"
              placeholder="Nombre Completo "
              label="Nombre"
              type="text"
              prepend={<Icon icon="heroicons-outline:user" />}
              merged
              error={errors.nombre_completo}
              register={register}
              onChange={handleChange} // Asigna la función handleChange al evento onChange.
              defaultValue={operator.nombre_completo}

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
              error={errors.rfc}
              register={register}
              onChange={handleChange} // Asigna la función handleChange al evento onChange.
              defaultValue={operator.rfc}
            />
          </div>

          <div className="mb-4">

            <InputGroup
              name="telefono"
              id="hi_nuemero"
              placeholder="(000)-000-0000"
              label="Numero de Telefono"
              type="text"
              prepend={<Icon icon="heroicons-outline:phone" />}
              merged
              error={errors.telefono}
              register={register}
              onChange={handleChange} // Asigna la función handleChange al evento onChange.
              defaultValue={operator.telefono}
            />
          </div>

          <div className="mb-4">

            <InputGroup
              name="telefono_2"
              id="hi_numero_emergencia"
              placeholder="(000)-000-0000"
              label="Numero de Telefono de Emergencia"
              type="text"
              prepend={<Icon icon="heroicons-outline:phone" />}
              merged
              error={errors.telefono_2}
              register={register}
              onChange={handleChange} // Asigna la función handleChange al evento onChange.
              defaultValue={operator.telefono_2}
            />
          </div>

        </div>
        <div>
          {/*<Card title="Subir Foto">
            <DropZone />
            </Card>*/ }
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
