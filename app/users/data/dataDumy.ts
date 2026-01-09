type DataDumy = {
  id: number;
  helmedId: string;
  type: string;
  size: string;
  condition: string;
  status: string;
};

const dataDumyTable: DataDumy[] = [
  {
    id: 1,
    helmedId: "HLM-001",
    type: "Standard",
    size: "M",
    condition: "Good",
    status: "Available",
  },
  {
    id: 2,
    helmedId: "HLM-001",
    type: "Standard",
    size: "M",
    condition: "Good",
    status: "Borrowed",
  },
  {
    id: 3,
    helmedId: "HLM-001",
    type: "Standard",
    size: "M",
    condition: "Good",
    status: "Maintenance",
  },
];

export default dataDumyTable;
