type TypeHelmeCondition = {
  id: number;
  status: string;
  helm_name: string;
  type: string;
  size: string;
  condition: string;
  username?: string;
};

export const ConfigDataHelms: TypeHelmeCondition[] = [
  {
    id: 1,
    status: "Avaible",
    type: "Standart",
    size: "M",
    helm_name: "SHOIE X16",
    condition: "Good",
  },
  {
    id: 2,
    status: "Borrowed",
    type: "Standart",
    size: "M",
    helm_name: "Arai",
    condition: "Good",
    username: "Savira",
  },
  {
    id: 3,
    status: "Maintenance",
    type: "Standart",
    size: "M",
    helm_name: "SHOIE X16",
    condition: "Maintenance",
  },
];
