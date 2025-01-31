import React, { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { Label } from "@/Components/ui/label";
import { router, useForm, usePage } from "@inertiajs/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { CircleNotch, FloppyDiskBack } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export function CompleteProfileModal() {
	const [open, setOpen] = useState(!usePage().props.auth.user.is_profile_complete);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="[&>button:last-child]:hidden" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
					<DialogHeader>
						<DialogTitle>Completa tu perfil</DialogTitle>
						<DialogDescription>
							Indícanos tu departamento y la sede donde estás ubicado.
						</DialogDescription>
					</DialogHeader>
					<CompleteProfileForm setOpen={setOpen}/>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen} dismissible={false}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Completa tu perfil</DrawerTitle>
					<DrawerDescription>
						Indícanos tu departamento y la sede donde estás ubicado.
					</DrawerDescription>
				</DrawerHeader>
				<CompleteProfileForm setOpen={setOpen} className="px-4 pb-2"/>
			</DrawerContent>
		</Drawer>
	);
}

function CompleteProfileForm({className, setOpen}: { className?: string, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
	const departments = usePage().props.enums.user_departments;
	const offices = usePage().props.enums.user_offices;

  const {data, setData, post, processing, errors} = useForm({
    department: "",
    office: "",
  });

	const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

    post(route("forms.complete-profile"), {
      onSuccess: () => {
        router.reload();
        setOpen(false);

        toast({
          description: "Perfil completado correctamente.",
        });
      },
    });
  };

	return (
		<form onSubmit={submit} className={cn("grid items-start gap-4", className)}>
			<div className="grid gap-2 w-full">
				<Label htmlFor="department">Departamento</Label>
				<Select value={data.department} onValueChange={value => setData("department", value)}>
					<SelectTrigger id="department">
						<SelectValue placeholder="¿A qué departamento perteneces?"/>
					</SelectTrigger>
					<SelectContent>
						{departments && departments.map((department) => (
							<SelectItem key={department.value} value={department.value}>{department.label}</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.department && <div className="text-sm text-red-500">{errors.department}</div>}
			</div>
			<div className="grid gap-2">
				<Label htmlFor="office">Sede</Label>
				<Select value={data.office} onValueChange={value => setData("office", value)}>
					<SelectTrigger id="office">
						<SelectValue placeholder="¿Para qué sede fuiste contratado?"/>
					</SelectTrigger>
					<SelectContent>
						{offices && offices.map((office) => (
							<SelectItem key={office.value} value={office.value}>{office.label}</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.office && <div className="text-sm text-red-500">{errors.office}</div>}
			</div>
			<Button type="submit" disabled={processing}>
				{processing ? (
					<CircleNotch className="animate-spin"/>
				) : (
					<FloppyDiskBack weight="fill"/>
				)}
				Guardar
			</Button>
		</form>
	);
}
