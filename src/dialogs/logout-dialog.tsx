
import React from "react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import useAppSelector from "@/store/hooks";
import useActions from "@/store/actions";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LogoutDialog() {
  const { dialog } = useAppSelector("ui");
  const { ui } = useActions();
  const [isLoading, setIsLoading] = React.useState(false);
  const isOpen = dialog.show && dialog.type === "logout";
  
  const handleClose = () => {
    if (isLoading) return;
    ui.resetDialog();
  };

  const handleConfirm = async () => {
    if (dialog.action) {
      setIsLoading(true);
      await dialog.action();
      setIsLoading(false);
      ui.resetDialog();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout of your account?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleConfirm} className="bg-red-600 hover:bg-red-700">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Logout"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
