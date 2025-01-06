import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CircleNotch, Eraser, FloppyDiskBack, NotePencil, Pen } from "@phosphor-icons/react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TiptapEditor } from "@/Components/TiptapEditor";

export function CreatePublicationModal() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg">
            <Pen/>
            Escribir una publicación
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Escribe una publicación nueva</DialogTitle>
            <DialogDescription>
              Llena el formulario con la información que deseas compartir.
            </DialogDescription>
          </DialogHeader>
          <CreatePublicationForm setOpen={setOpen}/>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="lg">
          <Pen/>
          Escribir una publicación
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Escribe una publicación nueva</DrawerTitle>
          <DrawerDescription>
            Llena el formulario con la información que deseas compartir.
          </DrawerDescription>
        </DrawerHeader>
        <CreatePublicationForm setOpen={setOpen} className="px-4"/>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function CreatePublicationForm({className, setOpen}: { className?: string, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
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
        setOpen(false);
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
    <form onSubmit={submit} className={cn("grid items-start gap-4", className)}>
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
      <div className="grid gap-2">
        <Button type="submit" disabled={processing}>
          {processing ? (
            <CircleNotch className="animate-spin"/>
          ) : (
            <NotePencil weight="fill"/>
          )}
          Publicar
        </Button>
        <Button variant="secondary" type="submit" disabled={processing}>
          {processing ? (
            <CircleNotch className="animate-spin"/>
          ) : (
            <Eraser weight="fill"/>
          )}
          Guardar como borrador
        </Button>
      </div>
    </form>
  );
}
