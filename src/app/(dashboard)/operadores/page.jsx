"use client";
import React from 'react'
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import TablaOperadores from '@/components/partials/table/TablaOperadores';

const Unidades = () => {
    const router = useRouter();
    return (
        <div>
            <div className="py-3">
            <Button
              icon="heroicons-outline:plus-sm"
              text="Agregar Operador"
              className=" btn-dark font-normal btn-sm "
              iconClass="text-lg"
              onClick={() => {
                router.push("/operadores/agregar-operador");
              }}
            />
            </div>
            <div className=" space-y-5">
                <TablaOperadores />
            </div>

        </div>
    );
};

export default Unidades