import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";

export default function Ranking() {
	return (
		<>
			<Head title="Clasificatoria"/>
		</>
	);
}

Ranking.layout = (page: any) => <DefaultLayout children={page} header="Clasificatoria"/>;