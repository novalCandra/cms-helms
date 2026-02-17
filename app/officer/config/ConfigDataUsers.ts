type TypeDataUsers = {
  id: number;
  username: string;
  total_borrows: number;
  active_borrow: number;
  late_return: number;
  status: string;
  action: string;
};

export const ConfigDataDumy: TypeDataUsers[] = [
  {
    id: 1,
    username: "John Due",
    total_borrows: 1,
    active_borrow: 1,
    late_return: 1,
    status: "Active",
    action: "Ban",
  },
  {
    id: 2,
    username: "ucup",
    total_borrows: 1,
    active_borrow: 0,
    late_return: 0,
    status: "Active",
    action: "Ban",
  },
  {
    id: 3,
    username: "savira",
    total_borrows: 1,
    active_borrow: 0,
    late_return: 1,
    status: "Active",
    action: "Ban",
  },
];
