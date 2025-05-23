
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import PropertiesPage from "./pages/properties";
import PropertyDetailPage from "./pages/property-details";
import DevelopersPartners from "./pages/developer-partners";
import HowItWorksPage from "./pages/how-it-works";
import NotFound from "./pages/not-found";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ResetPasswordPage from "./pages/auth/reset-password";
import VerifyEmailPage from "./pages/auth/verify-email";

// Profile Pages
import DeveloperProfile from "./pages/profile/developer";
import InvestorProfile from "./pages/profile/investor";

// Developer Dashboard
import DeveloperDashboardPage from "./pages/developer/dashboard";
import Forbidden from "./pages/forbidden";
import AccountLayout from "./layouts/account.layout";
import HomeLayout from "./layouts/home.layout";
import ProjectsPage from "./pages/developer/projects";
import ProjectDetailsPage from "./pages/developer/projects/project-details";
import CreateProjectPage from "./pages/developer/projects/create";

// Investor Dashboard
import InvestorDashboardPage from "./pages/investor/dashboard";

import * as React from "react";
import useInit from "./hooks/use-init";
import InvestorInvestmentsPage from "./pages/investor/investments";

const App = () => {
	useInit();

	return (
		<React.Fragment>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<Routes>
					<Route element={<HomeLayout />}>
						<Route path="/" element={<HomePage />} />
						<Route path="/properties" element={<PropertiesPage />} />
						<Route path="/properties/:id" element={<PropertyDetailPage />} />
						<Route path="/developers" element={<DevelopersPartners />} />
						<Route path="/how-it-works" element={<HowItWorksPage />} />
						{/* <Route path="/calculator" element={<CalculatorPage />} /> */}

						{/* Authentication Routes */}
						<Route path="/auth/login" element={<LoginPage />} />
						<Route path="/auth/register" element={<RegisterPage />} />
						<Route path="/auth/reset-password" element={<ResetPasswordPage />} />
						<Route path="/auth/verify" element={<VerifyEmailPage />} />
					</Route>

					{/* Developer Dashboard Routes */}
					<Route element={<AccountLayout requiredRole="developer" />}>
						<Route path="/developer/dashboard" element={<DeveloperDashboardPage />} />
						<Route path="/developer/projects" element={<ProjectsPage />} />
						<Route path="/developer/projects/create" element={<CreateProjectPage />} />
						<Route path="/developer/projects/:id" element={<ProjectDetailsPage />} />
						<Route path="/profile/developer" element={<DeveloperProfile />} />
					</Route>

					{/* Investor Routes */}
					<Route element={<AccountLayout requiredRole="investor" />}>
						<Route path="/investor/dashboard" element={<InvestorDashboardPage />} />
						<Route path="/investor/investments" element={<InvestorInvestmentsPage />} />
						<Route path="/profile/investor" element={<InvestorProfile />} />
					</Route>

					<Route element={<HomeLayout />}>
						{/* 403 Route */}
						<Route path="/forbidden" element={<Forbidden />} />

						{/* 404 Route */}
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</React.Fragment>
	);
};

export default App;
