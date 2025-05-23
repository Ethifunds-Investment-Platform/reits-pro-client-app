import { PaginatedResponse } from "@/types/global.types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Pagination(props: PaginatedResponse<any>) {
	const prev = props.hasPrevPage ? props.prevPage! : props.page;
	const next = props.hasNextPage ? props.nextPage! : props.page;
	const pageAfterNext = props.totalPages > next ? next + 1 : next;
	const page = props.page;

	return (
		<div className="flex items-center justify-center gap-5 px-5 border rounded-lg">
			<Link to={`?page=${prev}`} className="flex items-center gap-3 w-1/2">
				<ChevronLeft className="w-4 h-4" /> <span>Previous</span>{" "}
			</Link>
			<div className="flex items-center grow [&_a]:px-3 [&_a]:py-1 [&_a]:border-x [&_a]:w-full  [&_a]:transition ">
				<Link to={`?page=${page}`} className="bg-neutral-100">
					{page}
				</Link>
				{props.hasNextPage && (
					<Link to={`?page=${next}`} className="hover:bg-neutral-100">
						{next}
					</Link>
				)}
				{props.page < props.totalPages && <Link to={`?page=${pageAfterNext}`}>...</Link>}
			</div>
			<Link to={`?page=${next}`} className="flex items-center gap-3 w-1/2">
				<span>Next</span> <ChevronRight className="w-4 h-4" />{" "}
			</Link>
		</div>
	);
}
