type TypeDataTable = {
  id: number;
  user: string;
  helment_id: string;
  borrow_date: string;
  status: string;
};

const DataTable: TypeDataTable[] = [
  {
    id: 1,
    user: "mikaela",
    helment_id: "HLM-003",
    borrow_date: "2024-02-01",
    status: "Borrowed",
  },
  {
    id: 2,
    user: "Erine",
    helment_id: "HLM-003",
    borrow_date: "2024-02-01",
    status: "Returned",
  },
  {
    id: 3,
    user: "Michie",
    helment_id: "HLM-003",
    borrow_date: "2024-02-01",
    status: "Borrowed",
  },
  {
    id: 4,
    user: "Zee",
    helment_id: "HLM-003",
    borrow_date: "2024-02-01",
    status: "Borrowed",
  },
  {
    id: 5,
    user: "Savira",
    helment_id: "HLM-003",
    borrow_date: "2024-02-01",
    status: "Late",
  },
];

export default DataTable;
