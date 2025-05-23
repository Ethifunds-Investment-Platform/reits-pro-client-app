import { Button } from "@/components/ui/button";
import useActions from "@/store/actions";
import { PlusCircle } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

export default (function NewProjectButton() {
	const { ui } = useActions();

	const open = React.useCallback(() => {
		ui.changeDialog({
			show: true,
			type: "new_project",
		});
	}, []);
	return (
		<Button onClick={open} className="bg-navy-800 hover:bg-navy-700 text-white self-end" asChild>
			<Link to="/developer/projects/create">
				<PlusCircle className="h-4 w-4 mr-2" /> New Project
			</Link>
		</Button>
	);
});
