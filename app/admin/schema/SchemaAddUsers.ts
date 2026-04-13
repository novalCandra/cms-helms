import z from "zod";
export const SchemaAddUsers = z.object({
  full_name: z
    .string()
    .min(1, "minimal 5 karakter")
    .max(255, "maximal 255 karakter"),
  email: z
    .string()
    .email()
    .min(1, "minimal 5 karakter")
    .max(255, "maximal 255 karakter"),
  password: z
    .string()
    .min(1, "minimal 5 karakter")
    .max(255, "maximal 255 karakter"),
  phone_number: z
    .string()
    .min(1, "minimal 5 karakter")
    .max(255, "maximal 255 karakter"),
});

export const UpdateSchemaAddUsers = z.object({
  full_name: z
    .string()
    .min(1, "minimal 5 karakter")
    .max(255, "maximal 255 karakter"),
  email: z
    .string()
    .email()
    .min(1, "minimal 5 karakter")
    .max(255, "maximal 255 karakter"),
  phone_number: z
    .string()
    .min(1, "minimal 5 karakter")
    .max(255, "maximal 255 karakter"),
});
