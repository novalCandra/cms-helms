type TypeBody = {
  id: number;
  user: string;
  helment_name: string;
  borrow_date: string;
  return_date: string;
  status: string;
  banned: string;
};

export const BodyConfig: TypeBody[] = [
  {
    id: 1,
    user: "John Doe",
    helment_name: "SHOEI X16",
    borrow_date: "2025-10-12",
    return_date: "2025-11-02",
    status: "Borrowed",
    banned: "-",
  },
];
