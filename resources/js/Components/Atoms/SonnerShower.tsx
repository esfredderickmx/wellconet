import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import { CheckCircle, Info, MinusCircle, Warning, XCircle } from "@phosphor-icons/react";
import { useTheme } from "@/Components/theme-provider";
import { useMediaQuery } from "@/hooks/use-media-query";

export function SonnerShower() {
	const {theme} = useTheme();
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const {notification} = usePage().props.flash;

	useEffect(() => {
		if (notification) {
			const notificationProps = {
				description: notification.description,
				duration: notification.duration,
			};

			switch (notification.type) {
				case "success":
					toast.success(notification.message, notificationProps);
					break;
				case "info":
					toast.info(notification.message, notificationProps);
					break;
				case "warning":
					toast.warning(notification.message, notificationProps);
					break;
				case "error":
					toast.error(notification.message, notificationProps);
					break;
				default:
					toast(notification.message, notificationProps);
					break;
			}
		}
	}, [notification]);

	return (
		<Toaster position={isDesktop ? "bottom-right" : "top-center"} theme={theme} richColors icons={{
			success: <CheckCircle weight="fill" size={20}/>,
			info: <Info weight="fill" size={20}/>,
			warning: <Warning weight="fill" size={20}/>,
			error: <XCircle weight="fill" size={20}/>,
			close: <MinusCircle size={20}/>,
		}}/>
	);
}