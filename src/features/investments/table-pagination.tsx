import Pagination from "@/components/app/pagination";
import { PaginatedResponse } from "@/types/global.types";

export default function TablePagination(props: PaginatedResponse<any>) {
	return (
		<div className="flex justify-center pt-3">
			<Pagination {...props} />
		</div>
	);
}
