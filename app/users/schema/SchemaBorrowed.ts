import z from "zod";

const SchemaBorrowed = z.object({
  helm_id: z.string(),
  borrow_date: z.string(),
  return_date: z.string(),
});

export default SchemaBorrowed;
