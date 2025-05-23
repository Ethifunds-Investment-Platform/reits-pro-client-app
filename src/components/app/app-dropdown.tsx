import {
	DropdownMenu,
	DropdownMenuContent,

	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type props = {
	children: React.ReactNode;
	trigger: React.ReactNode;
	disabled?: boolean;
};
export default function AppDropdown({ children, trigger, disabled }: props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger disabled={disabled} className="!outline-none">
				{trigger}
			</DropdownMenuTrigger>
			<DropdownMenuContent>{children}</DropdownMenuContent>
		</DropdownMenu>
	);
}
