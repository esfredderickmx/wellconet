import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";

export default function Campaigns() {
	return (
		<>
			<Head title="Campañas"/>
		</>
	);
}

Campaigns.layout = (page: any) => <DefaultLayout children={page} header="Campañas"/>;