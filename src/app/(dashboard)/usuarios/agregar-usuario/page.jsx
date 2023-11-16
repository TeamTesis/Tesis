"use client"
import React from 'react'
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import FormAddUser from "@/components/partials/froms/RegistrarNuevoUsuario";
const page = () => {
  return (
    <div>
      <Card title="Agregar usuario a la empresa">
        <FormAddUser/>
      </Card>
    </div>
  )
}

export default page