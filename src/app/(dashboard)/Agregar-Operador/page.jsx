"use client"
import React from 'react'
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FormOperador from "@/components/partials/froms/RegistrarNuevoOperador";
const page = () => {
  return (
    <div>
      <Card title="Agregar Operador">
        <FormOperador/>
      </Card>
    </div>
  )
}

export default page