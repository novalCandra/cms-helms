import z from "zod";
const SchemaAddHelms = z.object({
  helmet_name: z
    .string()
    .min(1, "wajib Mengisi Name Helm")
    .max(255, "Maximal 255 Karakter"),
  condition: z.enum(["good", "very_good", "excellent"]),
  status: z.enum(["available", "rented", "maintenance"]),
  daily_price: z.string(),
  late_fee_per_day: z.string(),
});
export default SchemaAddHelms;
