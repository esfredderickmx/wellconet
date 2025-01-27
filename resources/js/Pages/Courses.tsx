import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";

export default function Courses() {
	return (
		<>
			<Head title="Cursos"/>
		</>
	);
}

Courses.layout = (page: any) => <DefaultLayout children={page} header="Cursos"/>;