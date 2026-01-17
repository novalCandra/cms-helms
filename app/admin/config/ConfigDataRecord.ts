type dataRecord = {
  id: number;
  user: string;
  helment_id: string;
  borrow_date: string;
  return_date: string;
  status: string;
  action: string;
};

const DataRecord: dataRecord[] = [
  {
    id: 1,
    user: "Mikaela",
    helment_id: "HLM-001",
    borrow_date: "2025-11-01",
    return_date: "2025-11-10",
    status: "Borrowed",
    action: ":",
  },
  {
    id: 2,
    user: "Savira",
    helment_id: "HLM-001",
    borrow_date: "2025-11-01",
    return_date: "2025-11-10",
    status: "Returned",
    action: ":",
  },
  {
    id: 3,
    user: "Zee",
    helment_id: "HLM-001",
    borrow_date: "2025-11-01",
    return_date: "2025-11-10",
    status: "Late",
    action: ":",
  },
];

export default DataRecord;
