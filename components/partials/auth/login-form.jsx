
import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {signIn} from "next-auth/react"

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const LoginForm = () => {

  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const router = useRouter();
  /*const handleSubmit = (data) => {
    const user = users.find(
      (user) => user.email === data.email && user.password === data.password
    );
    if (user) {
      const response = signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
      });
      console.log(response);
      router.push("/analytics");
    } else {
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };*/
  //const users = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);

  const [user, setUser] = useState({email: "", password: ""})

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user", user);
    console.log(signIn);

   const response = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });
    console.log({response});
    if(!response?.error){
      router.push("/analytics");
  };
}

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <Textinput
        name="email"
        label="email"
        type="email"
        register={register}
        onChange={(e) => setUser({...user, email: e.target.value})}
        error={errors?.email}
      />
      <Textinput
        name="password"
        label="contraseña"
        type="password"
        register={register}
        onChange={(e) => setUser({...user, password: e.target.value})}
        error={errors.password}
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Recuerdame"
        />
        <Link
          href="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          ¿Olvidaste tu contraseña?{" "}
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center hover:bg-blue-600">Iniciar Sesion</button>
    </form>
  );
};

export default LoginForm;
