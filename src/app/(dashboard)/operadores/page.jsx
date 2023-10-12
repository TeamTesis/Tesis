"use client";
import React from 'react'
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import TableOperadores from '@/components/partials/table/TablaOperadores';
import TablaOperadores from '@/components/partials/table/TablaOperadores';

const Unidades = () => {
    const router = useRouter();
    const actions = [

        {
            name: "view",
            icon: "heroicons-outline:eye",
            doit: () => {
                router.push("/operador-preview");
            },
        },
        {
            name: "edit",
            icon: "heroicons:pencil-square",
            doit: (id) => {
                router.push("/invoice-edit");
            },
        },
        {
            name: "delete",
            icon: "heroicons-outline:trash",
            doit: (id) => {
                return null;
            },
        },
    ];
    return (
        <div>
            <div className="py-3">
            <Button
              icon="heroicons-outline:plus-sm"
              text="Agregar Operador"
              className=" btn-dark font-normal btn-sm "
              iconClass="text-lg"
              onClick={() => {
                router.push("/Agregar-Operador");
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