import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HomeDialogs from "@/dialogs/home-dialogs";
import useAuth from "@/hooks/use-auth";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
	useAuth();
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow">
				<Outlet />
			</main>
			<HomeDialogs />
			<Footer />
		</div>
	);
}
