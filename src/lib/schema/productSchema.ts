import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  category: z.enum(["men", "women", "electronics", "jewelery"]),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Price must be a positive number" })
    .refine((value) => value > 0, {
      message: "Price must be greater than zero",
    }),
  creator: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
