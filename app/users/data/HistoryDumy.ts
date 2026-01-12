type HistoryType = {
  id: number;
  borrow_id: string;
  helment_id: string;
  boorow_date: string;
  return_date: string;
  status: string;
  paymentId: string;
};

const HistoryData: HistoryType[] = [
  {
    id: 1,
    borrow_id: "BRW-001",
    helment_id: "HLM-003",
    boorow_date: "	2024-02-01",
    return_date: "2024-02-10",
    paymentId: "PAY-001",
    status: "Borrowed",
  },
  {
    id: 2,
    borrow_id: "BRW-001",
    helment_id: "HLM-003",
    boorow_date: "	2024-02-01",
    return_date: "2024-02-10",
    paymentId: "PAY-001",
    status: "Borrowed",
  },
];

export default HistoryData;
