import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";

export default function Announcements() {
	return (
		<>
			<Head title="Anuncios"/>
		</>
	);
}

Announcements.layout = (page: any) => <DefaultLayout children={page} header="Anuncios"/>; 