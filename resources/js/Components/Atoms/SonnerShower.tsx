import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import { CheckCircle, CircleNotch, Info, MinusCircle, Warning, XCircle } from "@phosphor-icons/react";

export function SonnerShower() {
	const {notification} = usePage().props.flash;

	useEffect(() => {
		if (notification) {
			const notificationProps = {
				description: notification.description,
				duration: notification.duration,
				richColors: true,
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
		<Toaster icons={{
			success: <CheckCircle weight="fill" size={20}/>,
			info: <Info weight="fill" size={20}/>,
			warning: <Warning weight="fill" size={20}/>,
			error: <XCircle weight="fill" size={20}/>,
			loading: <CircleNotch size={20} className="animate-spin"/>,
			close: <MinusCircle size={20}/>,
		}}/>
	);
}