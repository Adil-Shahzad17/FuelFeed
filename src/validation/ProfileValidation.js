import { z } from "zod";

export const profileSchema = z.object({
  bio: z.string().optional(),
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
