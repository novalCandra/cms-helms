import z from "zod";

export const SchemaAddCategories = z.object({
  nama: z
    .string()
    .min(1, "Wajib Mengisi nama")
    .max(255, "Maximal 255 Karakter"),
});

export const SchemaUpdateCategorie = z.object({
  nama: z
    .string()
    .min(1, "Wajib Mengisi nama")
    .max(255, "Maximal 255 Karakter"),
});
