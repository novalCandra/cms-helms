type DataDumy = {
  id: number;
  helmedId: string;
  type: string;
  size: string;
  condition: string;
  status: string;
  price: string;
};

const dataDumyTable: DataDumy[] = [
  {
    id: 1,
    helmedId: "HLM-001",
    type: "Standard",
    size: "M",
    price: "Rp 15.000",
    condition: "Good",
    status: "Available",
  },
  {
    id: 2,
    helmedId: "HLM-001",
    type: "Standard",
    size: "M",
    price: "Rp 15.000",
    condition: "Good",
    status: "Borrowed",
  },
  {
    id: 3,
    helmedId: "HLM-001",
    type: "Standard",
    size: "M",
    price : "Rp 25.000",
    condition: "Good",
    status: "Maintenance",
  },
];

export default dataDumyTable;
