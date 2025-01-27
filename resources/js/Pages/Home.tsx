import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { QuestionMark } from "@phosphor-icons/react";

export default function Home() {
	return (
		<>
			<Head title="Inicio"/>

			<Alert>
				<QuestionMark/>
				<AlertTitle>Consejo</AlertTitle>
				<AlertDescription>
					Usa el menú lateral para navegar por el sitio.
				</AlertDescription>
			</Alert>
		</>
	);
}

Home.layout = (page: any) => <DefaultLayout children={page} header="Inicio"/>; 