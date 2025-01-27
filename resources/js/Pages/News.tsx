import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";

export default function News() {
	return (
		<>
			<Head title="Noticias"/>
		</>
	);
}

News.layout = (page: any) => <DefaultLayout children={page} header="Noticias"/>;