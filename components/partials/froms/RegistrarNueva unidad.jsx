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

const FormUnidad = () => {
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
  
  const {
    register,
    formState: { errors },
    handleSubmit,
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

export default FormUnidad;
