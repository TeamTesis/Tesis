"use client";

import React from "react";
import Link from "next/link";
import Empresaform from "@/components/partials/auth/empresa-form";
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
              <div className="h-full flex flex-col justify-center mx-20">
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
                  <h4 className="font-medium">Crea tu empresa</h4>
                  <div className="text-slate-500 dark:text-slate-400 text-base">
                    Crea una nueva empresa
                  </div>
                </div>
                <Empresaform />
                
               
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
