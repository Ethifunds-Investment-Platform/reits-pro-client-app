import { SelectBox } from "@/components/ui/form-input";
import useCustomNavigation from "@/hooks/use-navigation";
import { PROJECT_STATUS } from "@/types/project.types";

export default function ProjectStatus() {
	const { queryParams } = useCustomNavigation();

	const project_status = queryParams.get("project_status") ?? "all";
	const options = ["all", ...PROJECT_STATUS].map((status) => ({
		title: status,
		value: status,
	}));

	const change = (value: string) => {
		if (value === "all") {
			queryParams.delete("project_status");
		} else {
			queryParams.set("project_status", value);
		}
	};

	return (
		<div>
			<SelectBox
				label="Project Status"
                options={options}
                className="w-full"
				placeholder="Select Status"
				value={project_status}
				onchange={change}
			/>
		</div>
	);
}
