export interface Tag {
  label: string;
  value: string | number;
}

export interface Order {
  id: number | string;
  title: string;
  departure: string;
  destination: string;
  tags: Tag[];
}

export interface Driver {
  id: number | string;
  firstName: string;
  lastName: string;
  experience: string;
  tags: Tag[];
}