import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import useActions from "@/store/actions";
import useAppSelector from "@/store/hooks";
import createProjectUpdate from "@/services/developer/create-project-update";
import ensureError from "@/lib/ensure-error";
import blobReader from "@/lib/blob-reader";
import { z } from "zod";

// Define validation schema using Zod
const updateValidation = z.object({
	title: z.string().min(1, "Title is required"),
	content: z.string().min(1, "Content is required"),
	images: z.array(z.string()).optional(),
	project_id: z.string().min(1, "Project ID is required"),
});

// Infer type from the schema
type FormValues = z.infer<typeof updateValidation>;

// Initial form state
const initialFormState: FormValues = {
	title: "",
	content: "",
	images: [],
	project_id: "",
};

export default function useProjectUpdate() {
	const { ui } = useActions();
	const { dialog } = useAppSelector("ui");
	const [formData, setFormData] = useState<FormValues>({
		...initialFormState,
		project_id: dialog?.data?.project_id || "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [uploadedImages, setUploadedImages] = useState<Array<{ file: File; preview: string }>>([]);

	const open = useMemo(
		() => dialog?.show && dialog?.type === "project_update",
		[dialog?.show, dialog?.type]
	);

	const reset = () => {
		if (isLoading) return;
		setFormData(initialFormState);
		setUploadedImages([]);
	};

	const close = useCallback(() => {
		ui.resetDialog();
		reset();
	}, [isLoading]);

	const updateForm = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
	};

	const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		try {
			const newImages: Array<{ file: File; preview: string }> = [];
			const base64Images: string[] = [];

			for (const file of Array.from(files)) {
				const base64 = await blobReader(file);
				const metadata = `${file.type}|${file.size}`;
				const fullData = `${base64}|${metadata}`;

				base64Images.push(fullData);
				newImages.push({
					file,
					preview: URL.createObjectURL(file),
				});
			}

			updateForm("images", [...(formData.images || []), ...base64Images]);
			setUploadedImages((prev) => [...prev, ...newImages]);
		} catch (error) {
			console.error("Error processing images:", error);
			toast.error("Failed to process images");
		}
	};

	const handleRemoveImage = (index: number) => {
		const newImages = [...(formData.images || [])];
		newImages.splice(index, 1);
		updateForm("images", newImages);

		const newUploadedImages = [...uploadedImages];
		if (newUploadedImages[index]?.preview) {
			URL.revokeObjectURL(newUploadedImages[index].preview);
		}
		newUploadedImages.splice(index, 1);
		setUploadedImages(newUploadedImages);
	};

	const handleSubmit = async () => {
		setIsLoading(true);

		try {
			// Validate form data with Zod
			const validatedData = updateValidation.parse({
				...formData,
				project_id: dialog?.data?.project_id || formData.project_id,
			});

			await createProjectUpdate(validatedData as Required<typeof validatedData>);
			toast.success("Project update created successfully");
			close();

			// Refresh project updates if needed
			if (dialog?.action) {
				try {
					// Convert the refetch function to void promise
					const actionResult = dialog.action();
					if (actionResult instanceof Promise) {
						await actionResult;
					}
				} catch (error) {
					console.error("Error refreshing updates:", error);
				}
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				// Handle Zod validation errors
				error.errors.forEach((err) => {
					toast.error(`${err.path.join(".")}: ${err.message}`);
				});
			} else {
				const errorMsg = ensureError(error).message;
				toast.error(errorMsg);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return {
		open,
		close,
		formData,
		updateForm,
		handleSubmit,
		isLoading,
		uploadedImages,
		handleImagesChange,
		handleRemoveImage,
	};
}
