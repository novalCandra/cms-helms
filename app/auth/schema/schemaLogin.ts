import { z } from "zod";

const FormSchema = z.object({
  email: z.email().min(1, "izin email dahulu").max(255, "maximal 255 karakter"),
  password: z
    .string()
    .min(1, "izin password dahulu")
    .max(255, "maximal 255 karakter"),
});

export default FormSchema;
