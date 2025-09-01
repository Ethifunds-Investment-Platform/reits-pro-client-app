import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import FileInput from "@/components/ui/form-input/file-input";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ProjectFormImagesTabProps = {
	form: UseFormReturn<any>;
	existingImages?: {
		displayImageUrl?: string;
		imageUrls: string[];
	};
};

type FileWithPreview = {
	file: File;
	preview: string;
};

export default function ProjectFormImagesTab({ form, existingImages }: ProjectFormImagesTabProps) {
	const [displayImagePreview, setDisplayImagePreview] = useState<string | null>(
		existingImages?.displayImageUrl || null
	);
	const [additionalImages, setAdditionalImages] = useState<FileWithPreview[]>([]);
	const [existingImagePreviews, setExistingImagePreviews] = useState<string[]>(
		existingImages?.imageUrls || []
	);

	function handleDisplayImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 1 * 1024 * 1024) {
			toast.error("File size too large", {
				description: "Please upload a file smaller than 1MB",
			});
			return;
		}

		// Set the File object directly in the form
		form.setValue("display_image", file);
		setDisplayImagePreview(URL.createObjectURL(file));
	}

	function handleRemoveDisplayImage() {
		// Clear the display image
		form.setValue("display_image", undefined);

		// Remove preview
		if (displayImagePreview) {
			URL.revokeObjectURL(displayImagePreview);
			setDisplayImagePreview(null);
		}
	}

	function handleAdditionalImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		// Limit to max 5 files
		const fileArray = Array.from(files).slice(0, 5);

		const newImages: FileWithPreview[] = [];

		for (const file of fileArray) {
			newImages.push({
				file,
				preview: URL.createObjectURL(file),
			});
		}

		// Set File objects directly in the form
		form.setValue("images", fileArray);
		setAdditionalImages(newImages);
	}

	function handleRemoveAdditionalImage(index: number) {
		// Remove the image from the form value
		const formImages = form.getValues("images") as File[];
		const newFormImages = [...formImages];
		newFormImages.splice(index, 1);
		form.setValue("images", newFormImages);

		// Remove from preview array and revoke URL
		const newAdditionalImages = [...additionalImages];
		if (newAdditionalImages[index]?.preview) {
			URL.revokeObjectURL(newAdditionalImages[index].preview);
		}
		newAdditionalImages.splice(index, 1);
		setAdditionalImages(newAdditionalImages);
	}

	function handleRemoveAllAdditionalImages() {
		// Clear all additional images
		form.setValue("images", []);

		// Revoke all URLs and clear previews
		additionalImages.forEach((img) => {
			if (img.preview) URL.revokeObjectURL(img.preview);
		});
		setAdditionalImages([]);
		setExistingImagePreviews([]);
	}

	function handleRemoveExistingImage(index: number) {
		// Remove from existing images preview
		const newExistingImages = [...existingImagePreviews];
		newExistingImages.splice(index, 1);
		setExistingImagePreviews(newExistingImages);
	}

	// Clean up object URLs on unmount
	useEffect(() => {
		return () => {
			if (displayImagePreview) URL.revokeObjectURL(displayImagePreview);
			additionalImages.forEach((img) => URL.revokeObjectURL(img.preview));
		};
	}, [displayImagePreview, additionalImages]);

	return (
		<TabsContent value="images">
			<div className="space-y-6">
				<h2 className="text-lg font-semibold text-navy-800">Project Images</h2>

				<FormField
					control={form.control}
					name="display_image"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Display Image*</FormLabel>
							<FormControl>
								<div className="space-y-4">
									{displayImagePreview ? (
										<div className="border rounded-md p-3">
											<div className="flex justify-between items-center mb-2">
												<h4 className="text-sm font-medium">Display Image</h4>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													onClick={handleRemoveDisplayImage}
													className="text-red-500 hover:text-red-700"
												>
													<X className="h-4 w-4" />
												</Button>
											</div>
											<img
												src={displayImagePreview}
												alt="Display preview"
												className="h-40 w-full object-cover rounded-md"
											/>
										</div>
									) : (
										<FileInput
											name="display_image"
											accept=".jpg,.jpeg,.png"
											placeholder="Upload display image"
											maxFileSize="1MB"
											onChange={handleDisplayImageChange}
											required
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
					name="images"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Additional Images (Up to 5)</FormLabel>
							<FormControl>
								<div className="space-y-4">
									{additionalImages.length === 0 && existingImagePreviews.length === 0 ? (
										<FileInput
											name="additional_images"
											accept=".jpg,.jpeg,.png"
											placeholder="Upload additional images"
											maxFileSize="1MB"
											onChange={handleAdditionalImagesChange}
											multiple
										/>
									) : (
										<div className="border rounded-md p-3">
											<div className="flex justify-between items-center mb-3">
												<h4 className="text-sm font-medium">
													Additional Images (
													{additionalImages.length + existingImagePreviews.length}/5)
												</h4>
												<div className="flex space-x-2">
													<Button
														type="button"
														variant="outline"
														size="sm"
														onClick={() => {
															// Clear the existing file input and trigger a new one
															const fileInput = document.createElement("input");
															fileInput.type = "file";
															fileInput.multiple = true;
															fileInput.accept = ".jpg,.jpeg,.png";
															fileInput.onchange = (e) => handleAdditionalImagesChange(e as any);
															fileInput.click();
														}}
													>
														Add More
													</Button>
													<Button
														type="button"
														variant="ghost"
														size="sm"
														onClick={handleRemoveAllAdditionalImages}
														className="text-red-500 hover:text-red-700"
													>
														Remove All
													</Button>
												</div>
											</div>

											<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
												{/* Existing Images */}
												{existingImagePreviews.map((imageUrl, index) => (
													<div
														key={`existing-${index}`}
														className="relative border rounded-md overflow-hidden"
													>
														<Button
															type="button"
															variant="ghost"
															size="sm"
															onClick={() => handleRemoveExistingImage(index)}
															className="absolute top-1 right-1 p-1 bg-white/80 text-red-500 hover:bg-white hover:text-red-700 rounded-full flex items-center justify-center size-6"
														>
															<X className="h-3 w-3" />
														</Button>
														<img
															src={imageUrl}
															alt={`Existing Image ${index + 1}`}
															className="h-40 w-full object-cover"
														/>
														<div className="absolute bottom-1 left-1 px-2 py-1 bg-blue-500 text-white text-xs rounded">
															Existing
														</div>
													</div>
												))}

												{/* New Images */}
												{additionalImages.map((img, index) => (
													<div
														key={`new-${index}`}
														className="relative border rounded-md overflow-hidden"
													>
														<Button
															type="button"
															variant="ghost"
															size="sm"
															onClick={() => handleRemoveAdditionalImage(index)}
															className="absolute top-1 right-1 p-1 bg-white/80 text-red-500 hover:bg-white hover:text-red-700 rounded-full flex items-center justify-center size-6"
														>
															<X className="h-3 w-3" />
														</Button>
														<img
															src={img.preview}
															alt={`New Image ${index + 1}`}
															className="h-40 w-full object-cover"
														/>
														<div className="absolute bottom-1 left-1 px-2 py-1 bg-green-500 text-white text-xs rounded">
															New
														</div>
													</div>
												))}
											</div>
										</div>
									)}
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</TabsContent>
	);
}
