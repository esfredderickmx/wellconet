import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TiptapEditor } from "@/Components/TiptapEditor";
import { Button, buttonVariants } from "@/components/ui/button";
import { CircleNotch, Eraser, NotePencil } from "@phosphor-icons/react";
import React from "react";
import { toast } from "@/hooks/use-toast";

export default function NewPost() {
  const {data, setData, post, processing, errors} = useForm({
    title: "",
    body: "",
    picture: "",
    is_sketch: false,
  });

  const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    post(route("forms.complete-profile"), {
      onFinish: () => {
        router.reload();
      },
      onSuccess: () => {
        toast({
          description: "Perfil completado correctamente.",
        });
      },
    });
  };
  return (
    <DefaultLayout header="Escribir publicación">
      <Head title="Escribir publicación"/>

      <Card className="max-w-md lg:max-w-4xl">
        <CardHeader>
          <CardTitle>Escribe una publicación nueva</CardTitle>
          <CardDescription>Llena el formulario con la información que deseas compartir.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid items-start gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" type="text" placeholder="Título" value={data.title} onChange={e => setData("title", e.target.value)}/>
              {errors.title && <div className="text-sm text-red-500">{errors.title}</div>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Cuerpo</Label>
              <TiptapEditor/>
              {errors.title && <div className="text-sm text-red-500">{errors.title}</div>}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Link className={buttonVariants({
            variant: "ghost",
          })} href={route("user.publications")}>Cancelar</Link>
          <Button variant="secondary" type="submit" disabled={processing}>
            {processing ? (
              <CircleNotch className="animate-spin"/>
            ) : (
              <Eraser weight="fill"/>
            )}
            Guardar como borrador
          </Button>
          <Button type="submit" disabled={processing}>
            {processing ? (
              <CircleNotch className="animate-spin"/>
            ) : (
              <NotePencil weight="fill"/>
            )}
            Publicar
          </Button>
        </CardFooter>
      </Card>
    </DefaultLayout>
  );
}
