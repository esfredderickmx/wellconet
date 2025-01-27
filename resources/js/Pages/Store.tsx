import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";

export default function Store() {
	return (
		<>
			<Head title="Canje de puntos"/>
		</>
	);
}

Store.layout = (page: any) => <DefaultLayout children={page} header="Canje de puntos"/>;