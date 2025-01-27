import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Statistics() {
	return (
		<>
			<Head title="Mis estadísticas"/>
		</>
	);
}

Statistics.layout = (page: any) => <DefaultLayout children={page} header="Mis estadísticas"/>;