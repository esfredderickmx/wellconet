import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/Components/ui/toaster";

export function ToastShower() {
  const {message} = usePage().props.flash;
  const {toast} = useToast();

  useEffect(() => {
    if (message) {
      toast({
        description: message.message,
        variant: message.type,
      });
    }
  }, [message]);

  return (
    <Toaster/>
  );
}
