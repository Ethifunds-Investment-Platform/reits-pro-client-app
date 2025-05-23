import { Project } from "@/types/project.types";
import ListItem from "./list-item";

type TableProps = {
	data: Project[];
};
export default function ListTable(props: TableProps) {
	return (
		<div className="flex flex-col gap-2 py-3">
			{props.data.map((item) => (
				<ListItem key={item.id} item={item} />
			))}
		</div>
	);
}
