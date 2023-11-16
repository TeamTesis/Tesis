"use client";
import Link from "next/link";
import LoginForm from "@/components/partials/auth/login-form";
import useDarkMode from "@/hooks/useDarkMode";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// image import

export default async function Login( ) {
  /*const session = await getServerSession(); //Copiar lo mismo al registro linea 11 - 20
  if (session) {
    redirect('/analytics')
  }*/
  const [isDark] = useDarkMode();
  return (
    <>
      <div className="loginwrapper">
        <div className="lg-inner-column">
          <div className="left-column relative z-[1]">
            <div className="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
              <div className="relative z-10">
              <Link href="/">
               { /* <img
                  src={
                    isDark
                      ? "/assets/images/logo/logo-white.svg"
                      : "/assets/images/logo/logo.svg"
                  }
                  alt=""
                  className="mb-10"
                /> */}
              </Link>
              </div>
              <div className="absolute top-0 left-0 bottom-0 right-0">
                <img
                  src="/assets/images/auth/teslatruck.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

          </div>
          <div className="right-column relative">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link href="/">
                    {/*<img
                      src={
                        isDark
                          ? "/assets/images/logo/logo-white.svg"
                          : "/assets/images/logo/logo.svg"
                      }
                      alt=""
                      className="mx-auto"
                    />*/}
                  </Link>
                </div>
                <div className="text-center 2xl:mb-10 mb-4">
                  <h4 className="font-medium">Inicio de Sesion</h4>
                  <div className="text-slate-500 text-base">
                    Iniciar sesion 
                  </div>
                </div>
                <LoginForm />

                      
                <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    href="/register"
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
                    ¡Registrate aqui!
                  </Link>
                </div>

                  

              </div>
              <div className="auth-footer text-center">
                Copyright 2021, All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

