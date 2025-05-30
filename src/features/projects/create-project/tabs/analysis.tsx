import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import FileInput from "@/components/ui/form-input/file-input";
import blobReader from "@/lib/blob-reader";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ProjectFormAnalysisTabProps = {
	form: UseFormReturn<any>;
};

type FileStatus = {
	fileName: string | null;
	isUploaded: boolean;
};

export default function ProjectFormAnalysisTab({ form }: ProjectFormAnalysisTabProps) {
	const [fileStatus, setFileStatus] = useState<Record<string, FileStatus>>({
		project_memo: { fileName: null, isUploaded: false },
		developer_track_record: { fileName: null, isUploaded: false },
		market_analysis: { fileName: null, isUploaded: false },
		financial_projections: { fileName: null, isUploaded: false },
	});

	async function handleFileChange(fieldName: string, e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

			if (file.size > 2 * 1024 * 1024) {
				toast.error("File size too large", {
					description: "Please upload a file smaller than 2MB",
				});
				return;
			}

		try {
			const base64 = await blobReader(file);
			const metadata = `${file.type}|${file.size}`;
			const fullData = `${base64}|${metadata}`;

			form.setValue(fieldName, fullData);

			// Update file status
			setFileStatus((prev) => ({
				...prev,
				[fieldName]: {
					fileName: file.name,
					isUploaded: true,
				},
			}));
		} catch (error) {
			console.error(`Error processing ${fieldName}:`, error);
		}
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
		if (status?.isUploaded && status?.fileName) {
			return `Uploaded: ${status.fileName}`;
		}
		return null;
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
											<p className="text-sm text-green-600">
												{getFileStatusMessage("project_memo")}
											</p>
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
											maxFileSize="2MB"
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
											<p className="text-sm text-green-600">
												{getFileStatusMessage("developer_track_record")}
											</p>
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
											maxFileSize="2MB"
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
												<p className="text-sm text-green-600">
													{getFileStatusMessage("market_analysis")}
												</p>
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
												maxFileSize="2MB"
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
												<p className="text-sm text-green-600">
													{getFileStatusMessage("financial_projections")}
												</p>
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
												maxFileSize="2MB"
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
