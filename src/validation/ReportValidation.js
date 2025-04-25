"use client";

import { z } from "zod";

export const reportSchema = z.object({
  message: z
    .string()
    .min(8, { message: "The message must be 10 characters long." }),
});
