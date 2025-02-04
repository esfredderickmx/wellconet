import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { TiptapEditor } from "@/Components/Molecules/TiptapEditor";
import { Button, buttonVariants } from "@/Components/ui/button";
import { Eraser, NotePencil, SpinnerGap } from "@phosphor-icons/react";
import React from "react";
import { toast } from "sonner";
import { Textarea } from "@/Components/ui/textarea";

export default function NewPost() {
	const {data, setData, post, processing, errors} = useForm<{
		title?: string;
		description?: string;
		body?: string;
		picture?: File;
		is_sketch: boolean;
	}>({
		title: "",
		description: "",
		body: "",
		picture: undefined,
		is_sketch: false,
	});

	const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		toast.dismiss();
		toast.promise(
			new Promise<void>((resolve, reject) => {
				post(route("forms.new-post"), {
					onSuccess: () => {
						router.get(route("user.publications"));

						resolve();
					},
					onError: () => {
						if (Object.keys(errors).length > 0) {
							reject("messages");
						} else {
							reject("unkown");
						}
					},
				});
			}),
			{
				loading: data.is_sketch ? "Guardando el borrador de tu escrito..." : "Publicando tu última obra maestra...",
				success: data.is_sketch ? "Borrador guardado correctamente" : "Escrito publicado correctamente",
				error: (type) =>
					type === "messages"
						? "Por favor, valida la información ingresada"
						: (data.is_sketch ? "Ocurrió un error al guardar tu borrador" : "Ocurrió un error al publicar tu escrito"),
			},
		);
	};
	return (
		<>
			<Head title="Escribir publicación"/>

			<Card className="max-w-md lg:max-w-4xl">
				<CardHeader>
					<CardTitle>Escribe una publicación nueva</CardTitle>
					<CardDescription>Llena el siguiente formulario con la información que deseas compartir.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={submit} id="newPost" className="grid items-start gap-4">
						<div className="grid gap-2">
							<Label htmlFor="title">Título</Label>
							<Input id="title" type="text" placeholder="¿Cómo se llamará tu escrito?" value={data.title} onChange={event => setData("title", event.target.value)} autoFocus/>
							{errors.title && <div className="text-sm text-destructive">{errors.title}</div>}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="description">Descripción</Label>
							<Textarea id="description" placeholder="Escribe una pequeña introducción para tu publicación." value={data.description} onChange={event => setData("description", event.target.value)}/>
							{errors.description && <div className="text-sm text-destructive">{errors.description}</div>}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="body">Cuerpo</Label>
							<TiptapEditor value={data.body} placeholder="Escribe algo increíble..." onChange={content => setData("body", content)}/>
							{errors.body && <div className="text-sm text-destructive">{errors.body}</div>}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="picture">Imagen</Label>
							<Input id="picture" type="file" onChange={event => setData("picture", event.target.files![0])}/>
							{errors.picture && <div className="text-sm text-destructive">{errors.picture}</div>}
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-end gap-2">
					<Link className={buttonVariants({
						variant: "ghost",
					})} href={route("user.publications")}>Cancelar</Link>
					<Button variant="secondary" type="submit" form="newPost" onClick={() => setData("is_sketch", true)} disabled={processing}>
						{processing ? (
							<SpinnerGap className="animate-spin"/>
						) : (
							<Eraser weight="fill"/>
						)}
						Guardar como borrador
					</Button>
					<Button type="submit" form="newPost" onClick={() => setData("is_sketch", false)} disabled={processing}>
						{processing ? (
							<SpinnerGap className="animate-spin"/>
						) : (
							<NotePencil weight="fill"/>
						)}
						Publicar
					</Button>
				</CardFooter>
			</Card>
		</>
	);
}

NewPost.layout = (page: any) => <DefaultLayout children={page} header="Escribir publicación"/>;