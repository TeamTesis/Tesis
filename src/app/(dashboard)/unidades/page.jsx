"use client"
import TablaUnidades from "@/components/partials/table/TablaUnidades";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation"; 

function Unidades() {
    const router = useRouter();
    return (
        <div>
            <div className="py-3">
            <Button
              icon="heroicons-outline:plus-sm"
              text="Agregar Unidad"
              className=" btn-dark font-normal btn-sm "
              iconClass="text-lg"
              onClick={() => {
                router.push("unidades/agregar-unidad");
              }}
            />
            </div>
            <div className=" space-y-5">
                <TablaUnidades/>
            </div>

        </div>
    );
};

export default Unidades