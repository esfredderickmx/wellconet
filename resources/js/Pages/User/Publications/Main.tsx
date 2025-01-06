import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head, Link } from "@inertiajs/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pen } from "@phosphor-icons/react";
import React from "react";

export default function Main() {
  return (
    <DefaultLayout header="Mis publicaciones">
      <Head title="Mis publicaciones"/>

      <Link className={buttonVariants({
        variant: "default",
        size: "lg",
      })} href={route("user.publications.new-post")}>
        <Pen/>
        Escribir una publicación
      </Link>
    </DefaultLayout>
  );
}
