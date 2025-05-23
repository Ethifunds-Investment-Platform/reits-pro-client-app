import * as React from "react";
import AppDialog from "@/components/app/app-dialog";
import { Input } from "@/components/ui/form-input";
import Textarea from "@/components/ui/form-input/textarea";
import Render from "@/components/app/render";
import useProjectUpdate from "./use-project-update";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import FileInput from "@/components/ui/form-input/file-input";

export default React.memo(function ProjectUpdateDialog() {
	const {
		open,
		close,
		formData,
		updateForm,
		handleSubmit,
		isLoading,
		uploadedImages,
		handleImagesChange,
		handleRemoveImage,
	} = useProjectUpdate();

	return (
		<AppDialog
			open={open}
			onClose={close}
			title="Add Project Update"
			titleClassName="text-center"
			containerClassName="bg-white"
			footer={
				<div className="flex justify-between gap-5 [&_button]:w-full w-full">
					<Button
						variant="outline"
						className="rounded-lg text-neutral-700"
						onClick={close}
						disabled={isLoading}
					>
						Cancel
					</Button>

					<Button
						variant="default"
						className="rounded-lg"
						onClick={handleSubmit}
						disabled={isLoading}
					>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Saving...
							</>
						) : (
							"Save Update"
						)}
					</Button>
				</div>
			}
		>
			<form className="space-y-4 min-h-[300px]">
				<Render isLoading={false}>
					<Input
						label="Title"
						name="title"
						placeholder="Enter update title"
						value={formData.title}
						onChange={(e) => updateForm("title", e.target.value)}
						disabled={isLoading}
						required
					/>

					<Textarea
						label="Content"
						name="content"
						placeholder="Enter update details"
						value={formData.content}
						onChange={(e) => updateForm("content", e.target.value)}
						disabled={isLoading}
						required
						className="min-h-[120px]"
					/>

					<div className="space-y-2">
						<label className="text-sm font-medium">Images (Optional)</label>

						{uploadedImages.length > 0 ? (
							<div className="border rounded-md p-3 space-y-3">
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									{uploadedImages.map((img, index) => (
										<div key={index} className="relative border rounded-md overflow-hidden">
											<Button
												type="button"
												variant="ghost"
												size="sm"
												onClick={() => handleRemoveImage(index)}
												className="absolute top-1 right-1 p-1 bg-white/80 text-red-500 hover:bg-white hover:text-red-700 rounded-full flex items-center justify-center size-6"
												disabled={isLoading}
											>
												<X className="h-3 w-3" />
											</Button>
											<img
												src={img.preview}
												alt={`Image ${index + 1}`}
												className="h-20 w-full object-cover"
											/>
										</div>
									))}
								</div>

								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => {
										const fileInput = document.createElement("input");
										fileInput.type = "file";
										fileInput.multiple = true;
										fileInput.accept = ".jpg,.jpeg,.png";
										fileInput.onchange = (e) => handleImagesChange(e as any);
										fileInput.click();
									}}
									disabled={isLoading}
								>
									Add More Images
								</Button>
							</div>
						) : (
							<FileInput
								name="images"
								accept=".jpg,.jpeg,.png"
								placeholder="Upload images"
								maxFileSize="5MB"
								onChange={handleImagesChange}
								multiple
								disabled={isLoading}
							/>
						)}
					</div>
				</Render>
			</form>
		</AppDialog>
	);
});
