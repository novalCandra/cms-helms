import z from "zod";
const FormSchemaRegister = z.object({
  full_name: z
    .string()
    .min(1, "Isi Full name")
    .max(255, "maximal 255 karakter"),
  email: z
    .email()
    .min(0, "silahakan isi email dahulu")
    .max(255, "maximal 255 karakter"),
  phonenumber: z.string(),
  password: z.string().min(1, "Isi password").max(255, "maximal 255 karakter"),
  confirmpassword: z
    .string()
    .min(1, "Isi password")
    .max(255, "maximal 255 karakater"),
});

export default FormSchemaRegister;
