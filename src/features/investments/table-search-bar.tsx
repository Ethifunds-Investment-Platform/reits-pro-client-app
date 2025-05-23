import * as React from "react";
import useCustomNavigation from "@/hooks/use-navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default React.memo(function TableSearchBar(props: { disabled?: boolean }) {
	const [text, setText] = React.useState("");
	const { navigate, queryParams } = useCustomNavigation();

	const hasQuery = React.useMemo(() => queryParams.has("search"), [queryParams]);

	const search = () => {
		navigate(`?search=${text}`);
	};

	React.useMemo(() => {
		if (text === "" && hasQuery) queryParams.delete("search");
	}, [hasQuery, text]);

	return (
		<div className="flex flex-1 md:max-w-sm items-center gap-2 relative">
			{/* <div className="cursor-pointer" onClick={search}> */}
			<Search className="absolute left-2 h-4 w-4 text-gray-400" onClick={search} />
			{/* </div> */}
			<Input
				type="search"
				name="search-bar"
				id="search-bar"
				placeholder="Search investments..."
				// className="w-full outline-none placeholder:text-b-2 text-b-2"
				className="pl-8"
				onChange={(e) => setText(e.target.value.trim())}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						search();
					}
				}}
				value={text}
				disabled={props.disabled}
			/>
		</div>
	);
});
