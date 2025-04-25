import { z } from "zod";

export const coverSchema = z.object({
  file: z
    .custom((val) => val instanceof File, {
      message: "Please select a image file",
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
    ),
});
