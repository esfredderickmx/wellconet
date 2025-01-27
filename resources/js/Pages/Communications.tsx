import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";

export default function Communications() {
	return (
		<>
			<Head title="Comunicaciones"/>
		</>
	);
}

Communications.layout = (page: any) => <DefaultLayout children={page} header="Comunicaciones"/>;