import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "@/components/theme-provider";

export function ThemeSelector() {
	const {theme} = useTheme();
	const {setTheme} = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
					<Moon weight="fill" className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
					<span className="sr-only">Cambiar tema</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup value={theme}>
					<DropdownMenuRadioItem value="light" onClick={() => setTheme("light")}>Claro</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="dark" onClick={() => setTheme("dark")}>Oscuro</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="system" onClick={() => setTheme("system")}>Sistema</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
