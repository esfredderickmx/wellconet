import React, { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/Components/ui/drawer";
import { Label } from "@/Components/ui/label";
import { useForm, usePage } from "@inertiajs/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { CalendarBlank, FloppyDiskBack, SpinnerGap } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/Components/ui/calendar";

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
							Cuéntanos más sobre ti, y dinos dónde podemos encontrarte.
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
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);

	const departments = usePage().props.dictionaries.departments;
	const offices = usePage().props.dictionaries.offices;

	const {data, setData, post, processing, errors, reset} = useForm<{
		birth_date?: Date;
		department?: string;
		office?: string;
	}>({
		birth_date: undefined,
		department: "",
		office: "",
	});

	const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		toast.dismiss();
		toast.promise(
			new Promise<void>((resolve, reject) => {
				post(route("forms.complete-profile"), {
					onSuccess: () => {
						setOpen(false);
						reset();

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
				loading: "Guardando cambios en tu perfil...",
				success: "Cambios guardados correctamente",
				error: (type) =>
					type === "messages"
						? "Por favor, valida la información ingresada"
						: "Ocurrió un error al guardar los cambios",
			},
		);
	};

	return (
		<form onSubmit={submit} className={cn("grid items-start gap-4", className)}>
			<div className="grid gap-2 w-full">
				<Label htmlFor="birth_date">Fecha de nacimiento</Label>
				<Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
					<PopoverTrigger asChild>
						<Button
							id="birth_date"
							variant={"outline"}
							className={cn(
								"pl-3 text-left font-normal",
								!data.birth_date && "text-muted-foreground",
							)}
						>
							{data.birth_date ? format(data.birth_date, "PPP", {locale: es}) : <span>¿Cuándo naciste?</span>}
							<CalendarBlank className="ml-auto opacity-50"/>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="end">
						<Calendar
							locale={es}
							mode="single"
							showOutsideDays={false}
							captionLayout="dropdown-buttons"
							selected={data.birth_date}
							onSelect={value => setData("birth_date", value ?? new Date())}
							onDayClick={() => setIsCalendarOpen(false)}
							defaultMonth={data.birth_date}
							fromYear={new Date().getFullYear() - 100}
							toYear={new Date().getFullYear()}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
				{errors.birth_date && <div className="text-sm text-red-500">{errors.birth_date}</div>}
			</div>
			<div className="grid gap-2 w-full">
				<Label htmlFor="department">Departamento</Label>
				<Select value={data.department} onValueChange={value => setData("department", value)}>
					<SelectTrigger id="department">
						<SelectValue placeholder="¿A qué departamento perteneces?"/>
					</SelectTrigger>
					<SelectContent>
						{departments && departments.map((department) => (
							<SelectItem key={department.uuid} value={department.uuid}>{department.name}</SelectItem>
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
							<SelectItem key={office.uuid} value={office.uuid}>{office.name}</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.office && <div className="text-sm text-red-500">{errors.office}</div>}
			</div>
			<Button type="submit" disabled={processing}>
				{processing ? (
					<SpinnerGap className="animate-spin"/>
				) : (
					<FloppyDiskBack weight="fill"/>
				)}
				Guardar cambios
			</Button>
		</form>
	);
}
