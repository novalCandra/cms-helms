export type TypeBorrowes = {
  id: number;
  users: users;
  helm: helm;
  full_name: string;
  helmet_name: string;
  borrow_date: string;
  status: string;
  return_date: string;
};

export type users = {
  full_name: string;
};

export type helm = {
  helmet_name: string;
};
