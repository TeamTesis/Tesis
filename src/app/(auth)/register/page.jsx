"use client";

import React from "react";
import Link from "next/link";
import RegForm from "@/components/partials/auth/reg-from";
import Social from "@/components/partials/auth/social";
import useDarkmode from "@/hooks/useDarkMode";
import { ToastContainer } from "react-toastify";

// image import

const Register2 = () => {
  const [isDark] = useDarkmode();
  return (
    <>
      <div className="loginwrapper">
        <div className="lg-inner-column">
          <div className="right-column relative">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link href="/">
                    <img
                      src={
                        isDark
                          ? "/assets/images/logo/logo-white.svg"
                          : "/assets/images/logo/logo.svg"
                      }
                      alt=""
                      className="mx-auto"
                    />
                  </Link>
                </div>
                <div className="text-center 2xl:mb-10 mb-5">
                  <h4 className="font-medium">Registro</h4>
                  <div className="text-slate-500 dark:text-slate-400 text-base">
                    Crea una nueva cuenta 
                  </div>
                </div>
                <RegForm />
                
                <div className="max-w-[300px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm">
                  ¿Ya tienes una cuenta?
                  <Link
                    href="/"
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
                    Iniciar sesion
                  </Link>
                </div>
              </div>
              <div className="auth-footer text-center">
                Copyright 2021, Elysium All Rights Reserved.
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default Register2;
