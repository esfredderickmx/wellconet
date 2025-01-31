import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head, Link } from "@inertiajs/react";
import { buttonVariants } from "@/Components/ui/button";
import { Pen } from "@phosphor-icons/react";
import React from "react";

export default function Main() {
	return (
		<>
			<Head title="Mis publicaciones"/>

			<Link className={buttonVariants({
				variant: "default",
				size: "lg",
			})} href={route("user.publications.new-post")}>
				<Pen/>
				Escribir una publicación
			</Link>
		</>
	);
}

Main.layout = (page: any) => <DefaultLayout children={page} header="Mis publicaciones"/>;