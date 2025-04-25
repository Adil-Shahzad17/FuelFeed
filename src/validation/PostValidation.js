import { z } from "zod";

export const postSchema = z.object({
  content: z.string().min(1, "Content is required"),
  file: z
    .custom((val) => val === null || val instanceof File, {
      message: "Please select a valid image file",
    })
    .refine(
      (file) => file === null || file.size <= 2 * 1024 * 1024,
      "Image must be smaller than 2MB"
    )
    .refine(
      (file) =>
        file === null ||
        ["image/jpg", "image/jpeg", "image/png"].includes(file.type),
      "Only JPG, JPEG or PNG images are allowed"
    )
    .nullable()
    .optional(),
});
