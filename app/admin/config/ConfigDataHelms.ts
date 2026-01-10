type TypeDataHelms = {
  id: number;
  helment_id: string;
  type: string;
  condition: string;
  status: string;
  borrowed_by: string;
  action: string;
};

const DataDumyHelms: TypeDataHelms[] = [
  {
    id: 1,
    helment_id: "HLM-001",
    type: "M",
    condition: "Good",
    status: "Avaible",
    borrowed_by: "-",
    action: ":",
  },
  {
    id: 2,
    helment_id: "HLM-002",
    type: "L",
    condition: "Good",
    status: "Avaible",
    borrowed_by: "-",
    action: ":",
  },
  {
    id: 3,
    helment_id: "HLM-003",
    type: "M",
    condition: "Excellent",
    status: "Borrowed",
    borrowed_by: "-",
    action: ":",
  },
];

export default DataDumyHelms;
