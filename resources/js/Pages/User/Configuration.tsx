import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Configuration() {
	return (
		<>
			<Head title="Configuraciones"/>
		</>
	);
}

Configuration.layout = (page: any) => <DefaultLayout children={page} header="Configuraciones"/>;