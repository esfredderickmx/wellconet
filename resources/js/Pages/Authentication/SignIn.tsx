import SimpleLayout from "@/Layouts/SimpleLayout";
import { Head, Link } from "@inertiajs/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { SignIn as SignInIcon, UserCircle } from "@phosphor-icons/react";
import { ThemeSelector } from "@/Components/ThemeSelector";

export default function SignIn() {
  return (
    <SimpleLayout>
      <Head title="Inicio de sesión"/>

      <Card className="md:max-w-lg max-w-sm">
        <CardHeader>
          <CardTitle className="inline-flex items-center gap-1"><UserCircle size={24}/>Inicio de sesión</CardTitle>
          <CardDescription>Da clic en el botón a continuación para acceder con las credenciales asociadas a tu cuenta de Google.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <a className={buttonVariants({variant: "default"}) + " w-full"} href={route('login')}><SignInIcon/>Iniciar sesión</a>
          <div className="flex-grow">
            <ThemeSelector/>
          </div>
        </CardContent>
      </Card>
    </SimpleLayout>
  );
}
