"use client";
import React from 'react'
import TablaUnidades from "@/components/partials/table/TablaUnidades";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const Unidades = () => {
    const router = useRouter();
    const actions = [

        {
            name: "view",
            icon: "heroicons-outline:eye",
            doit: () => {
                router.push("/unidad-preview");
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
              text="Agregar Unidad"
              className=" btn-dark font-normal btn-sm "
              iconClass="text-lg"
              onClick={() => {
                router.push("/Agregar-Unidad");
              }}
            />
            </div>
            <div className=" space-y-5">
                <TablaUnidades />
            </div>

        </div>
    );
};

export default Unidades