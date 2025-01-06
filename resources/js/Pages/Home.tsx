import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { QuestionMark } from "@phosphor-icons/react";

export default function Home() {
  return (
    <DefaultLayout header="Inicio">
      <Head title="Inicio"/>

      <Alert>
        <QuestionMark/>
        <AlertTitle>Consejo</AlertTitle>
        <AlertDescription>
          Usa el menú lateral para navegar por el sitio.
        </AlertDescription>
      </Alert>
    </DefaultLayout>
  );
}
