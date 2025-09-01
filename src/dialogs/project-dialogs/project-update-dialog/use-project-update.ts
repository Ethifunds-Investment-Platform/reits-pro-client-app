import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import useActions from "@/store/actions";
import useAppSelector from "@/store/hooks";
import createProjectUpdate from "@/services/developer/create-project-update";
import ensureError from "@/lib/ensure-error";
import { z } from "zod";

// Define validation schema using Zod
const updateValidation = z.object({
	title: z.string().min(1, "Title is required"),
	content: z.string().min(1, "Content is required"),
	images: z.array(z.instanceof(File)).optional(),
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

	const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;
		const acceptedFiles = Array.from(files).filter((file) => file.size <= 1 * 1024 * 1024);
		if (acceptedFiles.length !== files.length) {
			toast.error("File size too large", {
				description: "Please upload a file smaller than 1MB",
			});
			return;
		}

		const newImages: Array<{ file: File; preview: string }> = [];

		for (const file of acceptedFiles) {
			newImages.push({
				file,
				preview: URL.createObjectURL(file),
			});
		}

		// Store File objects directly
		updateForm("images", [...(formData.images || []), ...acceptedFiles]);
		setUploadedImages((prev) => [...prev, ...newImages]);
	};

	const handleRemoveImage = (index: number) => {
		const newImages = [...(formData.images || [])] as File[];
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
