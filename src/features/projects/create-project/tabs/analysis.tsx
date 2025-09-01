import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import FileInput from "@/components/ui/form-input/file-input";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ProjectFormAnalysisTabProps = {
	form: UseFormReturn<any>;
	existingDocuments?: {
		project_memo?: string | null;
		developer_track_record?: string | null;
		market_analysis?: string | null;
		financial_projections?: string | null;
	};
};

type FileStatus = {
	fileName: string | null;
	isUploaded: boolean;
};

export default function ProjectFormAnalysisTab({
	form,
	existingDocuments,
}: ProjectFormAnalysisTabProps) {
	const [fileStatus, setFileStatus] = useState<Record<string, FileStatus>>({
		project_memo: {
			fileName: existingDocuments?.project_memo ? "Existing Document" : null,
			isUploaded: !!existingDocuments?.project_memo,
		},
		developer_track_record: {
			fileName: existingDocuments?.developer_track_record ? "Existing Document" : null,
			isUploaded: !!existingDocuments?.developer_track_record,
		},
		market_analysis: {
			fileName: existingDocuments?.market_analysis ? "Existing Document" : null,
			isUploaded: !!existingDocuments?.market_analysis,
		},
		financial_projections: {
			fileName: existingDocuments?.financial_projections ? "Existing Document" : null,
			isUploaded: !!existingDocuments?.financial_projections,
		},
	});

	function handleFileChange(fieldName: string, e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.size > 1 * 1024 * 1024) {
			toast.error("File size too large", {
				description: "Please upload a file smaller than 1MB",
			});
			return;
		}

		// Set the File object directly in the form
		form.setValue(fieldName, file);

		// Update file status
		setFileStatus((prev) => ({
			...prev,
			[fieldName]: {
				fileName: file.name,
				isUploaded: true,
			},
		}));
	}

	function handleRemoveFile(fieldName: string) {
		// Clear the form value
		form.setValue(fieldName, null);

		// Reset file status
		setFileStatus((prev) => ({
			...prev,
			[fieldName]: {
				fileName: null,
				isUploaded: false,
			},
		}));
	}

	function getFileStatusMessage(fieldName: string) {
		const status = fileStatus[fieldName];
		const existingDoc = existingDocuments?.[fieldName as keyof typeof existingDocuments];

		if (status?.isUploaded && status?.fileName) {
			if (existingDoc && status.fileName === "Existing Document") {
				return "Existing Document";
			}
			return `Uploaded: ${status.fileName}`;
		}
		return null;
	}

	function hasExistingDocument(fieldName: string): boolean {
		return !!existingDocuments?.[fieldName as keyof typeof existingDocuments];
	}

	return (
		<TabsContent value="analysis">
			<div className="space-y-6">
				<h2 className="text-lg font-semibold text-navy-800">Project Analysis Documents</h2>

				<FormField
					control={form.control}
					name="project_memo"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project Memo</FormLabel>
							<FormControl>
								<div className="space-y-2">
									{fileStatus.project_memo.isUploaded ? (
										<div className="flex items-center justify-between p-3 border rounded-lg">
											<div className="flex items-center gap-2">
												{hasExistingDocument("project_memo") ? (
													<>
														<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
														<p className="text-sm text-blue-600">
															{getFileStatusMessage("project_memo")}
														</p>
													</>
												) : (
													<>
														<div className="w-2 h-2 bg-green-500 rounded-full"></div>
														<p className="text-sm text-green-600">
															{getFileStatusMessage("project_memo")}
														</p>
													</>
												)}
											</div>
											<Button
												type="button"
												variant="ghost"
												size="sm"
												onClick={() => handleRemoveFile("project_memo")}
												className="text-red-500 hover:text-red-700"
											>
												<X className="h-4 w-4" />
											</Button>
										</div>
									) : (
										<FileInput
											name="project_memo"
											accept=".pdf,.doc,.docx"
											placeholder="Upload project memo document"
											maxFileSize="1MB"
											onChange={(e) => handleFileChange("project_memo", e)}
										/>
									)}
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="developer_track_record"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Developer Track Record</FormLabel>
							<FormControl>
								<div className="space-y-2">
									{fileStatus.developer_track_record.isUploaded ? (
										<div className="flex items-center justify-between p-3 border rounded-lg">
											<div className="flex items-center gap-2">
												{hasExistingDocument("developer_track_record") ? (
													<>
														<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
														<p className="text-sm text-blue-600">
															{getFileStatusMessage("developer_track_record")}
														</p>
													</>
												) : (
													<>
														<div className="w-2 h-2 bg-green-500 rounded-full"></div>
														<p className="text-sm text-green-600">
															{getFileStatusMessage("developer_track_record")}
														</p>
													</>
												)}
											</div>
											<Button
												type="button"
												variant="ghost"
												size="sm"
												onClick={() => handleRemoveFile("developer_track_record")}
												className="text-red-500 hover:text-red-700"
											>
												<X className="h-4 w-4" />
											</Button>
										</div>
									) : (
										<FileInput
											name="developer_track_record"
											accept=".pdf,.doc,.docx"
											placeholder="Upload developer track record document"
											maxFileSize="1MB"
											onChange={(e) => handleFileChange("developer_track_record", e)}
										/>
									)}
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<FormField
						control={form.control}
						name="market_analysis"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Market Analysis</FormLabel>
								<FormControl>
									<div className="space-y-2">
										{fileStatus.market_analysis.isUploaded ? (
											<div className="flex items-center justify-between p-3 border rounded-lg">
												<div className="flex items-center gap-2">
													{hasExistingDocument("market_analysis") ? (
														<>
															<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
															<p className="text-sm text-blue-600">
																{getFileStatusMessage("market_analysis")}
															</p>
														</>
													) : (
														<>
															<div className="w-2 h-2 bg-green-500 rounded-full"></div>
															<p className="text-sm text-green-600">
																{getFileStatusMessage("market_analysis")}
															</p>
														</>
													)}
												</div>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													onClick={() => handleRemoveFile("market_analysis")}
													className="text-red-500 hover:text-red-700"
												>
													<X className="h-4 w-4" />
												</Button>
											</div>
										) : (
											<FileInput
												name="market_analysis"
												accept=".pdf,.doc,.docx,.xls,.xlsx"
												placeholder="Upload market analysis document"
												maxFileSize="1MB"
												onChange={(e) => handleFileChange("market_analysis", e)}
											/>
										)}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="financial_projections"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Financial Projections</FormLabel>
								<FormControl>
									<div className="space-y-2">
										{fileStatus.financial_projections.isUploaded ? (
											<div className="flex items-center justify-between p-3 border rounded-lg">
												<div className="flex items-center gap-2">
													{hasExistingDocument("financial_projections") ? (
														<>
															<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
															<p className="text-sm text-blue-600">
																{getFileStatusMessage("financial_projections")}
															</p>
														</>
													) : (
														<>
															<div className="w-2 h-2 bg-green-500 rounded-full"></div>
															<p className="text-sm text-green-600">
																{getFileStatusMessage("financial_projections")}
															</p>
														</>
													)}
												</div>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													onClick={() => handleRemoveFile("financial_projections")}
													className="text-red-500 hover:text-red-700"
												>
													<X className="h-4 w-4" />
												</Button>
											</div>
										) : (
											<FileInput
												name="financial_projections"
												accept=".pdf,.doc,.docx,.xls,.xlsx"
												placeholder="Upload financial projections document"
												maxFileSize="1MB"
												onChange={(e) => handleFileChange("financial_projections", e)}
											/>
										)}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
		</TabsContent>
	);
}
